import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import { get_event_info, update_event_date } from "~/services/event";
import { get_group_member } from "~/services/group_member";
import { showPicture } from "~/utils/text-util";
import type { Event } from "~/types/event";
import { update_status } from "~/services/available_date";
import type { GroupMember } from "~/types/group_member";
import type { AvailableDate } from '~/types/available_date';

import "./event.css";


import { get_available_date_by_event_id } from "~/services/available_date";

export function EventPage() {
	const BACKEND_PUBLIC_URL = "http://localhost:8000/public";

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [event, setEvent] = useState<Event | null>(null);
	const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [availableDateEvent, setAvailableDateEvent] = useState<AvailableDate[]>([]);
	const [selectedEventDate, setSelectedEventDate] = useState<string>("");

	const [searchParams] = useSearchParams();
	const event_id = Number(searchParams.get("event_id"));

	async function loadEventData() {

		setIsLoading(true);

		// Fetch event info
		const { result: eventData, error: eventError } = await get_event_info(event_id);
		if (eventError) {
			setError(eventError);
			return;
		}
		setEvent(eventData);

		// Fetch group members


		const { result: available_date, error: available_date_error } = await get_available_date_by_event_id(event_id);
		if (available_date_error) {
			setError(available_date_error);
			return;
		} else {
			setAvailableDateEvent(available_date);
			console.log(available_date);

		}

		if (eventData?.group?.id) {
			const { result: members, error: membersError } = await get_group_member(eventData.group.id);
			if (membersError) {
				setError(membersError);
				return;
			} else {
				for (const m of members) {
					const avDateList = available_date.filter((obj: AvailableDate) => {
						return obj?.group_member?.id == m?.id
					})
					m.available_date = avDateList;

				}

				setGroupMembers(members || []);
				console.log(members);
			}
		}
		setIsLoading(false);

	}

	const update_user_status = async (event: React.ChangeEvent<HTMLSelectElement>, id: number) => {
		const newStatus = event.target.value as "yes" | "no" | "maybe";
		console.log("Updating status to:", newStatus);

		// Call backend API to update status
		const { result: status_result, error: status_error } = await update_status(id, { status: newStatus });

		if (status_error) {
			console.error("Failed to update status:", status_error);
			alert("Failed to update status. Please try again.");
			return;
		}

		// Update local state to reflect the change immediately
		setGroupMembers(prevMembers =>
			prevMembers.map(member => ({
				...member,
				available_date: member.available_date?.map(avDate =>
					avDate.id === id
						? { ...avDate, status: newStatus }
						: avDate
				)
			}))
		);

		console.log("Status updated successfully:", status_result);
	}

	const handleUpdateEventDate = async () => {
		if (!selectedEventDate || selectedEventDate.trim() === "") {
			alert("Please select a date first.");
			return;
		}

		console.log("Updating event date to:", selectedEventDate);

		const { result, error } = await update_event_date(event_id, selectedEventDate);

		if (error) {
			console.error("Failed to update event date:", error);
			const errorMessage = typeof error === 'object' && error.message
				? error.message
				: typeof error === 'string'
					? error
					: "Failed to update event date. Please try again.";
			alert(errorMessage);
			return;
		}

		// Update local state
		if (event) {
			setEvent({ ...event, event_date: new Date(selectedEventDate) });
		}

		console.log("Event date updated successfully:", result);
		alert("Event date updated successfully!");
		setSelectedEventDate(""); // Clear the input after successful update
	}

	useEffect(() => {
		if (event_id) {
			loadEventData();
		}
	}, [event_id]);

	if (isLoading) return <div className="loading">Loading...</div>;
	if (error) return <div className="error">{error}</div>;
	if (!event) return <div className="error">Event not found</div>;

	const Day = () => {
		return groupMembers?.[0]?.available_date?.map((obj: AvailableDate) => {
			return (
				<div className="ec-cell ec-header-cell" key={obj?.id}>{obj?.date}</div>
			);
		});
	}

	return (
		<div className="page-container">
			<AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

			<div className="main-content">
				<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

				<div className="content-area event-content-area">
					<div className="event-wrapper">

						<div className="event-header">
							<h1 className="event-title">{event.name || "Event Name"}</h1>
							<p className="event-subtitle">
								Description: {event.description || "No description"}
							</p>
							<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
								<p className="event-subtitle" style={{ margin: 0 }}>
									Event Date: {event.event_date ? new Date(event.event_date).toLocaleDateString() : "Not set"}
								</p>
								<input
									type="date"
									value={selectedEventDate}
									onChange={(e) => setSelectedEventDate(e.target.value)}
									min={event.start_date?.toString().split('T')[0]}
									max={event.end_date?.toString().split('T')[0]}
									className="form-control"
									style={{ width: 'auto' }}
								/>
								<button
									onClick={handleUpdateEventDate}
									className="btn btn-primary"
									style={{ padding: '6px 12px', whiteSpace: 'nowrap' }}
								>
									Set Event Date
								</button>
							</div>
						</div>

						{/* this will be use to loop from available date table */}
						<div className="event-calendar">
							<div className="ec-header-row">
								<div className="ec-cell ec-header-cell ec-name-header">Member</div>
								<Day />

							</div>


							{/* Group Members Rows */}
							{groupMembers.map((memberObj) => (
								<div className="ec-row" key={memberObj.id}>
									<div className="ec-cell ec-name-cell">
										<img
											src={BACKEND_PUBLIC_URL + showPicture(memberObj.member?.profile_image, "default", "/default_user.png")}
											alt={memberObj.member?.username}
											className="pic-fit"
											style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }}
										/>
										{memberObj.member?.username}
									</div>

									{memberObj?.available_date?.map((available_date_obj) => (
										<div
											key={available_date_obj.id}
											className="ec-cell"
											data-state="none"
										>
											<select className="form-select" value={available_date_obj.status} onChange={(event) => update_user_status(event, available_date_obj.id)}>
												<option value="maybe" >Maybe</option>
												<option value="yes">Yes</option>
												<option value="no">No</option>
											</select>
										</div>
									))}
								</div>
							))}
						</div>
					</div >
				</div >
			</div >
		</div >
	);
}

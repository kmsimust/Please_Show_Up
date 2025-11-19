import "./create_group.css"; // reuse same layout + form styles

import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";

import { useState, useEffect } from "react";

export function CreateEvent() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState("");

	useEffect(() => {
		page_load();
	}, []);

	async function page_load() {
		// if you later want to fetch user data, do it here
		setIsLoading(true);
		setError(null);
		setIsLoading(false);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: hook up to backend later
		console.log({ name, description, startDate });
	};

	if (isLoading) return <div className="loading">Loading...</div>;
	if (error) return <div className="error">{error}</div>;

	return (
		<div className="page-container">
			<AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

			<div className="main-content">
				<Sidebar
					isOpen={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
				/>

				<div className="content-area">
					{/* reuse same card styling as CreateGroup by using create-group-form */}
					<div className="create-group-form">
						<h2>Create Event</h2>

						<form onSubmit={handleSubmit}>
							{/* Event Name */}
							<div className="form-group">
								<label htmlFor="event_name">Event Name *</label>
								<input
									type="text"
									id="event_name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									placeholder="Enter event name"
								/>
							</div>

							{/* Description */}
							<div className="form-group">
								<label htmlFor="description">Description</label>
								<textarea
									id="description"
									rows={4}
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder="Describe your event"
								/>
							</div>

							{/* Start Date */}
							<div className="form-group">
								<label htmlFor="start_date">Start Date *</label>
								<input
									type="datetime-local"
									id="start_date"
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									required
								/>
							</div>

							{/* Actions */}
							<div className="form-actions">
								<button type="submit" className="btn-submit">
									Create Event
								</button>
							</div>
						</form>
					</div>
					{/* end card */}
				</div>
			</div>
		</div>
	);
}

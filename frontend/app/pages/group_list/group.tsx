import "./group.css";
import { useState, useEffect } from 'react';
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import { Link } from "react-router";
import { get_group } from "~/services/group";
import { get_group_member } from "~/services/group_member";
import { showTextByKey } from "~/utils/text-util";

export function GroupPage() {

	// Every page need this variable.
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// loading user and prevent fail fetch
	const [groupData, setGroupData] = useState([]);
	const [groupMember, setGroupMember] = useState([]);

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	useEffect(() => {
		page_load();
	}, []);

	async function page_load() {
		setIsLoading(true);
		const { result, error } = await get_group();

		for(const obj of result) {
			const {result: members, error: members_error} = await get_group_member(obj.id);
			obj.members = members;
		};

		setGroupData(result);
		setError(error);
		setIsLoading(false);
  	}

	if (isLoading) {
		return <div className="loading">Loading...</div>;
	}

	if (error) {
		return <div className="error">{error}</div>;
	}


	function GroupList() {
		return groupData.map((obj) => {
			return (
					<Link to="/Nothing" className="group-card" key={obj?.id}>
						<div className="group-info-case">
							<div className="flex justify-end">
								<label className="group-name">
									{showTextByKey(obj?.group_name, "-")}
								</label>
							</div>
							<div className="flex justify-end" key={obj?.id}>
								<img className="group-member-image bg-dark"></img>
							</div>
						</div>
					</Link>
				)});
	}

	return (
	<div className="page-container">
		<AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

		<div className="main-content">
			{/* Sidebar */}
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

			{/* Main content */}
			<div className="content-area">
				<div className="group-button-case mb-4">
					<a href="/create_group" className="group-create-group-button">
						Create group
					</a>
				</div>

				<div className="group-list-case">
					<GroupList/>
				</div>
			</div>
		</div>
	</div>
	);
}

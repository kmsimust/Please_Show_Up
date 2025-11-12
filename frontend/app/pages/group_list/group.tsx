import "./group.css";
import { useState } from 'react';
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";

export function GroupPage() {

	// Every page need this function.
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleCreateGroup = () => {};

	return (
		<>
		<AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
		<div className="d-flex">
			{/* Sidebar */}
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

			{/* Main content */}
			<div className="flex-grow-1 p-4">
				<div className="group-button-case mb-4">
					<a href="/create_group" className="group-create-group-button">
						Create group
					</a>
				</div>

				<div className="group-list-case">
					<div className="group-card">
						<div className="group-info-case">
							<div className="flex justify-end">
								<label className="group-name">
									Group Name
								</label>
							</div>
							<div className="flex justify-end">
								<img className="group-member-image bg-dark"></img>
								<img className="group-member-image bg-danger"></img>
								<img className="group-member-image"></img>
								<img className="group-member-image"></img>
							</div>
						</div>
					</div>

					<div className="group-card">
						<div className="group-info-case">
							<div className="flex justify-end">
								<label className="group-name">
									AAAAAAAAAAAAdohoenfpwnpdnfpnapfn
								</label>
							</div>
							<div className="flex justify-end">
								<img className="group-member-image bg-dark"></img>
								<img className="group-member-image bg-danger"></img>
								<img className="group-member-image"></img>
								<img className="group-member-image"></img>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}

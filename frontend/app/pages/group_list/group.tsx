import "./group.css";
import NavBar from "../../components/navbar";
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";

export function GroupPage() {
	const handleCreateGroup = () => {};

	return (
		<>
		<AuthNavBar />
		<div className="flex">
			{/* Sidebar */}
			<Sidebar />

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
								<img className="group-member-image"></img>
								<img className="group-member-image"></img>
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
								<img className="group-member-image"></img>
								<img className="group-member-image"></img>
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

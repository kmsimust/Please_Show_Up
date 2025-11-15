import "./group.css";
import { useState, useEffect } from 'react';
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import { Link } from "react-router";
import { get_user_data } from "~/services/user";

export function GroupPage() {

	// Every page need this function.
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// loading user and prevent fail fetch
	const [userdata, setUserdata] = useState<any | null>(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	useEffect(() => {
		page_load();
	}, []);

	async function page_load() {
		setIsLoading(true);
		const { result, error } = await get_user_data();
		setUserdata(result);
		setError(error);
		setIsLoading(false);
  	}

	if (isLoading) {
		return <div className="loading">Loading...</div>;
	}

	if (error) {
		return <div className="error">{error}</div>;
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

					<Link to="/nigger" className="group-card">
						<div className="group-info-case">
							<div className="flex justify-end">
								<label className="group-name">
									{userdata.name}
								</label>
							</div>
							<div className="flex justify-end">
								<img className="group-member-image bg-dark"></img>
								<img className="group-member-image bg-danger"></img>
								<img className="group-member-image"></img>
								<img className="group-member-image"></img>
							</div>
						</div>
					</Link>

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
	</div>
	);
}

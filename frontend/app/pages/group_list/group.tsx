import "./group.css";
import { useState, useEffect } from 'react';
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import { Link } from "react-router";
import { get_group } from "~/services/group";
import { get_group_member } from "~/services/group_member";
import { showTextByKey } from "~/utils/text-util";

export function GroupPage() {

	const domain_for_href = "http://localhost:8000/"

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
			console.log(obj.members);
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

	function Member_picture_list() {
		// loop this
		return <img className="group-member-image bg-dark"></img>;
	}

	function GroupList() {
		return groupData.map((obj, index) => {
			console.log(obj);
			return (
					<Link   to={{
							pathname: "/in_group",
							search: "?group_id="+obj?.id
  						}} className="group-card" key={index}>
						<div className="group-banner-wrapper">
							<img
								className="group-banner-img"
								src={showTextByKey(domain_for_href+"public/" + obj?.banner_image, "/fallback_banner.png")}
								alt="Group Banner"
							/>
						</div>
						<div className="group-info-case">
							<div className="flex justify-end">
								<label className="group-name">
									{showTextByKey(obj?.group_name, "-")}
								</label>
							</div>
							<div className="flex justify-end">
								<img className = "pic-fit" src={showTextByKey(domain_for_href + "public/" + obj?.owner?.profile_image,"no picture")}></img>
								{/* this below thing here will be loop */}
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

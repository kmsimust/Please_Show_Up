import "./group.css";

import { useState, useEffect } from 'react';
import { Link } from "react-router";
import { getUser } from "~/utils/auth-me";

import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";

import { get_group } from "~/services/group";
import { get_group_member, get_all_group_by_member_id } from "~/services/group_member";
import { showTextByKey, showPicture } from "~/utils/text-util";

import type { GroupMember } from "~/types/group_member";
import type { Group } from "~/types/group";




export function GroupPage() {
	const backend_public: string = "http://localhost:8000/public";

	// Every page need this variable.
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean | null>(false);

	// loading user and prevent fail fetch
	const [groupData, setGroupData] = useState<Group[] | null>([]);
	const [groupMemberTable, setGroupMemberTable] = useState<GroupMember[] | null>([]);
	const user = getUser();

	const [error, setError] = useState<string | null>("");
	const [isLoading, setIsLoading] = useState<boolean | null>(true); // Add loading state

	useEffect(() => {
		page_load();
	}, []);

	async function page_load() {
		setIsLoading(true);
		const { result, error } = await get_group();
		const { result: group_member_table, error: member_error} = await get_all_group_by_member_id(user?.id);
		setGroupMemberTable(group_member_table);

		for(const obj of result) {
			const {result: members, error: members_error} = await get_group_member(obj.id);
			obj.members = members;
			console.log(obj.members);
		};

		setGroupData(result);
		setError(error);
		setIsLoading(false);
  	}

	function MemberList({members}: {members: GroupMember[] | null}) {
		// loop this
		return members?.map((obj: any) => {
			return (
				<img className="pic-fit ms-3" src = {backend_public + showPicture(obj?.member?.profile_image, "default" ,"/default_user.png")}/>
			)});
	}

	function GroupList() {
		return groupData?.map((obj, index) => {
			return (
					<Link   to={{ pathname: "/in_group", search: "?group_id="+obj?.id }} 
							className="group-card" 
							style={{backgroundImage: 'url('+backend_public+showTextByKey(obj?.banner_image, "/default_user.png")+')'}}
							key={index}
					>
						<div className="group-info-case">
							<div className="flex justify-end">
								<label className="group-name">
									{showTextByKey(obj?.group_name, "-")}
								</label>
							</div>
							<div className="flex justify-end">
								<img className = "pic-fit" src={backend_public+showTextByKey(obj?.owner?.profile_image,"/default_user.png")}></img>
								{/* this below thing here will be loop */}
								<MemberList members={obj.members}/>
							</div>
						</div>
					</Link>
				)});
	}

	function GroupListMember() {
		return groupMemberTable?.map((obj, index) => {
			return (
					<Link   to={{ pathname: "/in_group", search: "?group_id="+obj?.group?.id }} 
							className="group-card" 
							style={{backgroundImage: 'url('+backend_public+showTextByKey(obj?.group?.banner_image, "/default_user.png")+')'}}
							key={index}
					>
						<div className="group-info-case">
							<div className="flex justify-end">
								<label className="group-name">
									{showTextByKey(obj?.group?.group_name, "-")}
								</label>
							</div>
							<div className="flex justify-end">
								<img className = "pic-fit" src={backend_public+showTextByKey(obj?.group?.owner?.profile_image,"/default_user.png")}></img>
								{/* this below thing here will be loop */}
								{/* Members in this group */}
								<MemberList members={obj?.group?.members}/>
							</div>
						</div>
					</Link>
				)});
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
						<Link to={{ pathname: "/create_group"}} className="group-create-group-button">Create group</Link>
					</div>
					<div className="group-list-case">
						<GroupList/>
						<GroupListMember/>
					</div>
				</div>
			</div>
		</div>
	);
}

//please work
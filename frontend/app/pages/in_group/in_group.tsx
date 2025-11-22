// src/pages/in_group.tsx
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import type { Group } from "~/types/group";
import type { Friend } from "~/types/friend";
import { get_friend_data } from "~/services/friend";
import {
    get_invitation_by_group_id,
    create_group_request,
} from "~/services/group_request";
import { Modal } from "react-bootstrap";
import { getUser } from "~/utils/auth-me";
import { showPicture } from "../../utils/text-util";
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import "../../components/styles/common.css";
import "./in_group.css";
import type { GroupMember } from "~/types/group_member";
import type { GroupRequestCreate } from "~/types/group_request";
import { get_group_info_by_pk } from "~/services/group";
import { get_group_member } from "~/services/group_member";
import type { Event } from "~/types/event";
import { get_event_by_group_id } from "~/services/event";
import { api_instance } from "~/utils/axios";

export function InGroup() {
    const BACKEND_PUBLIC_URL = import.meta.env.VITE_BACKEND_PUBLIC_URL;
    const user = getUser();
    const user_id = user?.id;

    const [searchParams, setSearchParams] = useSearchParams();

    // Every page need this function.
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [showInvite, setShowInvite] = useState<boolean>(false);
    const [friendList, setFriendList] = useState<Friend[] | null>([]);
    const [groupMemberList, setGroupMemberList] = useState<
        GroupMember[] | null
    >([]);
    const [group_info, setGroupInfo] = useState<Group | null>(null);
    const [error, setError] = useState<string | null>("");
    const [groupRequests, setGroupRequests] = useState([]);
    const [eventList, setEventList] = useState<Event[] | null>([]);
    const group_id = Number(searchParams.get("group_id"));
    const [isLoading, setIsLoading] = useState<boolean | null>(true); // Add loading state

    useEffect(() => {
        page_load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function page_load() {
        setIsLoading(true);

        const { result, error } = await get_group_member(group_id);
        const { result: groupIf, error: info_error } =
            await get_group_info_by_pk(group_id);
        setGroupInfo(groupIf);

        // If get_group_member returns list where each object may have id used to fetch members
        for (const obj of result) {
            const { result: members, error: members_error } =
                await get_group_member(obj.id);
            obj.members = members;
            console.log(obj.members);
        }
        setGroupMemberList(result);

        const { result: events, error: error_e } =
            await get_event_by_group_id(group_id);
        setEventList(events);

        setError(error);
        setError(error_e);

        setIsLoading(false);
    }

    function EventList({ eventList }: { eventList: Event[] | null }) {
        return (
            <>
                {eventList?.map((obj: any) => (
                    <Link
                        to={{
                            pathname: "/event",
                            search: "?event_id=" + obj?.id,
                        }}
                        className="ig-event-card common-text-none"
                        key={obj.id}
                    >
                        <div className="ig-event-info">
                            <span className="ig-event-name">{obj?.name}</span>
                            <span className="ig-event-name">
                                {obj?.start_date}
                            </span>
                        </div>
                    </Link>
                ))}
            </>
        );
    }

    const openInviteModal = async () => {
        const { result, error } = await get_friend_data();
        const { result: invite_list, error: invitation_error } =
            await get_invitation_by_group_id(group_id);

        // swap user and friend if user is not this current id so that it is easy like this user id have this friend id\
        //not friend id as user id thid make it easier to loop in html
        for (const obj of result) {
            if (obj?.user?.id != user_id) {
                const temp = structuredClone(obj?.user); // Deep copy
                obj.user = structuredClone(obj?.friend);
                obj.friend = temp;
            }
            obj.invite_status = "";
            const invited = invite_list.find((obj_invite: any) => {
                return obj_invite?.invited_user?.id == obj?.friend?.id;
            });
            if (invited) {
                obj.invite_status = invited.status;
            }
        }
        console.log(result);
        setFriendList(result);
        setShowInvite(true);
    };

    const OpenGroupMember = () => {
        return groupMemberList?.map((obj: GroupMember) => {
            return (
                <div className="ig-side-member-case" key={obj.id}>
                    <img
                        src={
                            BACKEND_PUBLIC_URL +
                            showPicture(
                                obj?.member?.profile_image,
                                "default",
                                "/default_user.png",
                            )
                        }
                        className="ig-side-member-avatar"
                    />
                    <p className="ig-side-member-name">
                        {obj?.member?.username}
                    </p>
                </div>
            );
        });
    };

    const create_group_invite = async (friend_id: number) => {
        const body: GroupRequestCreate = {
            group: group_id,
            invited_user: friend_id,
            status: "pending",
        };
        const { result, error } = await create_group_request(body);
        if (error) {
            alert("Invite failed");
        } else {
            const temp: Friend[] = structuredClone(friendList) || [];
            const found_index: number = temp?.findIndex((obj) => {
                return obj?.friend?.id == friend_id;
            });
            if (found_index !== -1) {
                temp[found_index].invite_status = "pending";
                setFriendList(temp);
            }
        }
    };

    const InviteButton = ({ invite_status, friend }: Friend) => {
        if (invite_status == "") {
            return (
                <button
                    className="ms-auto btn default-btn ig-invite-invite-btn"
                    onClick={() => create_group_invite(friend?.id)}
                >
                    {" "}
                    Invite{" "}
                </button>
            );
        } else if (invite_status == "pending") {
            return (
                <button
                    className="ms-auto btn btn-secondary ig-invite-invite-btn"
                    disabled
                >
                    {" "}
                    <i className="bi bi-hourglass-split mt-1 me-1"></i>{" "}
                    pending{" "}
                </button>
            );
        } else if (invite_status == "reject") {
            return (
                <button
                    className="ms-auto btn btn-danger ig-invite-invite-btn"
                    disabled
                >
                    {" "}
                    <i className="bi bi-x mt-1 me-1"></i> reject{" "}
                </button>
            );
        } else if (invite_status == "approved") {
            return (
                <button
                    className="ms-auto btn btn-primary ig-invite-invite-btn"
                    disabled
                >
                    {" "}
                    <i className="bi bi-check-lg mt-1 me-1"></i> approved{" "}
                </button>
            );
        }
        return null;
    };

    // User in invite people pop up modal
    const InviteUserList = () => {
        return friendList?.map((obj: Friend) => {
            return (
                <div className="col-12 mb-2" key={obj.friend?.id}>
                    <div className="d-flex d-flex align-items-center">
                        <img
                            className="app-pfp-md bg-blue-500"
                            src={
                                BACKEND_PUBLIC_URL +
                                showPicture(
                                    obj?.friend?.profile_image,
                                    "default",
                                    "/default_user.png",
                                )
                            }
                        />
                        <span className="ms-3"> {obj?.friend?.username} </span>
                        <InviteButton {...obj} />
                    </div>
                </div>
            );
        });
    };

    if (!group_id) {
        return <div>invalid request</div>;
    }

    return (
        <div>
            <AuthNavBar
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <div className="tw:flex">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
                <div className="tw:grow">
                    <div className="ig-page">
                        <div className="ig-event-list-case">
                            <EventList eventList={eventList} />
                        </div>

                        {/* Side content */}
                        <div>
                            <Link
                                to={{
                                    pathname: "/create_event",
                                    search: "?group_id=" + group_id,
                                }}
                                className="common-text-none"
                            >
                                <button className="tw:btn common-btn w-100 d-flex justify-content-between">
                                    {" "}
                                    Create an Event{" "}
                                    <i className="bi bi-plus-lg"></i>{" "}
                                </button>
                            </Link>

                            <div className="ig-side-section">
                                <div className="ig-group-member-button">
                                    <div>
                                        {" "}
                                        Group Members (
                                        {(groupMemberList?.length || 0) + 1}
                                        ){" "}
                                    </div>
                                </div>

                                <div className="ig-side-member-list">
                                    {/* owner row */}
                                    {user && (
                                        <div className="ig-side-member-case">
                                            <img
                                                src={
                                                    BACKEND_PUBLIC_URL +
                                                    showPicture(
                                                        group_info?.owner
                                                            ?.profile_image,
                                                        "default",
                                                        "/default_user.png",
                                                    )
                                                }
                                                className="ig-side-member-avatar"
                                            />
                                            <p className="ig-side-member-name">
                                                {group_info?.owner?.username}{" "}
                                                <span>(owner)</span>
                                            </p>
                                        </div>
                                    )}

                                    {/* other members */}
                                    <OpenGroupMember />
                                </div>
                            </div>

                            <div>
                                <button
                                    className="tw:btn common-btn w-100 d-flex justify-content-between"
                                    onClick={openInviteModal}
                                >
                                    Invite People{" "}
                                    <i className="bi bi-person-plus-fill"></i>
                                </button>
                            </div>

                            {/* ADD THIS: Edit Group button (placed under Invite People) */}
                            <div style={{ marginTop: "1rem" }}>
                                <Link
                                    to={{
                                        pathname: "/edit_group",
                                        search: "?group_id=" + group_id,
                                    }}
                                    className="common-text-none"
                                >
                                    <button className="tw:btn common-btn w-100 d-flex justify-content-between">
                                        Edit Group{" "}
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showInvite}
                onHide={() => {
                    setShowInvite(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Invite people to the Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Search bar*/}
                    <div className="row">
                        <div className="col-12 mb-4 position-relative">
                            <svg
                                className="position-absolute h-50 text-secondary"
                                style={{ left: 20, top: "25%" }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                type="search"
                                className="form-control"
                                style={{ paddingLeft: 35 }}
                                required
                                placeholder="Search for People"
                            />
                        </div>
                    </div>

                    <div className="ig-invite-user-list-case row">
                        {/*User list*/}
                        <InviteUserList />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default InGroup;

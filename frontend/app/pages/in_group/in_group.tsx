import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Friend } from '~/types/friend';
import { get_friend_data } from "~/services/friend";

import { Modal } from 'react-bootstrap';
import { getUser } from '~/utils/auth-me';
import { showPicture } from '../../utils/text-util';

import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";

import '../../components/styles/common.css'
import './in_group.css'
import type { GroupMember } from '~/types/group_member';

export function InGroup() {
    const BACKEND_PUBLIC_URL = import.meta.env.VITE_BACKEND_PUBLIC_URL;
    const user = getUser();
    const user_id = user?.id;

    const [searchParams, setSearchParams] = useSearchParams();
    // Every page need this function.
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [showInvite, setShowInvite] = useState<boolean>(false);
    const [friendList, setFriendList] = useState<Friend[] | null>([]);
    const [groupMemberList, setGroupMemberList] = useState<GroupMember[] | null>([]);
    const [error, setError] = useState<string | null>("");;


    const group_id = searchParams.get('group_id')

    const openInviteModal = async () => {
        const { result, error } = await get_friend_data();

        // swap user and friend if user is not this current id so that it is easy like this user id have this friend id\
        //not friend id as user id thid make it easier to loop in html
        for(const obj of result) {
            if(obj?.user?.id != user_id) {
                const temp = structuredClone(obj?.user); // Deep copy
                obj.user = structuredClone(obj?.friend);
                obj.friend = temp;
            }
        }
        setFriendList(result);
        setShowInvite(true);
    }

    const openGroupMember = async () => {
        
    }
    
    // User in invite people pop up modal
    const InviteUserList = () => {
        return friendList?.map((obj: any) => {
            return (
                <div className='col-12 mb-2'>
                    <div className='d-flex d-flex align-items-center'>
                        <img className='app-pfp-md bg-blue-500' src={BACKEND_PUBLIC_URL+showPicture(obj?.friend?.profile_image, "default", "/default_user.png")}/>
                        <span className='ms-3'>
                            {obj?.friend?.username}
                        </span>
                        <button className='ms-auto btn default-btn ig-invite-invite-btn'>
                            Invite
                        </button>
                    </div>
                </div>
            )
        })
    }

    if(!group_id) {
        return <div>invalid request</div>
    }
    
    return (
        <div>
            <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <div className="grow">
                <div className='ig-page'>
                    <div>
                        Content here GROUP ID: {group_id}
                    </div>

                    {/* Side content */}
                    <div>
                        <button className="btn common-btn w-100 d-flex justify-content-between">
                            Create an Event
                            <i className="bi bi-plus-lg"></i>
                        </button>

                        <div className='ig-side-section'>
                            <div className='ig-group-member-button'>
                                <div>
                                    Group Members (10)
                                </div>
                                <div>
                                    <i className="bi bi-chevron-right"></i>
                                </div>
                            </div>
                            <div className='ig-side-member-list'>
                                <div className='ig-side-member-case'>
                                    <div className='ig-side-member-avatar'></div>
                                    <p className='ig-side-member-name'>
                                        username
                                    </p>
                                </div>

                                <div className='ig-side-member-case'>
                                    <div className='ig-side-member-avatar'></div>
                                    <p className='ig-side-member-name'>
                                        username
                                    </p>
                                </div>

                                <div className='ig-side-member-case'>
                                    <div className='ig-side-member-avatar'></div>
                                    <p className='ig-side-member-name'>
                                        username
                                    </p>
                                </div>
                            </div>
                        </div>

                        
                        <div>
                            <button 
                                className="btn common-btn w-100 d-flex justify-content-between"
                                onClick={openInviteModal}
                            >
                                Invite People
                                <i className="bi bi-person-plus-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <Modal show={showInvite} onHide={() => {setShowInvite(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite people to the Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Search bar*/}
                    <div className="row">
                        <div className="col-12 mb-4 position-relative">
                            <svg className="position-absolute h-50 text-secondary" style={{left: 20, top: '25%'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                            <input type="search" className="form-control" style={{paddingLeft: 35}} required placeholder="Search for People" />
                        </div>
                    </div>
                    <div className='ig-invite-user-list-case row'>
                        {/*User list*/}
                        <InviteUserList/>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
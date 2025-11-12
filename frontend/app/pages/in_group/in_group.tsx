import './in_group.css'
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";

// User in invite people pop up modal
const InviteUser = () => {
    return (
        <div className='ig-invite-user-case'>
            <div className='flex items-center'>
                <img className='app-pfp-md bg-blue-500'></img>
                <label className='ml-4'>
                    Username
                </label>
            </div>
            <button className='default-btn ig-invite-invite-btn'>
                Invite
            </button>
        </div>
    )
}

export function InGroup() {
    return (
        <div>
        <AuthNavBar/>
        <div className='flex'>
            <Sidebar/>
            <div className='grow'>
            <div className='ig-page'>
                <div>
                    Content here
                </div>

                {/* Side content */}
                <div>
                    <div className=''>
                        <div className='default-btn'>
                            <div className='flex justify-between'>
                                <div>
                                    Create an Event
                                </div>
                                <div>
                                    <i className="bi bi-plus-lg"></i>
                                </div>
                            </div>
                        </div>
                    </div>

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
                        <div className='default-btn'>
                            <label htmlFor='invite-modal' className='flex justify-between'>
                                <div>
                                    Invite People
                                </div>
                                <div>
                                    <i className="bi bi-person-plus-fill"></i>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

            {/* Invite user modal */}
            <input type="checkbox" id="invite-modal" className="modal-toggle" />
            <div className="modal" role="dialog">
            <div className="ig-invite-modal-box">
                <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-bold">Invite people to the Group</h3>
                    <label htmlFor="invite-modal" className="default-back-button">
                        <i className="bi bi-x-lg text-xl"></i>
                    </label>
                </div>
                
                {/*Daisy UI search bar*/}
                <label className="input w-full ig-search-bar">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                <input type="search" required placeholder="Search for People" />
                </label>

                {/*User list*/}
                <div className='ig-invite-user-list-case'>
                    {/*user*/}
                    <div className='ig-invite-user-case'>
                        <div className='flex items-center'>
                            <img className='app-pfp-md bg-blue-500'></img>
                            <label className='ml-4'>
                                Username
                            </label>
                        </div>
                        <button className='default-btn ig-invite-invite-btn'>
                            Invite
                        </button>
                    </div>
                    <InviteUser/>
                    <InviteUser/>
                    <InviteUser/>
                    <InviteUser/>
                    <InviteUser/>
                    <InviteUser/>
                    <InviteUser/>
                    <InviteUser/>
                    <InviteUser/>
                </div>


                <div className='m-4'></div>
            </div>
            </div> 

        </div>
    )
}
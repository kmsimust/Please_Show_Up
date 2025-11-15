import './in_group.css'
import { useState, useEffect } from 'react';
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import '../../components/styles/common.css'


export function InGroup() {

    // Every page need this function.
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
    <div>
        <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="grow">
            <div className='ig-page'>
                <div>
                    Content here
                </div>
                <div>
                    <div className=''>
                        <div className='flex btn common-btn'>
                            <div className='flex grow justify-between'>
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
                        <div className='flex btn common-btn'>
                            <div className='flex grow justify-between'>
                                <div>
                                    Invite People
                                </div>
                                <div>
                                    <i className="bi bi-person-plus-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}
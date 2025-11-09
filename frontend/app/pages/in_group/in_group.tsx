import './in_group.css'
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";

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
                            <div className='flex justify-between'>
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
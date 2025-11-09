import './create_group.css'
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";

export function CreateGroup() {
    return (
        <div>
        <AuthNavBar/>

        <div className='flex'>
            <Sidebar/>

            <div className='grow p-4'>
                <div className='cg-section flex justify-between'>
                    <div>
                        <label className='cg-l'>
                            Create New Group
                        </label>
                        <p className='cg-p pt-2 mb-0'>
                            Create a Group to invite people to and plan events with!
                        </p>
                    </div>
                    <div>
                        <a href='/group' className='cg-back-button'>
                            <i className="bi bi-x-lg text-2xl"></i>
                        </a>
                    </div>
                </div>

                <div className='cg-section-box'>
                    <label className='cg-l'>
                        Group Name
                    </label>
                    <div>
                        <input className='cg-input'></input>
                    </div>
                </div>

                <div className='cg-section-box'>
                    <label className='cg-l'>
                        Group Banner
                    </label>
                    <div>
                        <form>
                        <div className="upload-area">
                            <input
                            type="file"
                            id="header-upload"
                            accept=".jpg,.jpeg,.png,.gif,.webp,.webm"
                            hidden
                            />
                            <label htmlFor="header-upload" className="upload-label">
                            <div className="upload-content">
                                <p className="upload-title">Upload file(s)</p>
                                <p className="upload-subtitle">Drop file(s) here, or click to select.</p>
                            </div>
                            </label>
                        </div>
                        </form>
                    </div>
                </div>

                <div className='p-2'>
                    <button className='default-btn'>
                        Create Group
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}
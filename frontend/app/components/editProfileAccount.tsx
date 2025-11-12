import { useState } from "react";
import axios from "axios";
import { get_user_data } from "~/services/user";
import { getUser } from "~/utils/auth-me";
import Cookies from "js-cookie";

export default function EditProfileAccount() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        display_name: "",
        phone_number: "",
        gender: "",
        date_of_birth: "",
    });

    const formChange = (event: any) => {
        const name = event.target.name;
        const temp = structuredClone(formData);
        setFormData({
            ...temp,
            [name]: event.target.value,
        });
    };

    const handleSubmit = async (res: any) => {
        let token = Cookies.get("accessToken");
        const userObj = getUser();
        const response = await axios.put(
            "http://localhost:8000/api/user/update_user/"+userObj?.id, formData,
            {headers: { Authorization: "Bearer " + token }}
        
    )};

    return (
        <>
            <h1 className="settings-title">Account settings</h1>

            <div className="settings-section">
                <h2 className="section-title">Edit profile</h2>
                <p className="section-description">
                    Change your profile information all input required
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your Username"
                                className="settings-input form-control"
                                onChange={formChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                                className="settings-input form-control"
                                onChange={formChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="first_name"
                                placeholder="Enter your firstname"
                                className="settings-input form-control"
                                onChange={formChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Enter your lastname"
                                className="settings-input form-control"
                                onChange={formChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="display_name"
                                placeholder="Enter your display name"
                                className="settings-input form-control"
                                onChange={formChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="phone_number"
                                placeholder="Enter your phone number"
                                className="settings-input form-control"
                                onChange={formChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="gender"
                                placeholder="Enter your gender"
                                className="settings-input form-control"
                                onChange={formChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="date_of_birth"
                                placeholder="Enter your date of birth"
                                className="settings-input form-control"
                                onChange={formChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

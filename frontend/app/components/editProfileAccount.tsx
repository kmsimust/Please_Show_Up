import { useState, useEffect } from "react";
import { get_user_data } from "~/services/user";
import { update_user } from "~/services/user";

export default function EditProfileAccount() {
    const [formData, setFormData] = useState<any | null>({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        display_name: "",
        phone_number: "",
        gender: "",
        date_of_birth: "",
    });
    const [updateStatus, setUpdateStatus] = useState("");

    useEffect(() => {
        page_reload();
    }, []);

    async function page_reload() {
        const { result } = await get_user_data(); // Call service api function
        setFormData({
            username: result.username,
            email: result.email,
            first_name: result.first_name,
            last_name: result.last_name,
            display_name: result.display_name,
            phone_number: result.phone_number,
            gender: result.gender,
            date_of_birth: result.date_of_birth,
        });
    }

    const UpdateMessage = () => {
        if (updateStatus == "") {
            return <div></div>;
        } else if (updateStatus == "update success") {
            return <div className="text-success mt-3">update success</div>;
        } else {
            return <div className="text-danger mt-3">update failed</div>;
        }
    };

    const formChange = (event: any) => {
        const name = event.target.name;
        const temp = structuredClone(formData);
        setFormData({
            ...temp,
            [name]: event.target.value,
        });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const { result, error } = await update_user(formData);
        if (error) {
            setUpdateStatus("update failed");
        } else {
            setUpdateStatus("update success");
        }
    };

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
                                value={formData.username}
                                className="settings-input form-control"
                                onChange={formChange}
                                required
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                className="settings-input form-control"
                                onChange={formChange}
                                required
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="first_name"
                                placeholder="Enter your firstname"
                                value={formData.first_name}
                                className="settings-input form-control"
                                onChange={formChange}
                                required
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Enter your lastname"
                                value={formData.last_name}
                                className="settings-input form-control"
                                onChange={formChange}
                                required
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="display_name"
                                placeholder="Enter your display name"
                                value={formData.display_name}
                                className="settings-input form-control"
                                onChange={formChange}
                                required
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="phone_number"
                                placeholder="Enter your phone number"
                                value={formData.phone_number}
                                className="settings-input form-control"
                                onChange={formChange}
                                required
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="gender"
                                placeholder="Enter your gender"
                                value={formData.gender}
                                className="settings-input form-control"
                                onChange={formChange}
                                required
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="date_of_birth"
                                placeholder="Enter your date of birth example(2001-02-03) year-month-day"
                                value={formData.date_of_birth}
                                className="settings-input form-control"
                                onChange={formChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                    <UpdateMessage />
                </form>
            </div>
        </>
    );
}

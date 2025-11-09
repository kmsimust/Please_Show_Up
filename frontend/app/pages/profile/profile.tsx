import "./profile.css";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar"; // ✅ import Sidebar
import { getUser } from "../../utils/auth-me";
import axios from "axios";
import React, { useEffect, useState } from "react";

export function ProfilePage() {
    const user = getUser(); // array / object
	const [userdata, setuserdata] = useState("")
	
	useEffect(() => { // Run at page loaded / Refresh
		get_user_data()
		console.log("Page loaded");
		}, []);
	

	async function get_user_data() {
		const resp = await axios.get("http://localhost:8000/api/user/me/");
		setuserdata(resp.data)
	}
    return (
        <>
            <NavBar />
            {JSON.stringify(user)}

            {user?.id}
            {userdata}
            {/* Body with sidebar */}
            <div className="d-flex">
                {/* ✅ Use Sidebar component */}
                <Sidebar />

                <div className="profile-case">
                    <div
                        className="profile-banner"
                        style={{
                            backgroundImage:
                                user?.banner != "default"
                                    ? "url(http://localhost:8000/public/" +
                                      user?.banner +
                                      ")"
                                    : "url(/default_banner.jpg)",
                        }}
                    ></div>

                    <div className="profile-user-case">
                        <div className="profile-user-case2">
                            <img
                                className="profile-user-avatar"
                                src={
                                    user?.profile_image != "default"
                                        ? user?.profile_image
                                        : "/default_user.png"
                                }
                            />

                            <div className="profile-user-name-case">
                                <div className="profile-user-display-name">
                                    {user?.display_name
                                        ? user.display_name
                                        : user?.username}
                                    {/*if display os null, show username*/}
                                </div>
                                {user?.username}
                            </div>
                        </div>

                        <div>
                            <a href="/account/:tab?">
                                <button className="profile-user-edit-profile-button">
                                    Edit profile
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                {/*
			{/* Main profile content 
			<div className="flex-grow-1 p-4">
			{/* Header with cover + avatar + name 
			<div className="profile-header">
				<div className="profile-cover"></div>

				<img
				src={
					user?.profile_image == "default"
					? miniuserProfile
					: user?.profile_image
				}
				alt="profile"
				className="profile-avatar"
				/>

				<div className="profile-bar">
				<span className="profile-username">{user?.username}</span>
				<button className="edit-btn">edit profile</button>
				</div>
			</div>

			{/* Info boxes 
			<div className="d-flex gap-4">
				<div className="info-box" style={{ width: "250px" }}>
				<h5 className="mb-3 fw-bold">personal info</h5>
				<p>username: {user?.username} </p>
				<p>gender: {user?.gender == null ? "null" : user?.gender}</p>
				<p>birthdate: {user?.date_of_birth == null ? "null" : user?.date_of_birth}</p>
				<p>email: {user?.email == null ? "null" : user?.email}</p>
				<p>tel: {user?.phone_number == null ? "null" : user?.phone_number}</p>
				</div>

				<div
				className="info-box flex-grow-1"
				style={{ minHeight: "220px" }}
				>
				{/* extra content (posts, etc.) 
				</div>
			</div>
			</div>*/}
            </div>
        </>
    );
}

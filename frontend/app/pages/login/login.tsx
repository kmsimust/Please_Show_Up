import { useState } from "react";
import axios from "axios";
import "./login.css";

// Unused imports
import { useNavigate } from "react-router";
import { setAccessToken } from "../../utils/auth-cookie";
import { setUser } from "../../utils/auth-me";

export function LoginPage() {
    const navigate = useNavigate();

    // Data Forms.
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // Use in textbox to hadle changes.
    const handleChange = (res: any) => {
        const { name, value } = res.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handld input to backend.
    const handleSubmit = async (res: any) => {
        res.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/user/login/",
                formData,
            );

            console.log("Data sent successfully:", response);
            if (response.status == 200) {
                //alert("Success: " + response.data);
                const { access_token, user } = response.data;
                // Handle success, e.g., clear form, show message
                setAccessToken(access_token);
                setUser(user);
                navigate("/group");
            }
        } catch (error) {
            alert("Error: " + error);
            console.error("Error sending data:", error);
            // Handle error, e.g., display error message
        }
    };

    return (
        <div className="login-bg flex-center">
            <div className="login-box">
                <h2
                    style={{
                        marginBottom: "25px",
                        fontSize: "32px",
                        fontWeight: "bold",
                    }}
                >
                    Login
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username or Email"
                        required
                        style={{
                            width: "100%",
                            padding: "14px",
                            margin: "10px 0",
                            border: "none",
                            background: "#fff",
                            fontSize: "16px",
                            fontWeight: "bold",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                        }}
                    />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your Password"
                        required
                        style={{
                            width: "100%",
                            padding: "14px",
                            margin: "10px 0",
                            border: "none",
                            background: "#fff",
                            fontSize: "16px",
                            fontWeight: "bold",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                        }}
                    />

                    <div
                        style={{
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "bold",
                            margin: "5px 0 15px 5px",
                        }}
                    >
                        <a
                            href="#"
                            style={{ color: "#000", textDecoration: "none" }}
                        >
                            Forgot your password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "14px",
                            background: "#00c853",
                            color: "#fff",
                            fontSize: "18px",
                            fontWeight: "bold",
                            border: "none",
                            cursor: "pointer",
                            marginTop: "10px",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                        }}
                    >
                        Login
                    </button>
                </form>

                <div
                    style={{
                        marginTop: "18px",
                        fontSize: "15px",
                        fontWeight: "bold",
                    }}
                >
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        style={{ color: "#00a843", textDecoration: "none" }}
                    >
                        sign up
                    </a>
                </div>
            </div>
        </div>
    );
}

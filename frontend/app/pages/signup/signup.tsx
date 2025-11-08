import { useState } from "react";
import { useNavigate } from "react-router";
import bgImg from "public/login-background.png";
import axios from "axios";
import { UnAuthNavBar } from "../../components/unauth_navbar";

export function SignUpPage() {
    // Navigator
    const navigate = useNavigate();

    // Data Forms.
    const [formData, setFormData] = useState({
        username: "",
        email: "",
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
                "http://localhost:8000/api/user/create/",
                formData,
            );
            console.log("Data sent successfully:", response.data);
            navigate("/login/");
            // Handle success, e.g., clear form, show message
        } catch (error) {
            console.error("Error sending data:", error);
            // Handle error, e.g., display error message
        }
    };

    return (
        <body>
            <div
                style={{
                    margin: 0,
                    padding: 0,
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: "url('" + bgImg + "')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <div
                    style={{
                        margin: 0,
                        padding: 0,
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "Arial, sans-serif",
                    }}
                >
                    <div
                        style={{
                            width: "400px",
                            padding: "30px",
                            background: "#e0e0e0",
                            border: "3px solid #9c27b0",
                            textAlign: "center",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        }}
                    >
                        <h2
                            style={{
                                marginBottom: "25px",
                                fontSize: "32px",
                                fontWeight: "bold",
                            }}
                        >
                            Sign up
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
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
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
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
                                    marginTop: "12px",
                                    borderRadius: "4px",
                                    boxSizing: "border-box",
                                }}
                            >
                                Sign up
                            </button>
                        </form>{" "}
                        {/*handle submit form endpoint*/}
                        <div
                            style={{
                                marginTop: "18px",
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            Already have an account?{" "}
                            <a
                                href="/login"
                                style={{
                                    color: "#00a843",
                                    textDecoration: "none",
                                }}
                            >
                                login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

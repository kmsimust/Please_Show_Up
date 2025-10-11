import { useState } from "react";
import bgImg from '~/images/login-background.png'
import axios from 'axios';

// Unused imports
import { Form, redirect, useFetcher, useNavigate } from "react-router";
import type { Route } from "../../../.react-router/types/app/routes/+types/104_login"
import AxiosInstance from '~/components/AxoisInstance';
import { useCookies } from "react-cookie";

// Templated Function + Unuseable

// export async function clientAction({ request }: Route.ClientActionArgs) {
//     const formData = await request.formData();
//     const dataToSend = Object.fromEntries(formData);
//     try {
//         const res = await fetch(`http://localhost:5173/login}`,
//         {method: "POST", 
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(dataToSend)
//         });
//         return { isDeleted: true };
//     } catch (err) {
//         return { isDeleted: false };
//     }
// }

// export async function clientAction({ request }: Route.ClientActionArgs) {
//     try {
//         await fetch(`http://localhost:5173/login}`,
//         {method: "POST",}
//         );
//         return { isDeleted: true };
//     } catch (err) {
//         return { isDeleted: false };
//     }
//     }

export function Pages_Login() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['accessToken']);


    // Data Forms.
    const [formData, setFormData] = useState(
        {
            email: '',
        password: ''
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
            const response = await axios.post('http://localhost:8000/login/', formData);
            
            console.log('Data sent successfully:', response);
            if (response.status == 200) {
                const { token } = response.data
                // Handle success, e.g., clear form, show message
                setCookie('accessToken', token, { path: '/' });
                navigate('/')

            }
            
        } catch (error) {
            console.error('Error sending data:', error);
            // Handle error, e.g., display error message
        }
    };

    return (
        <div
        style={{
            margin: 0,
            padding: 0,
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url('"+bgImg+"')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
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
            Login
            </h2>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="email"
                value={formData.email}
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
                <a href="#" style={{ color: "#000", textDecoration: "none" }}>
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
            <a href="/signup" style={{ color: "#00a843", textDecoration: "none" }}>
                sign up
            </a>
            </div>
        </div>
        </div>
    );

}

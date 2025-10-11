import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AboutUsPage } from "../src/pages/AboutUsPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { useAccessTokenWatcher } from "./utils/auth-cookie";
import { HomePage } from "./pages/HomePage";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = useAccessTokenWatcher();

  useEffect(() => {
    console.log("token: ", token);
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: "Token " + token,
        };

        const response = await axios.get("http://localhost:8000/api/me/", {
          headers,
        });

        console.log("Data sent successfully:", response);
      } catch (error) {
        console.error("Error sending data:", error);
        // Handle error, e.g., display error message
      }
    };

    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" index element={isAuthenticated ? <AboutUsPage /> : <Navigate to="/login" replace />} /> */}
          <Route
            path="/"
            index
            element={isAuthenticated ? <HomePage /> : <AboutUsPage />}
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

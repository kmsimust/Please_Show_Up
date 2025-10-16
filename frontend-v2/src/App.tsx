// import { useEffect, useState } from "react";
// import "./App.css";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { AboutUsPage } from "../src/pages/AboutUsPage";
// import { LoginPage } from "./pages/LoginPage";
// import { SignUpPage } from "./pages/SignUpPage";
// import { useAccessTokenWatcher } from "./utils/auth-cookie";
// import { HomePage } from "./pages/HomePage";
// import axios from "axios";
// import { GroupPage } from "./pages/group/group";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const token = useAccessTokenWatcher();

//   useEffect(() => {
//     // console.log("token: ", token);
//     // const fetchData = async () => {
//     //   try {
//     //     const headers = {
//     //       Authorization: "Token " + token,
//     //     };

//     //     const response = await axios.get("http://localhost:8000/api/user/me/", {
//     //       headers,
//     //     });

//     //     console.log("Data sent successfully:", response);
//     //   } catch (error) {
//     //     console.error("Error sending data:", error);
//     //     // Handle error, e.g., display error message
//     //   }
//     // };

//     if (token) {
//       setIsAuthenticated(true);
//       // fetchData();
//     }
//   }, [token]);

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           {/* <Route path="/" index element={isAuthenticated ? <AboutUsPage /> : <Navigate to="/login" replace />} /> */}
//           <Route
//             path="/"
//             index
//             element={isAuthenticated ? <GroupPage /> : <AboutUsPage />}
//           />
//           <Route
//             path="/login"
//             element={
//               !isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />
//             }
//           />
//           <Route path="/signup" element={<SignUpPage />} />

//           {isAuthenticated ? (
//             <>
//               <Route path="/group" element={<GroupPage />} />
//             </>
//           ) : (
//             <Navigate to="/" replace />
//           )}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// src/App.tsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { AboutUsPage } from "../src/pages/AboutUsPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { HomePage } from "./pages/HomePage";
import { GroupPage } from "./pages/group/group";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import { useAuth } from "./auth/useAuth";
import { FriendPage } from "./pages/friend/friend";
import { ProfilePage } from "./pages/profile/profile";

function Landing() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  return isAuthenticated ? <Navigate to="/group" replace /> : <AboutUsPage />;
}

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public landing that auto-redirects if logged in */}
          <Route path="/" element={<Landing />} />

          {/* Public-only pages */}
          <Route
            path="/login"
            element={
              <PublicRoute redirectTo="/group">
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute redirectTo="/group">
                <SignUpPage />
              </PublicRoute>
            }
          />

          {/* Protected area */}
          <Route element={<ProtectedRoute redirectTo="/login" />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/group" element={<GroupPage />} />
            <Route path="/friend" element={<FriendPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

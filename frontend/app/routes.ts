import { type RouteConfig, index , route } from "@react-router/dev/routes";

export default [
        index("routes/home.tsx"),
        route("/login", "routes/login.tsx"),
        route("/signup", "routes/signup.tsx"),
        route("/home_screen", "routes/home_screen.tsx"),
        route("/group", "routes/group.tsx"),
        route("/profile", "routes/profile.tsx"),
        route("/friend", "routes/friend.tsx")
] satisfies RouteConfig;

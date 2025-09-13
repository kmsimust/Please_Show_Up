import { type RouteConfig, index , route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
        route("/login", "routes/login.tsx"),
        route("/home_screen", "routes/home_screen.tsx"),
        route("/signup", "routes/signup.tsx"),
        route("/group", "routes/group.tsx")
] satisfies RouteConfig;

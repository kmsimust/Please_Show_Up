import {
         type RouteConfig,
         index,
         route 
} from "@react-router/dev/routes";

export default [
        index("routes/101_home.tsx"),
        route("/about", "routes/102_about.tsx"),
        route("/signup", "routes/103_signup.tsx"),
        route("/login", "routes/104_login.tsx"),

        route("/channel/:channelId", "routes/201_channel.tsx"),
] satisfies RouteConfig;

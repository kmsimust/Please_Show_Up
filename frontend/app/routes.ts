import {
         type RouteConfig,
         index,
         route 
} from "@react-router/dev/routes";

export default [
        index("routes/home.tsx"),
        route("/aboutus", "routes/about.tsx"),
        route("/signup", "routes/signup.tsx"),
        route("/login", "routes/login.tsx"),
        route("/friend", "routes/friend.tsx"),
        route("/profile", "routes/profile.tsx"),
        route("/group", "routes/group.tsx"),
        route("/learn", "routes/learn.tsx"),
        route("/learn-axios", "routes/learn_axios.tsx"),
        
        // route("/channel/:channelId", "routes/201_channel.tsx"),
] satisfies RouteConfig;

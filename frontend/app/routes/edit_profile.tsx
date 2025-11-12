import type { Route } from "./+types/edit_profile";
import { EditProfilePage } from "../pages/edit_account/edit_profile";
import { useParams, useNavigate } from 'react-router';
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "My profile" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

interface EditProfilePageProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function EPRoute() {

    return <EditProfilePage />;
}

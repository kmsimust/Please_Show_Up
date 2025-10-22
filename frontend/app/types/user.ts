export type UserType = {
    id: number;
    username: string;
    email: string;
    profile_image: string;
    banner: string;
    gender: string | null;
    date_of_birth: string | null;
    phone_number: string | null;
    display_name: string | null;
    first_name: string | null;
    last_name: string | null;
    created_at: Date;
}

export interface User {
    id: number;
    username: string;
    email: string;
    profile_image: string;
    banner: string;
    gender: string | null;
    date_of_birth: string | null;
    phone_number: string | null;
    display_name: string | null;
    first_name: string | null;
    last_name: string | null;
    created_at: Date;
}
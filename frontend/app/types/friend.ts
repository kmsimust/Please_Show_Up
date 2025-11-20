import type { User } from './user';

export interface Friend {
    id: number;
    user: User;
    friend: User;
    created_at: Date;
    invite_status?: string; 
}
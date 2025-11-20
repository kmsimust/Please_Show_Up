import type { User } from './user';
import type { Group } from './group';

export interface GroupRequest {
    id: number;
    group: Group;
    invited_user: User;
    status: string;
    created_at: Date;
}

export interface GroupRequestCreate {
    id?: number;
    group: number;
    invited_user: number;
    status?: string;
    created_at?: Date;
}
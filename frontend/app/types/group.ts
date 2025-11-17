import type { User } from './user';
import type { GroupMember } from './group_member';

export interface Group {
    id: number;
    owner: User;
    group_name: string;
    banner_image: string;
    max_member: number;
    members: GroupMember[] | null;
    created_at: Date;
}
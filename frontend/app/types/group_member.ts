import type { User } from './user';
import type { Group } from './group';

export interface GroupMember {
    id: number;
    group: Group;
    member: User;
    created_at: Date;
}
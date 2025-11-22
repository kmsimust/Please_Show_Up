import type { User } from './user';
import type { Group } from './group';
import type { AvailableDate } from './available_date';

export interface GroupMember {
    id: number;
    group: Group;
    member: User;
    available_date? : AvailableDate[];
    created_at: Date;
}
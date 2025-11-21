import type { User } from './user';
import type { Group } from './group';

export interface Event {
    id:number,
    name : string,
    group: Group,
    description:string,
    start_date:Date,
    end_date:Date,
    event_date:Date,
    created_at:Date
}

export interface EventCreate {
  name: string;
  description: string;
  start_date: string;
  group: number;
}
import { type TEAM } from '@constants/team';

export interface IUser {
  _id: string;
  username: string;
  noWin: string;
  noKilled: string;
  team?: TEAM;
  room_id?: string;
}

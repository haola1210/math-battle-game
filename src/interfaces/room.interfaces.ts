import { type IUser } from './user.interface';

export interface IRoom {
  _id: string;
  owner?: IUser;
  room_name: string;
  users?: IUser[];
}

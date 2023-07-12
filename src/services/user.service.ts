import { type IUser } from '@interfaces/user.interface';
import { publicInstance } from 'axios/axios';

const userURL = `/users`;

export const me = async () => {
  const user = await publicInstance.get(`${userURL}/me`);
  return user as unknown as IUser;
};

import { privateInstance } from '@axios/axios';
import { type IUser } from '@interfaces/user.interface';

const userURL = `/users`;

export const me = async () => {
  const res = await privateInstance.get(`${userURL}/me`);
  return res.data as IUser;
};

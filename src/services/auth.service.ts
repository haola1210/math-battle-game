import { publicInstance } from '@axios/axios';
import { type IAuthRes } from '@interfaces/auth.interfaces';

const authURL = `/auth`;

export const login = async (payload: { username: string; password: string }) => {
  const res = await publicInstance.post(`${authURL}/login`, payload);
  console.log(res);
  return res.data as unknown as IAuthRes;
};

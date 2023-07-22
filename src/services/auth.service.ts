import { publicInstance } from '@axios/axios';
import { type IRegisterRes, type IAuthRes } from '@interfaces/auth.interfaces';

const authURL = `/auth`;

export const login = async (payload: { username: string; password: string }) => {
  const res = await publicInstance.post(`${authURL}/login`, payload);
  return res.data as unknown as IAuthRes;
};

export const register = async (payload: { username: string; password: string }) => {
  const res = await publicInstance.post(`${authURL}/register`, payload);
  return res.data as unknown as IRegisterRes;
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ERROR_TYPE } from '../constants/error-type';

export const convertError = (error: any) => {
  const data = error?.response?.data;
  const errorType = data?.error;
  console.log({ errorType }, data?.message);

  let castedErrors = {};
  if (errorType === ERROR_TYPE.CONFLICT) {
    const errorData = JSON.parse(data?.message ?? `{}`);
    castedErrors = Object.keys(errorData).reduce((e, key) => {
      e[key] = `${key} exist.`;
      return e;
    }, {} as Record<string, string>);
  }

  if (errorType === ERROR_TYPE.NOT_FOUND) {
    if (data?.message === 'User does not exist') {
      castedErrors = { username: 'User not exist' };
    }
  }

  if (errorType === ERROR_TYPE.BAD_REQUEST) {
    if (data?.message === 'Password is not correct') {
      castedErrors = { password: 'Wrong password' };
    }
  }

  return castedErrors;
};

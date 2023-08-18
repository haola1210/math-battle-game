import { privateInstance } from '@axios/axios';
import { type IRoom } from '@interfaces/room.interfaces';

export const getRoomList = async () => {
  const data = await privateInstance.get('rooms/list');
  return data.data as unknown as IRoom[];
};

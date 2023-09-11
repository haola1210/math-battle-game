import { privateInstance } from '@axios/axios';
import { type IRoom } from '@interfaces/room.interfaces';

const roomPath = 'rooms';

export const getRoomList = async () => {
  const data = await privateInstance.get(`${roomPath}/list`);
  return data.data as unknown as IRoom[];
};

export const getRoomInfo = async (id: string): Promise<IRoom | undefined> => {
  const data = await privateInstance.get(`${roomPath}/info/${id}`);
  return data.data as unknown as IRoom;
};

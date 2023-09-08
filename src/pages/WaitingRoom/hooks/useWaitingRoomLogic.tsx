import { IUser } from '@interfaces/user.interface';
import { getRoomInfo } from '@services/room.service';
import { iIFE } from '@utils/IIFE';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useWaitingRoomLogic = () => {
  const [roommate, setRoommate] = useState<IUser[]>([]);
  const { room_id } = useParams();

  useEffect(() => {
    iIFE(async () => {
      const data = await getRoomInfo(room_id ?? ``);
      setRoommate(data.users);
    });
  }, []);
  console.log(room_id);
  return { roommate };
};

export default useWaitingRoomLogic;

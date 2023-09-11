import { LINK } from '@constants/link';
import { USER_EVENT } from '@constants/room-event';
import { useSocket } from '@contexts/SocketContext';
import { IRoom } from '@interfaces/room.interfaces';
import { IUser } from '@interfaces/user.interface';
import { getRoomInfo } from '@services/room.service';
import { iIFE } from '@utils/IIFE';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const useWaitingRoomLogic = () => {
  const [roommate, setRoommate] = useState<IUser[]>([]);
  const { room_id } = useParams();
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    iIFE(async () => {
      const data = await getRoomInfo(room_id ?? ``);
      if (data) {
        setRoommate(data?.users);
      } else {
        toast('This room is not exist!');
        navigate(LINK.LOBBY);
      }
    });
  }, []);

  // join room feedback room
  useEffect(() => {
    socket?.current?.on(
      USER_EVENT.JOIN_ROOM_FEEDBACK_ROOM,
      async ({ user_joined }: { user_joined: IUser }) => {
        try {
          const tempRoommate = [...roommate, user_joined];
          setRoommate(tempRoommate);
        } catch (error) {
          toast('Something went wrong!');
        }
      },
    );

    return () => {
      socket?.current?.off();
    };
  }, []);

  return { roommate };
};

export default useWaitingRoomLogic;

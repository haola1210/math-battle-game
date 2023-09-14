import { LINK } from '@constants/link';
import { USER_EVENT } from '@constants/room-event';
import { SOCKET_MESSAGE } from '@constants/socket-message.enum';
import { useAuthContext } from '@contexts/AuthContext';
import { useSocket } from '@contexts/SocketContext';
import { IRoom } from '@interfaces/room.interfaces';
import { IUser } from '@interfaces/user.interface';
import { getRoomInfo } from '@services/room.service';
import { iIFE } from '@utils/IIFE';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const useWaitingRoomLogic = () => {
  const [room, setRoom] = useState<IRoom>({
    _id: '',
    owner: undefined,
    room_name: '',
    users: [],
  });

  const { room_id } = useParams();
  const socket = useSocket();
  const navigate = useNavigate();
  const auth = useAuthContext();

  useEffect(() => {
    iIFE(async () => {
      const data = await getRoomInfo(room_id ?? ``);
      if (data) {
        setRoom(data);
        if (!data.users.find((item) => item.username === auth.user?.username)) {
          navigate(LINK.LOBBY);
        }
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
          setRoom((prev) => {
            const tempUsers = [...prev.users, user_joined];
            const newRoom = { ...prev, users: tempUsers };

            return newRoom;
          });
        } catch (error) {
          toast('Something went wrong!');
        }
      },
    );

    return () => {
      socket?.current?.off();
    };
  }, []);

  // leave room feedback room
  useEffect(() => {
    socket?.current?.on(
      USER_EVENT.LEAVE_ROOM_FEEDBACK_ROOM,
      async ({
        leave_user,
        room,
        message,
      }: {
        leave_user?: IUser;
        room: IRoom;
        message: string;
      }) => {
        if (message === SOCKET_MESSAGE.LAST_PERSON_LEAVE_ROOM) {
          navigate(LINK.LOBBY);
        }

        if (
          message === SOCKET_MESSAGE.OWNER_LEAVE_ROOM ||
          message === SOCKET_MESSAGE.ROOMMATE_LEAVE_ROOM
        ) {
          if (leave_user?._id === auth.user?._id) {
            navigate(LINK.LOBBY);
          } else {
            setRoom(room);
          }
        }
      },
    );

    return () => {
      socket?.current?.off();
    };
  }, []);

  const handleLeaveRoom = () => {
    const payload = {
      user_id: auth.user?._id,
      room_id,
    };
    socket?.current?.emit(USER_EVENT.LEAVE_ROOM, payload);
  };

  return { room, auth, handleLeaveRoom };
};

export default useWaitingRoomLogic;

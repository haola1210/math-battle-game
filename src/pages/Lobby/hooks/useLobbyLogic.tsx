import { LINK } from '@constants/link';
import { USER_EVENT } from '@constants/room-event';
import { useAuthContext } from '@contexts/AuthContext';
import { useSocket } from '@contexts/SocketContext';
import { type IRoom } from '@interfaces/room.interfaces';
import { type IUser } from '@interfaces/user.interface';
import { getRoomList } from '@services/room.service';
import { iIFE } from '@utils/IIFE';
import { useFormik } from 'formik';
import { type ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const shema = yup.object({
  room_name: yup.string().required().max(8, 'Room name must be less than 8 characters.'),
});

export const useLobbyLogic = () => {
  const socket = useSocket();
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const formik = useFormik({
    initialValues: {
      room_name: '',
    },
    validationSchema: shema,
    onSubmit(values) {
      const payload = {
        user: auth.user,
        room_name: values.room_name,
      };
      socket?.current?.emit(USER_EVENT.CREATE_ROOM, payload);
    },
  });

  // create room
  useEffect(() => {
    socket?.current?.on(
      USER_EVENT.CREATE_ROOM_FEEDBACK,
      async ({ user, room }: { user: IUser; room: IRoom }) => {
        console.log('here CREATE_ROOM_FEEDBACK ');

        if (user.username === auth.user?.username) {
          navigate(`${LINK.WAITING_ROOM}/${room._id}`);
          toast(`Create ${room.room_name} success !`);
        } else {
          const tmpList = [...roomList, room];
          setRoomList(tmpList);
        }
      },
    );

    return () => {
      socket?.current?.off();
    };
  }, []);

  useEffect(() => {
    socket?.current?.on(USER_EVENT.CREATE_ROOM_ERROR, (error) => {
      toast('Something went wrong!');
    });
    return () => {
      socket?.current?.off();
    };
  }, []);

  // join room
  useEffect(() => {
    socket?.current?.on(
      USER_EVENT.JOIN_ROOM_FEEDBACK_LOBBY,
      async ({ room, user_joined }: { room: IRoom; user_joined: IUser }) => {
        console.log('here JOIN_ROOM_FEEDBACK_LOBBY ');

        if (user_joined.username === auth.user?.username) {
          navigate(`${LINK.WAITING_ROOM}/${room._id}`);
        } else {
          const tmpList = roomList.map((item) => (item._id === room._id ? room : item));
          setRoomList(tmpList);
        }
      },
    );

    return () => {
      socket?.current?.off();
    };
  }, []);

  useEffect(() => {
    iIFE(async () => {
      const roomList = await getRoomList();

      setRoomList(roomList);
    });
  }, []);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    void formik.setFieldValue(name, value);
  };

  const handleSubmitForm = () => {
    formik.handleSubmit();
  };

  const handleJoinRoom = (room_id: string) => {
    console.log('here');

    const payload = {
      user_id: auth.user?._id,
      room_id,
    };
    socket?.current?.emit(USER_EVENT.JOIN_ROOM, payload);
  };

  return { handleChangeValue, handleSubmitForm, handleJoinRoom, formik, roomList, auth };
};

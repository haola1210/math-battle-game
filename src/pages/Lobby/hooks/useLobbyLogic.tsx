import { USER_EVENT } from '@constants/room-event';
import { useAuthContext } from '@contexts/AuthContext';
import { useSocket } from '@contexts/SocketContext';
import { IRoomList } from '@interfaces/room.interfaces';
import { getRoomList } from '@services/room.service';
import { useFormik } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
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
  const [roomList, setRoomList] = useState<IRoomList[]>([]);
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

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    void formik.setFieldValue(name, value);
  };

  useEffect(() => {
    socket?.current?.on(USER_EVENT.CREATE_ROOM_FEEDBACK, async (data) => {
      console.log(data);
    });
    socket?.current?.on(USER_EVENT.CREATE_ROOM_ERROR, (error) => {
      toast('Something went wrong!');

      console.log(error);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const roomList = await getRoomList();
      console.log(roomList);

      setRoomList(roomList);
    })();
  }, []);

  return {};
};

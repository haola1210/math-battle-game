import Button from '@components/Button';
import Layout from '@components/Layout';
import RoomItem from '@components/RoomItem';
import { USER_EVENT } from '@constants/room-event';
import { useAuthContext } from '@contexts/AuthContext';
import { useSocket } from '@contexts/SocketContext';
import { type ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LINK } from '@constants/link';
import './style.scss';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { type IRoom } from '@interfaces/room.interfaces';
import { getRoomList } from '@services/room.service';
import Input from '@components/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { type IUser } from '@interfaces/user.interface';

const shema = yup.object({
  room_name: yup.string().required().max(8, 'Room name must be less than 8 characters.'),
});

const Lobby = () => {
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

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    void formik.setFieldValue(name, value);
  };

  useEffect(() => {
    socket?.current?.on(
      USER_EVENT.CREATE_ROOM_FEEDBACK,
      async ({ roomList, user, room }: { roomList: IRoom[]; user: IUser; room: IRoom }) => {
        if (user.username === auth.user?.username) {
          navigate(`${LINK.WAITING_ROOM}/${room._id}`);
        } else {
          setRoomList(roomList);
        }
      },
    );
    socket?.current?.on(USER_EVENT.CREATE_ROOM_ERROR, (error) => {
      console.log(error);
      toast('Something went wrong!');
    });
  }, []);

  useEffect(() => {
    (async () => {
      const roomList = await getRoomList();

      setRoomList(roomList);
    })();
  }, []);

  return (
    <Layout>
      <div className='lobby'>
        <div className='lobby__header'>Room List</div>
        <div className='lobby__create-btn'>
          <Input
            label='Input room name'
            value={formik.values.room_name}
            errorMessage={formik.errors.room_name}
            onChange={handleChangeValue}
            name={'room_name'}
          />
          <Button onClick={() => formik.handleSubmit()}>Create</Button>
        </div>
        <div className='lobby__room-list'>
          {roomList.map((item, index) => {
            return (
              <RoomItem
                room_name={item.room_name}
                ownerName={item.owner?.username}
                numOfMember={item.users?.length}
                key={index}
              ></RoomItem>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Lobby;

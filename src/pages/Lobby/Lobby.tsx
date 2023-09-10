import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import RoomItem from '@components/RoomItem';
import { useLobbyLogic } from './hooks/useLobbyLogic';
import './style.scss';

const Lobby = () => {
  const { handleChangeValue, handleSubmitForm, handleJoinRoom, formik, roomList, auth } =
    useLobbyLogic();
  return (
    <Layout>
      <div className='lobby'>
        <div className='lobby__header'>
          <div>Room List</div>
          <div>Hello {auth.user?.username}</div>
        </div>
        <div className='lobby__create-btn'>
          <Input
            label='Input room name'
            value={formik.values.room_name}
            errorMessage={formik.errors.room_name}
            onChange={handleChangeValue}
            name={'room_name'}
          />
          <Button onClick={handleSubmitForm}>Create</Button>
        </div>
        <div className='lobby__room-list'>
          {roomList.map((item, index) => {
            return (
              <RoomItem
                room_name={item.room_name}
                ownerName={item.owner?.username}
                numOfMember={item.users?.length}
                key={index}
                onClick={() => handleJoinRoom(item._id)}
              ></RoomItem>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Lobby;

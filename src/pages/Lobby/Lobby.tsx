import Button from '@components/Button';
import Layout from '@components/Layout';
import RoomItem from '@components/RoomItem';
import './style.scss';

const Lobby = () => {
  return (
    <Layout>
      <div className='lobby'>
        <div className='lobby__header'>Room List</div>
        <div className='lobby__create-btn'>
          <Button>Create</Button>
        </div>
        <div className='lobby__room-list'>
          <RoomItem />
          <RoomItem />
          <RoomItem />
        </div>
      </div>
    </Layout>
  );
};

export default Lobby;

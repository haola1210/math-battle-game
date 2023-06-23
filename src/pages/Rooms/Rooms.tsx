import Button from '@components/Button';
import Layout from '@components/Layout';
import RoomItem from '@components/RoomItem';
import './style.scss';

const Rooms = () => {
  return (
    <Layout>
      <div className='rooms'>
        <div className='rooms__header'>Room List</div>
        <div className='rooms__create-btn'>
          <Button>Create</Button>
        </div>
        <div className='rooms__room-list'>
          <RoomItem />
          <RoomItem />
          <RoomItem />
        </div>
      </div>
    </Layout>
  );
};

export default Rooms;

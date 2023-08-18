import './style.scss';

interface IRoomItem {
  ownerName?: string;
  numOfMember?: number;
  room_name?: string;
}

const RoomItem = ({ ownerName, numOfMember, room_name }: IRoomItem) => {
  return (
    <div className='room-item'>
      <div>{room_name}</div>
      <div className='room-item__roommate'>
        <div>{ownerName}</div>
        <div>{numOfMember}/4</div>
      </div>
    </div>
  );
};

export default RoomItem;

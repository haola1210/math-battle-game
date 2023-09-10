import './style.scss';

interface IPlayerItemProps {
  playerName?: string;
  isEmptySlot?: boolean;
}

const PlayerItem = ({ playerName, isEmptySlot }: IPlayerItemProps) => {
  return (
    <div className='player-item'>
      <div>{isEmptySlot ? `` : playerName}</div>
      <div className='play-item__level'></div>
    </div>
  );
};

export default PlayerItem;

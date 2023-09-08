import './style.scss';

interface IPlayerItemProps {
  playerName?: string;
  isEmptySlot?: boolean;
}

const PlayerItem = ({ playerName }: IPlayerItemProps) => {
  return (
    <div className='player-item'>
      <div>{playerName}</div>
      <div className='play-item__level'></div>
    </div>
  );
};

export default PlayerItem;

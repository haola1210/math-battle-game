import './style.scss';

interface IPlayerItemProps {
  playerName?: string;
  isEmptySlot?: boolean;
  isCurrentUser?: boolean;
}

const PlayerItem = ({ playerName, isEmptySlot, isCurrentUser }: IPlayerItemProps) => {
  return (
    <div className={`player-item ${isCurrentUser ? `hightlight` : ``}`}>
      <div>{isEmptySlot ? `` : playerName}</div>
      <div className='play-item__level'></div>
    </div>
  );
};

export default PlayerItem;

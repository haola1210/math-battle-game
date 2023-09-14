import { type MouseEventHandler } from 'react';
import './style.scss';

interface IPlayerItemProps {
  playerName?: string;
  isEmptySlot?: boolean;
  isCurrentUser?: boolean;
  isOwner?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const PlayerItem = ({
  playerName,
  isEmptySlot,
  isCurrentUser,
  isOwner,
  onClick,
}: IPlayerItemProps) => {
  return (
    <div
      className={`player-item ${isCurrentUser ? `hightlight` : ``}`}
      onClick={onClick}
    >
      <div className='player-item__header'>
        {isEmptySlot ? `` : <div>{playerName}</div>}
        {isOwner ? <div>Owner</div> : ``}
      </div>
      <div className='play-item__level'></div>
    </div>
  );
};

export default PlayerItem;

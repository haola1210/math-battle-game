import Layout from '@components/Layout';
import Map from '@components/Map';
import PlayerItem from '@components/PlayerItem';
import './style.scss';
import useWaitingRoomLogic from './hooks/useWaitingRoomLogic';
import { addUsersToTeam } from './utils';
import { TEAM } from '@constants/team';
import Button from '@components/Button';

const WaitingRoom = () => {
  const { room, auth, handleLeaveRoom } = useWaitingRoomLogic();
  return (
    <Layout>
      <div className='waiting-room'>
        <div className='waiting-room__header'>Room name</div>
        <div className='waiting-room__player-list'>
          <div className='waiting-room__team'>
            <div>Team 1</div>
            <div className='waiting-room__team--player'>
              {addUsersToTeam(room, TEAM.ONE).map((item, index) =>
                item === '' ? (
                  <PlayerItem
                    isEmptySlot
                    key={index}
                  />
                ) : (
                  <PlayerItem
                    playerName={item.username}
                    isEmptySlot={false}
                    key={index}
                    isCurrentUser={item.username === auth.user?.username}
                    isOwner={item.username === room.owner?.username}
                  />
                ),
              )}
            </div>
          </div>
          <div className='waiting-room__map'>
            <Map />
          </div>
          <div className='waiting-room__team'>
            <div>Team 2</div>
            <div className='waiting-room__team--player'>
              {addUsersToTeam(room, TEAM.TWO).map((item, index) =>
                item === '' ? (
                  <PlayerItem
                    isEmptySlot
                    key={index}
                  />
                ) : (
                  <PlayerItem
                    playerName={item.username}
                    isEmptySlot={false}
                    key={index}
                    isCurrentUser={item.username === auth.user?.username}
                    isOwner={item.username === room.owner?.username}
                  />
                ),
              )}
            </div>
          </div>
        </div>
        <div className='waiting-room__btn'>
          <Button onClick={handleLeaveRoom}>Leave Room</Button>
        </div>
      </div>
    </Layout>
  );
};

export default WaitingRoom;

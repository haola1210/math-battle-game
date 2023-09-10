import Layout from '@components/Layout';
import Map from '@components/Map';
import PlayerItem from '@components/PlayerItem';
import './style.scss';
import useWaitingRoomLogic from './hooks/useWaitingRoomLogic';
import { addUsersToTeam } from './utils';
import { TEAM } from '@constants/team';

const WaitingRoom = () => {
  const { roommate } = useWaitingRoomLogic();
  return (
    <Layout>
      <div className='waiting-room'>
        <div className='waiting-room__header'>Room name</div>
        <div className='waiting-room__player-list'>
          <div className='waiting-room__team'>
            <div>Team 1</div>
            <div className='waiting-room__team--player'>
              {addUsersToTeam(roommate, TEAM.ONE).map((item, index) =>
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
              {addUsersToTeam(roommate, TEAM.TWO).map((item, index) =>
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
                  />
                ),
              )}
            </div>
          </div>
        </div>
        <div>Waiting List</div>
        <div className='waiting-room__waiting-list'>
          <PlayerItem />
          <PlayerItem />
        </div>
      </div>
    </Layout>
  );
};

export default WaitingRoom;

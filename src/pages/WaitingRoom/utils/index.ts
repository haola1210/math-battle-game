import { type TEAM } from '@constants/team';
import { IRoom } from '@interfaces/room.interfaces';

export const addUsersToTeam = (room: IRoom, team: TEAM, amountMemberOfTeam = 2) => {
  const memberTeam = room.users?.filter((item) => item.team === team);

  const teamMembers = Array.from({ length: amountMemberOfTeam }, (_, index) =>
    index < memberTeam?.length ? memberTeam[index] : '',
  );

  return teamMembers;
};

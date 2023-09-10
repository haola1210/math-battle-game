import { type TEAM } from '@constants/team';
import { type IUser } from '@interfaces/user.interface';

export const addUsersToTeam = (users: IUser[], team: TEAM, amountMemberOfTeam = 2) => {
  const memberTeam = users.filter((item) => item.team === team);

  const teamMembers = Array.from({ length: amountMemberOfTeam }, (_, index) =>
    index < memberTeam.length ? memberTeam[index] : '',
  );

  return teamMembers;
};

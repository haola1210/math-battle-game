import { TEAM } from '@constants/team';
import { IUser } from '@interfaces/user.interface';

export const convertUsersToTeam = (users: IUser[]) => {
  const countTeam1 = users.filter((item) => item.team === TEAM.ONE).length;
  const countTeam2 = users.filter((item) => item.team === TEAM.TWO).length;
};

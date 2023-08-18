import { LINK } from '@constants/link';
import Lobby from '@pages/Lobby';
import Login from '@pages/Login';
import Main from '@pages/Main';
import Register from '@pages/Register';
import WaitingRoom from '@pages/WaitingRoom';
import Welcome from '@pages/Welcome';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const RoutesContainer = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route
          path={LINK.LOGIN}
          element={<Login />}
        />
        <Route
          path={LINK.REGISTER}
          element={<Register />}
        />
        <Route
          path={LINK.WELCOME}
          element={<Welcome />}
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path={LINK.LOBBY}
          element={<Lobby />}
        />
        <Route
          path={LINK.MAIN}
          element={<Main />}
        />
        <Route
          path={`${LINK.WAITING_ROOM}/:room_id`}
          element={<WaitingRoom />}
        />
      </Route>
    </Routes>
  );
};

export default RoutesContainer;

import { Link } from '@constants/link';
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
          path={Link.LOGIN}
          element={<Login />}
        />
        <Route
          path={Link.REGISTER}
          element={<Register />}
        />
        <Route
          path={Link.WELCOME}
          element={<Welcome />}
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path={Link.LOBBY}
          element={<Lobby />}
        />
        <Route
          path={Link.MAIN}
          element={<Main />}
        />
        <Route
          path={Link.WAITING_ROOM}
          element={<WaitingRoom />}
        />
      </Route>
    </Routes>
  );
};

export default RoutesContainer;

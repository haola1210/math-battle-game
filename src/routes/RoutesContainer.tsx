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
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/welcome'
          element={<Welcome />}
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path='/'
          element={<Main />}
        />
        <Route
          path='/lobby'
          element={<Lobby />}
        />
        <Route
          path='/waiting-room'
          element={<WaitingRoom />}
        />
      </Route>
    </Routes>
  );
};

export default RoutesContainer;

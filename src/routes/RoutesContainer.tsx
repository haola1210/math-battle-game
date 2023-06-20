import Login from '@pages/Login';
import Main from '@pages/Main';
import Register from '@pages/Register';
import Welcome from '@pages/Welcome';
import { Route, Routes } from 'react-router-dom';

const RoutesContainer = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Main />}
      />
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
    </Routes>
  );
};

export default RoutesContainer;

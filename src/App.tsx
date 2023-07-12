import AuthContextProvider from '@contexts/AuthContext';
import RoutesContainer from '@routes/RoutesContainer';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer></ToastContainer>
      <RoutesContainer />
    </AuthContextProvider>
  );
}

export default App;

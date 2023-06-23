import Button from '@components/Button';
import Layout from '@components/Layout';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className='welcome-container'>
        <div className='welcome'>
          <div className='welcome__label'>Welcome</div>
          <div className='welcome__btns'>
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/register')}>Register</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;

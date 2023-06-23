import Button from '@components/Button';
import ILayoutPropsLayout from '@components/Layout';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <ILayoutPropsLayout>
      <div className='welcome'>
        <div className='welcome__label'>Welcome</div>
        <div className='welcome__btns'>
          <Button onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={() => navigate('/register')}>Register</Button>
        </div>
      </div>
    </ILayoutPropsLayout>
  );
};

export default Welcome;

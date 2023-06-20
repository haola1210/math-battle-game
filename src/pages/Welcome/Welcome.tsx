import Button from '@components/Button';
import LoginLayout from '@components/LoginLayout';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <LoginLayout>
      <div
        style={{
          border: '2px solid #8d99ae',
          width: '40%',
          height: '40%',
          borderRadius: '16px',
          padding: 4,
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 30 }}>Welcome</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <Button onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={() => navigate('/register')}>Register</Button>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Welcome;

import Button from '@components/Button';
import Input from '@components/Input';
import LoginLayout from '@components/LoginLayout';

const Register = () => {
  return (
    <LoginLayout>
      <div
        style={{
          border: '2px solid #8d99ae',
          width: '40%',
          // height: '40%',
          borderRadius: '16px',
          padding: 10,
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 30 }}>Register</div>
        <div style={{ width: '70%' }}>
          <Input label={'Username'} />
        </div>
        <div style={{ width: '70%' }}>
          <Input label={'Password'} />
        </div>
        <div>
          <Button>Register</Button>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Register;

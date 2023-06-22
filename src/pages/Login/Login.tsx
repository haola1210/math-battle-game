import Button from '@components/Button';
import Input from '@components/Input';
import LoginLayout from '@components/LoginLayout';
import './style.scss';

const Login = () => {
  return (
    <LoginLayout>
      <div className='login'>
        <div className='login__label'>Login</div>
        <div className='login__input'>
          <Input label={'Username'} />
        </div>
        <div className='login__input'>
          <Input label={'Password'} />
        </div>
        <div className='login__btn'>
          <Button>Login</Button>
          <Button>Register</Button>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Login;

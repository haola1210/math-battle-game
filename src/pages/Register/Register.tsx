import Button from '@components/Button';
import Input from '@components/Input';
import LoginLayout from '@components/LoginLayout';
import './style.scss';

const Register = () => {
  return (
    <LoginLayout>
      <div className='register'>
        <div className='register__label'>Register</div>
        <div className='register__input'>
          <Input label={'Username'} />
        </div>
        <div className='register__input'>
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

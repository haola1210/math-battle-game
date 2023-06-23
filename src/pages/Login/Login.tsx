import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import './style.scss';

const Login = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Login;

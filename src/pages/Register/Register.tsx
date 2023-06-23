import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import './style.scss';

const Register = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Register;

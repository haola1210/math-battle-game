import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import { useLoginLogic } from './hooks/useLoginLogic';
import './style.scss';

const Login = () => {
  const { formik, handleChangeValue, handleSubmitForm, handleNavigateRegister } = useLoginLogic();

  return (
    <Layout>
      <div className='login-container'>
        <div className='login'>
          <div className='login__label'>Login</div>
          <div className='login__input'>
            <Input
              label={'Username'}
              onChange={handleChangeValue}
              errorMessage={formik.errors.username}
              name='username'
            />
          </div>
          <div className='login__input'>
            <Input
              label={'Password'}
              onChange={handleChangeValue}
              errorMessage={formik.errors.password}
              type={'password'}
              name='password'
            />
          </div>
          <div className='login__btn'>
            <Button onClick={handleSubmitForm}>Login</Button>
            <Button onClick={handleNavigateRegister}>Register</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

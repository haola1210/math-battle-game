import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.scss';
import { login } from '@services/auth.service';
import { convertError } from '@utils/ConvertError';

const shema = yup.object({
  username: yup
    .string()
    .required('Username must be required')
    .max(24, `Username must less than 24 characters`)
    .min(6, `Username must more than 5 characters`),
  password: yup
    .string()
    .required('Password must be required')
    .min(8, `Password must more than 7 characters`),
});

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: shema,
    validateOnChange: false,
    async onSubmit(values) {
      const user = {
        username: values.username,
        password: values.password,
      };
      try {
        const { accessToken } = await login(user);
        localStorage.setItem('access_token', accessToken);
        toast('Login success!');
        navigate(localStorage.getItem('oldPath') ?? `/`, { replace: true });
        localStorage.removeItem('oldPath');
      } catch (error) {
        const errorMessage = convertError(error);
        formik.setErrors(errorMessage);
      }
    },
  });

  return (
    <Layout>
      <div className='login-container'>
        <div className='login'>
          <div className='login__label'>Login</div>
          <div className='login__input'>
            <Input
              label={'Username'}
              onChange={async (e) => formik.setFieldValue(`username`, e.target.value)}
              errorMessage={formik.errors.username}
            />
          </div>
          <div className='login__input'>
            <Input
              label={'Password'}
              onChange={async (e) => formik.setFieldValue(`password`, e.target.value)}
              errorMessage={formik.errors.password}
              type={'password'}
            />
          </div>
          <div className='login__btn'>
            <Button onClick={async () => formik.submitForm()}>Login</Button>
            <Button onClick={() => navigate(`/register`)}>Register</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

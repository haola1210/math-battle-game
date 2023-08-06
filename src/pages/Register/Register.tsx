import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import { useFormik } from 'formik';
import './style.scss';
import * as yup from 'yup';
import { type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '@services/auth.service';
import { toast } from 'react-toastify';
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
  confirm_password: yup
    .string()
    .required('Confirm password must be required')
    .min(8, `Confirm password must more than 7 characters`)
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
    },
    async onSubmit(values) {
      try {
        const payload = {
          username: values.username,
          password: values.password,
        };
        const user = await register(payload);
        if (user) {
          toast('Register successfull!');
          navigate('/login');
        }
      } catch (error) {
        const errorMessage = convertError(error);
        formik.setErrors(errorMessage);
      }
    },
    validationSchema: shema,
    validateOnChange: false,
  });

  const handleChangeValue = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    await formik.setFieldValue(name, value);
  };

  return (
    <Layout>
      <div className='register-container'>
        <div className='register'>
          <div className='register__label'>Register</div>
          <div className='register__input'>
            <Input
              label={'Username'}
              name='username'
              onChange={handleChangeValue}
              errorMessage={formik.errors.username}
            />
          </div>
          <div className='register__input'>
            <Input
              label={'Password'}
              onChange={handleChangeValue}
              name='password'
              errorMessage={formik.errors.password}
              type={'password'}
            />
          </div>
          <div className='register__input'>
            <Input
              label={'Confirm password'}
              onChange={handleChangeValue}
              name='confirm_password'
              errorMessage={formik.errors.confirm_password}
              type={'password'}
            />
          </div>
          <div className='register__btn--area'>
            <Button onClick={() => formik.handleSubmit()}>Register</Button>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

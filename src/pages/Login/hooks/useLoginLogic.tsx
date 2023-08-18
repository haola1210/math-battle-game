import { LINK } from '@constants/link';
import { login } from '@services/auth.service';
import { convertError } from '@utils/ConvertError';
import { useFormik } from 'formik';
import { type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

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

export const useLoginLogic = () => {
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
        navigate(LINK.LOBBY, { replace: true });
        localStorage.removeItem('oldPath');
      } catch (error) {
        const errorMessage = convertError(error);
        formik.setErrors(errorMessage);
      }
    },
  });

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    void formik.setFieldValue(name, value);
  };

  const handleSubmitForm = () => {
    void formik.submitForm();
  };

  const handleNavigateRegister = () => {
    navigate(LINK.REGISTER);
  };

  return { formik, handleNavigateRegister, handleChangeValue, handleSubmitForm };
};

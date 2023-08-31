import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import classNames from 'classnames';
import InputForm from '@/components/InputForm';
import { ToastContainer, toast } from 'react-toastify';

import styles from './SignUp.module.scss';

const validationSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên'),
  phone: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(/^(0|\+84)[1-9][0-9]{8}$/, 'Số điện thoại không hợp lệ'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: yup.string().min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận phải giống mật khẩu')
    .required('Vui lòng nhập lại mật khẩu'),
});

function SignUp() {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const transformedData = {
      ...data,
      email: data.email.toLowerCase(),
    };
    try {
      const response = await axios.post('https://mixfood-be-production.up.railway.app/api/auth/sign-up', transformedData);
      if (response) {
        toast.success('Đăng ký tài khoản thành công.');
        toast.success('Chúng tôi đã gửi mã xác thực vào gmail. Hãy xác thực để tiếp tục sử dụng dịch vụ.');
        toast.warn('Mã xác thực sẽ gửi đến bạn trong khoảng 1-2 phút.');
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <FormProvider {...methods}>
      <ToastContainer />
      <div className={classNames(styles.wrapper)}>
        <form onSubmit={methods.handleSubmit(onSubmit)} method='POST' className={`${styles.formWrapper}`}>
          <span className={classNames(styles.title)}>Đăng ký</span>
          <div className={classNames(styles.InputWrapper)}>
            <label className={classNames(styles.labelInput)} htmlFor='name'>
              Tên
            </label>
            <InputForm
              type='text'
              id='name'
              name='name'
              className={`${styles.signUpFormInput}`}
              placeholder='Tên'
            />
          </div>
          <div className={classNames(styles.InputWrapper)}>
            <label className={classNames(styles.labelInput)} htmlFor='phone'>
              Số điện thoại
            </label>
            <InputForm
              type='text'
              id='phone'
              name='phone'
              className={`${styles.signUpFormInput}`}
              placeholder='Số điện thoại'
            />
          </div>
          <div className={classNames(styles.InputWrapper)}>
            <label className={classNames(styles.labelInput)} htmlFor='email'>
              Email
            </label>
            <InputForm
              type='text'
              id='email'
              name='email'
              className={`${styles.signUpFormInput}`}
              placeholder='Email'
            />
          </div>
          <div className={classNames(styles.InputWrapper)}>
            <label className={classNames(styles.labelInput)} htmlFor='password'>
              Mật khẩu
            </label>
            <InputForm
              type='password'
              id='password'
              name='password'
              className={`${styles.signUpFormInput}`}
              placeholder='Mật khẩu'
            />
          </div>
          <div className={classNames(styles.InputWrapper)}>
            <label className={classNames(styles.labelInput)} htmlFor='confirmPassword'>
              Xác nhận mật khẩu
            </label>
            <InputForm
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              className={`${styles.signUpFormInput}`}
              placeholder='Xác nhận mật khẩu'
            />
          </div>
          <div className={`${styles.SignUpFormBtnWrapper}`}>
            <button className={`font-poppins ${styles.SignUpFormSubmitBtn}`} type='submit'>
              Đăng ký
            </button>
            <div className={classNames(styles.linkWrapper)}>
              <Link to='/' className={classNames(styles.LinkHome)}>
                Trang chủ
              </Link>
              <Link to='/signin' className={classNames(styles.LinkSignUp)}>
                Đăng nhập
              </Link>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

export default React.memo(SignUp);

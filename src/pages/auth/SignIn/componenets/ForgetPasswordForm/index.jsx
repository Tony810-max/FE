import React, { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import InputForm from '@/components/InputForm';
import styles from './ForgotPasswordForm.module.scss';

const validationSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
});

function ForgotPasswordForm() {
    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = useCallback(async (data) => {
        try {
            const response = await axios.post('https://mixfood-be-production.up.railway.app/api/auth/forgetPassword', data);
            if (response) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }, []);

    return (
        <FormProvider {...methods}>
            <ToastContainer />
            <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.modal}>
                <span className={styles.heading}>Quên mật khẩu</span>
                <InputForm
                    type='text'
                    id='email'
                    name='email'
                    className={styles.input}
                    placeholder='Nhập email'
                />
                <button className={styles.btn} type="submit"><span className='text-[#fff]'>Gửi</span></button>
            </form>
        </FormProvider>
    );
}

export default React.memo(ForgotPasswordForm);

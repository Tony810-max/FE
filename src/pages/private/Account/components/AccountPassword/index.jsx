import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import * as yup from 'yup';

import styles from './AccountPassword.module.scss';

const InputForm = React.lazy(() => import('@/components/InputForm'));

const schema = yup.object().shape({
    currentPassword: yup.string(),
    newPassword: yup.string(),
    birthday: yup.date().nullable(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Mật khẩu mới và xác nhận không giống nhau'),
});

function AccountPassword() {
    const [user, setUser] = useState();
    const methods = useForm({
        resolver: yupResolver(schema),
    });
    const { handleSubmit } = methods;

    useEffect(() => {
        const userLogin = Cookies.get('mixfooduser') ? JSON.parse(Cookies.get('mixfooduser')) : null;
        if (userLogin) {
            setUser(userLogin);
        }
    }, []);

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            email: user?.email
        }
        try {
            const response = await axios.put('https://mixfood-be-production.up.railway.app/api/auth/changePassword', formData);

            const { message } = response.data;
            toast.success(message);
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        } catch (error) {
            const { error: errorMessage } = error.response.data;
            toast.error(errorMessage);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
                className={classNames(styles.wrapper, 'font-poppins')}
            >
                <div className={classNames(styles.formWrapper)}>
                    <InputForm
                        name="currentPassword"
                        className={classNames(styles.FormInput)}
                        placeholder="Current Password"
                    />
                    <InputForm
                        name="newPassword"
                        className={classNames(styles.FormInput)}
                        placeholder="New Password"
                    />
                    <InputForm
                        name="confirmPassword"
                        className={classNames(styles.FormInput, 'mb-[24px]')}
                        placeholder="Confirm New Password"
                    />
                </div>
                <button
                    aria-label="btn"
                    className={classNames(styles.formBtn)}
                    type="submit"
                >
                    Đổi mật khẩu
                </button>
            </form>
        </FormProvider>
    );
}


export default AccountPassword;
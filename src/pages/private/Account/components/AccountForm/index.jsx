import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from "js-cookie";
import { memo, useEffect, useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames';
import InputForm from '@/components/InputForm';
import styles from './AccountForm.module.scss'
import axios from 'axios';

function AccountForm() {
    const [user, setUser] = useState()
    useEffect(() => {
        const userLogin = Cookies.get('mixfooduser') ? JSON.parse(Cookies.get('mixfooduser')) : null;
        if (userLogin) {
            setUser(userLogin);
        }
    }, [])
    const validationSchema = yup.object().shape({
        name: yup.string().required('Họ và tên là bắt buộc'),
        phone: yup
            .string()
            .required('Số điện thoại là bắt buộc')
            .matches(/^(0|\+84)[1-9][0-9]{8}$/, 'Số điện thoại không hợp lệ'),
    }); const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit } = methods;
    const onSubmit = async (data) => {
        try {
            const formData = {
                ...data,
                email: user?.email,
            }
            const response = await axios.put('https://mixfood-be-production.up.railway.app/api/auth/updateAccount', formData);

            const { message } = response.data;
            const updatedUser = {
                ...user,
                name: data.name,
                phone: data.phone,
            };

            setUser(updatedUser);
            Cookies.set('mixfooduser', JSON.stringify(updatedUser));

            toast.success(message);
        } catch (error) {
            const { error: errorMessage } = error.response.data;
            toast.error(errorMessage);
        }
    };
    return (
        <FormProvider {...methods}>
            <div className={classNames(styles.wrapper)}>
                <form
                    id='ratingForm'
                    onSubmit={handleSubmit(onSubmit)}
                    method='POST'
                    className={classNames(styles.formWrapper)}
                >
                    <div
                        className={classNames(
                            styles.InputWrapper,
                            'grid',
                            'md:grid-cols-2',
                            'md:gap-[50px]',
                            'xs:gap-[24px]'
                        )}
                    >
                        <div>
                            <label htmlFor='name'>Tên</label>
                            <InputForm
                                id="name"
                                type='text'
                                name='name'
                                className={classNames(styles.FormInput)}
                                placeholder='Nhập họ và tên'
                                defaultValue={user?.name}
                            />
                        </div>
                        <div>
                            <label htmlFor='phone'>Số điện thoại</label>
                            <InputForm
                                id="phone"
                                type='text'
                                name='phone'
                                className={classNames(styles.FormInput)}
                                placeholder='Nhập số điện thoại'
                                defaultValue={user?.phone}
                            />
                        </div>
                    </div>
                    <div className={classNames(styles.InputWrapper)}>
                        <label htmlFor='email'>Email</label>
                        <InputForm
                            id="email"
                            type='text'
                            name='email'
                            className={classNames(styles.FormInput, 'opacity-60')}
                            placeholder='Nhập email'
                            value={user?.email}
                            disabled
                        />
                    </div>
                    <ToastContainer />
                    <button type='submit' className={classNames(styles.formBtn)}>
                        Cập nhật
                    </button>
                </form>
            </div>
        </FormProvider>
    );
}

export default memo(AccountForm);
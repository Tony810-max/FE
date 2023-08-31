import Cookies from "js-cookie";
import { memo, useEffect, useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames';
import InputForm from '@/components/InputForm';
import styles from './AccountVerify.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AccountVerify() {
    const [user, setUser] = useState()
    useEffect(() => {
        const userLogin = Cookies.get('mixfooduser') ? JSON.parse(Cookies.get('mixfooduser')) : null;
        if (userLogin) {
            setUser(userLogin);
        }
    }, [])
    const methods = useForm();
    const { handleSubmit } = methods;
    const onVerify = async (data) => {
        const formData = {
            ...data,
            email: user?.email
        }
        try {
            const response = await axios.post('https://mixfood-be-production.up.railway.app/api/auth/verify', formData);
            const { message } = response.data;
            // Thay đổi thuộc tính isVerified trong Cookie thành true
            const userLogin = Cookies.get('mixfooduser') ? JSON.parse(Cookies.get('mixfooduser')) : null;
            if (userLogin) {
                userLogin.isVerified = true;
                Cookies.set('mixfooduser', JSON.stringify(userLogin));
            }
            toast.success(message);
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error) {
            const { error: errorMessage } = error.response.data;
            toast.error(errorMessage);
        }
    };
    return (
        <FormProvider {...methods}>
            <div className={classNames(styles.wrapper)}>
                <form
                    method='POST'
                    onSubmit={handleSubmit(onVerify)}
                    className={classNames(styles.formVerify, { 'lg:justify-between': user?.isVerified === false })}
                >
                    <label htmlFor='verificationCode' className='whitespace-nowrap'>Xác nhận tài khoản :</label>
                    {user?.isVerified === false ? <>
                        <InputForm
                            id="verificationCode"
                            type='text'
                            name='verificationCode'
                            className={classNames(styles.FormInputVerify)}
                            placeholder='Nhập mã xác thực'
                        />
                        <button type='submit' className={classNames(styles.verifyBtn)}>Xác thực</button>
                    </>
                        : (
                            <div className="items-center gap-[16px] flex">
                                <FontAwesomeIcon icon={faCheck} />
                                <span>Đã xác thực tài khoản</span>
                            </div>
                        )}

                </form>
            </div>
            <ToastContainer />
        </FormProvider>
    );
}

export default memo(AccountVerify);
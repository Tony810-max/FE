import { memo, useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import InputForm from '@/components/InputForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import styles from './BookForm.module.scss';
import Cookies from "js-cookie";

function BookForm() {
    const textArea = useRef();
    const [user, setUser] = useState()

    const validationSchema = yup.object().shape({
        name: yup.string().required('Họ và tên là bắt buộc'),
        date: yup.string().required('Ngày là bắt buộc'),
        time: yup.string().required('Giờ là bắt buộc'),
        count: yup.string().required('Hãy nhập số người')
    });

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        const userLogin = Cookies.get('mixfooduser') ? JSON.parse(Cookies.get('mixfooduser')) : null;
        if (userLogin) {
            setUser(userLogin);
        }
    }, [])

    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        if (user?.isVerified === true) {
            data.note = textArea.current.value;
            const formData = {
                ...data,
                phone: user?.phone,
                email: user?.email,
            }
            try {
                const response = await axios.post('https://mixfood-be-production.up.railway.app/api/booking/book', formData);
                if (response) {
                    toast.success(
                        'Đặt bàn thành công. Chúng tôi sẽ gọi xác nhận trong vài phút nữa. Cảm ơn Bạn đã ủng hộ'
                    );
                }
            } catch (error) {
                toast.error('Đặt bàn thất bại. Hãy kiểm tra lại thông tin và thử lại');
            }
        }
        else {
            toast.error('Hãy xác thực tài khoản trước khi đặt bàn')
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
                        <InputForm
                            type='text'
                            name='name'
                            className={classNames(styles.FormInput)}
                            placeholder='Nhập họ và tên'
                        />
                        <InputForm
                            type='text'
                            name='phone'
                            className={classNames(styles.FormInput, 'opacity-50')}
                            placeholder='Nhập số điện thoại'
                            value={user?.phone}
                            disabled
                        />
                    </div>
                    <div className={classNames(styles.InputWrapper)}>
                        <InputForm
                            type='text'
                            name='email'
                            className={classNames(styles.FormInput, 'opacity-50')}
                            placeholder='Nhập email'
                            value={user?.email}
                            disabled
                        />
                    </div>
                    <div className={classNames(styles.InputWrapper)}>
                        <InputForm
                            type='date'
                            name='date'
                            className={classNames(styles.FormInput)}
                            placeholder='Ngày'
                        />
                    </div>
                    <div className={classNames(styles.InputWrapper)}>
                        <InputForm
                            type='time'
                            name='time'
                            className={classNames(styles.FormInput)}
                            placeholder='Giờ'
                        />
                    </div>
                    <div className={classNames(styles.InputWrapper)}>
                        <InputForm
                            type='number'
                            name='count'
                            min="1"
                            max="50"
                            className={classNames(styles.FormInput)}
                            placeholder='Số người'
                        />
                    </div>
                    <div className={classNames(styles.InputWrapper)}>
                        <textarea
                            ref={textArea}
                            name='note'
                            className={classNames(styles.FormInput, 'h-[120px]')}
                            placeholder='Ghi chú'
                        />
                    </div>
                    <ToastContainer />
                    <button type='submit' className={classNames(styles.formBtn)}>
                        Gửi
                    </button>
                </form>
            </div>
        </FormProvider>
    );
}

export default memo(BookForm);

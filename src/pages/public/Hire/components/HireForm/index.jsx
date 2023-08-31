import { memo, useRef } from "react";
import { useForm, FormProvider, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import InputForm from '@/components/InputForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './HireForm.module.scss';
import axios from "axios";

function HireForm() {
    const textArea = useRef();

    const validationSchema = yup.object().shape({
        name: yup.string().required('Họ và tên là bắt buộc'),
        phone: yup
            .string()
            .required('Số điện thoại là bắt buộc')
            .matches(/^(0|\+84)[1-9][0-9]{8}$/, 'Số điện thoại không hợp lệ'),
        email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        dateOfBirth: yup.date().required('Ngày sinh là bắt buộc'),
        hometown: yup.string().required('Quê quán là bắt buộc'),
        experience: yup.string().required('Vui lòng trả lời hết các câu hỏi'),
        longTime: yup.string().required('Vui lòng trả lời hết các câu hỏi'),
    });

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit } = methods;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const provinces = [
        "An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Kạn", "Bắc Giang", "Bắc Ninh",
        "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau",
        "Cao Bằng", "Cần Thơ", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai",
        "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương",
        "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang",
        "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định",
        "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
        "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La",
        "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang",
        "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái",
    ];

    const onSubmit = async (data) => {
        data.dateOfBirth = formatDate(data.dateOfBirth);
        data.note = textArea.current.value;

        try {
            const response = await axios.post('https://mixfood-be-production.up.railway.app/api/hire/hire-form', data);
            if (response) {
                toast.success('Chúng tôi đã nhận được thông tin. Chúng tôi sẽ sớm liên hệ đến bạn sớm nhất');
            }
            methods.reset();
        } catch (error) {
            // Show error toast if the API call fails
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');

            console.error('Error submitting form:', error);
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
                            className={classNames(styles.FormInput)}
                            placeholder='Nhập số điện thoại'
                        />
                    </div>
                    <div className={classNames(styles.InputWrapper)}>
                        <InputForm
                            type='text'
                            name='email'
                            className={classNames(styles.FormInput)}
                            placeholder='Nhập email'
                        />
                    </div>
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
                            <label className='whitespace-nowrap'>Ngày sinh:</label>
                            <Controller
                                control={methods.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <InputForm
                                        type='date'
                                        {...field}
                                        className={classNames(styles.FormInput)}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label className='whitespace-nowrap'>Quê quán:</label>
                            <Controller
                                control={methods.control}
                                name="hometown"
                                defaultValue={'An Giang'}
                                render={({ field }) => (
                                    <select {...field} className={classNames(styles.FormInput)}>
                                        {provinces.map((province) => (
                                            <option key={province} value={province}>
                                                {province}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>
                    </div>
                    <div className={classNames(styles.InputWrapper)}>
                        <label className='whitespace-nowrap'>Bạn có kinh nghiệm làm việc chưa ? </label>
                        <Controller
                            control={methods.control}
                            name="experience"
                            defaultValue={'no'}
                            render={({ field }) => (
                                <select {...field} className={classNames(styles.FormInput)}>
                                    <option value={'no'}>Chưa có kinh nghiệm</option>
                                    <option value={'yes'}>Đã có kinh nghiệm</option>
                                </select>
                            )}
                        />
                    </div>
                    <div className={classNames(styles.InputWrapper)}>
                        <label className='whitespace-nowrap'>Bạn có làm lâu dài với chúng tôi không ?</label>
                        <Controller
                            control={methods.control}
                            name="longTime"
                            defaultValue={'no'}
                            render={({ field }) => (
                                <select {...field} className={classNames(styles.FormInput)}>
                                    <option value={'no'}>Không</option>
                                    <option value={'yes'}>Có</option>
                                </select>
                            )}
                        />
                    </div>
                    <div className={classNames(styles.InputWrapper)}>
                        <textarea
                            ref={textArea}
                            name='note'
                            className={classNames(styles.FormInput, 'h-[120px]')}
                            placeholder='Bạn có mong muốn gì sau khi vào làm việc không ?'
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

export default memo(HireForm);

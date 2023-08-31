import { memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from "react-hook-form";
import * as Yup from "yup";
import styles from './AdminLoginForm.module.scss'
import classNames from "classnames";
import InputForm from "@/components/InputForm";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const schema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
});


function AdminLoginForm() {
    const navigate = useNavigate()
    const methods = useForm({
        resolver: yupResolver(schema),
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            email: data.email.toLowerCase(),
        };
        try {
            const response = await axios.post('https://mixfood-be-production.up.railway.app/api/auth/sign-in', transformedData);
            const user = response.data;
            if (user) {
                if (user.rules === true) {
                    toast.success('Đăng nhập thành công');
                    setTimeout(() => {
                        navigate('/admin/home')
                    }, 4000)
                }
            } else {
                toast.error('Đăng nhập thất bại');
            }
        } catch (error) {
            toast.error('Đăng nhập thất bại');
        }
    };

    return (
        <FormProvider {...methods}>
            <ToastContainer />
            <form className={classNames(styles.wrapper)} onSubmit={handleSubmit(onSubmit)}>
                <span className={classNames(styles.heading)}>Hello admin</span>
                <div className={classNames(styles.form)}>
                    <div className={classNames(styles.item)}>
                        <label className={classNames(styles.label)} htmlFor="email">Tài khoản:</label>
                        <InputForm
                            name="email"
                            type="text"
                            className={classNames(styles.input)}
                            placeholder="Nhập email"
                        />
                    </div>
                    <div className={classNames(styles.item)}>
                        <label className={classNames(styles.label)} htmlFor="password">Mật khẩu:</label>
                        <InputForm
                            name="password"
                            type="password"
                            className={classNames(styles.input)}
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    <button type="submit" className={classNames(styles.btnLogin)}>Đăng nhập</button>
                </div>
                <div className="inline-flex mt-[24px] gap-[8px] hover:opacity-60 items-center">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <Link className="text-[#000] no-underline" to={'/'}>Trang chủ</Link>
                </div>

            </form>
        </FormProvider>
    );
}

export default memo(AdminLoginForm);

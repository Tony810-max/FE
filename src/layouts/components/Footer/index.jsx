import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss'

import logo from '@/img/Header/logo.png'

function Footer() {
    return (
        <footer className={`text-center text-lg-start text-muted ${styles.wrapper}`}>
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

            </section>
            <section className="text-[#fff]">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4 flex items-center xs:justify-center md:justify-start">
                                <img src={logo} alt='logo' className='w-[40px] h-[40px] mr-[12px]' />
                                MIX FOOD
                            </h6>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Dịch vụ
                            </h6>
                            <p>
                                <Link to={'/signin'} className="text-reset no-underline hover:text-[#ccc]">Đăng nhập</Link>
                            </p>
                            <p>
                                <Link to={'/admin'} className="text-reset no-underline hover:text-[#ccc]">Quản trị</Link>
                            </p>
                            <p>
                                <Link to={'/hire'} className="text-reset no-underline hover:text-[#ccc]">Tuyển dụng</Link>
                            </p>
                            <p>
                                <a href='https://www.facebook.com/mixfoodamthucthai' className="text-reset no-underline hover:text-[#ccc]">Trợ giúp</a>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                            <p>Địa chỉ: K49 Nguyễn Văn Thoại, TP Đà Nẵng</p>
                            <p>Liên hệ : (+84)905 47 37 28 (A. Vương)</p>
                            <p> Mở cửa : 09:00 ~ 22:00</p>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}

export default memo(Footer);
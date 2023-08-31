import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';

function PrivateLayout({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const mixfooduser = Cookies.get('mixfooduser');

        if (!mixfooduser) {
            navigate('/signin')
            setTimeout(() => {
                toast.error("Bạn cần đăng nhập")
            }, 500)
        }
    }, [navigate]);

    return (
        <div>
            <ToastContainer />
            <Header />
            <div className="main">{children}</div>
            <Footer />
        </div>
    );
}

export default PrivateLayout;

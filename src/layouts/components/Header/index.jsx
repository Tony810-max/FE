import classNames from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { Popper } from 'react-popper';

import logo from '@/img/Header/logo.png';

import styles from './Header.module.scss';

library.add(faUser, faEnvelope);

function Header() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);
    const popperRef = useRef(null);

    useEffect(() => {
        const hasUserCookie = Cookies.get('mixfooduser');
        if (hasUserCookie) {
            setUser(hasUserCookie);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('mixfooduser');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
        setDropdownActive(false);
        setShowMenu(false);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handlePushToAccount = () => {
        window.location.href = '/account'
    }

    const handleOutsideClick = (event) => {
        if (popperRef.current && !popperRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.main, 'container', 'px-0', { [styles.expanded]: isExpanded === true })}>
                <div className={classNames(styles.hideBars)}>
                    <nav className="navbar">
                        <div className="container-fluid">
                            <Link className={classNames(styles.LogoText, 'mx-0')} to="/">
                                <img src={logo} alt="logo" className={classNames('d-inline-block', 'align-text-top', 'sm:w-[44px]', 'sm:h-[44px]', 'xs:w-[34px]', 'xs:h-[34px]')} />
                                Mix food
                            </Link>
                        </div>
                    </nav>
                    <button onClick={toggleExpanded} className={classNames(styles.hamburger)}>
                        <div className={classNames(styles.bar)}></div>
                        <div className={classNames(styles.bar)}></div>
                        <div className={classNames(styles.bar)}></div>
                    </button>
                </div>
                <div className={classNames(styles.navbar, { [styles.show]: isExpanded === true })}>
                    <div className={classNames(styles.listNavbar, { [styles.dropdown]: isExpanded === true })}>
                        <Link className={classNames(styles.navbarLink, styles.textNoWrap)} to="/">Trang chủ</Link>
                        <Link className={classNames(styles.navbarLink, styles.textNoWrap)} to="/book">Đặt bàn</Link>
                        <button onClick={() => setDropdownActive(!dropdownActive)} className={classNames(styles.dropdownLink, 'xl:max-w-[120px]')}>
                            <span className={classNames('flex', 'items-center', 'gap-[8px]')}>
                                <span className={classNames(styles.textNoWrap)}>Đặt món</span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                            <div className={classNames(styles.menuNavbar, 'pl-[16px]', { [styles.showDropdown]: dropdownActive === true })}>
                                <div className={classNames('flex', 'items-center', 'gap-[12px]')}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <a href='https://shopeefood.vn/da-nang/mix-food-lau-nuong' className={classNames(styles.navbarLink)} >Shopeefood</a>
                                </div>
                                <div className={classNames('flex', 'items-center', 'gap-[12px]')}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <a href='https://food.grab.com/vn/vi/restaurant/mix-food-%E1%BA%A9m-th%E1%BB%B1c-th%C3%A1i-delivery/5-C2DHA6LJLJVZJX' className={classNames(styles.navbarLink)} >Grabfood</a>
                                </div>
                                <div className={classNames('flex', 'items-center', 'gap-[12px]')}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <a href='https://www.facebook.com/messages/t/661843517545518' className={classNames(styles.navbarLink)} >Fanpage</a>
                                </div>
                            </div>
                        </button>
                        {user === null &&
                            <Link className={classNames(styles.navbarLink, styles.textNoWrap)} to="/signin">Đăng nhập</Link>
                        }
                    </div>
                    <div className={classNames(styles.popperShow, { [styles.ppShowed]: showMenu === true })}>
                        {user && (
                            <button className={classNames(styles.userIcon, { [styles.showUserIcon]: isExpanded === true })} onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faUser} className={classNames(styles.userIconMain)} />
                            </button>
                        )}
                        {user && showMenu && (
                            <Popper placement="bottom" referenceElement={popperRef.current}>
                                {({ ref, style, placement }) => (
                                    <div ref={ref} style={style} data-placement={placement} className={classNames(styles.userMenu)} onClick={handleOutsideClick}>
                                        <button onClick={handlePushToAccount}>Tài khoản</button>
                                        <button onClick={handleLogout}>Đăng xuất</button>
                                    </div>
                                )}
                            </Popper>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

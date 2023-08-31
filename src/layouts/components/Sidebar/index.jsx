import { memo, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Sidebar.module.scss';
import axios from 'axios';

function Sidebar() {
  const location = useLocation();
  const { pathname } = location;
  const [countBooking, setCountBooking] = useState();
  const [countHire, setCountHire] = useState();

  useEffect(() => {
    fetchUncheckedBookingCount();
    fetchUnconfirmedHireCount();
  }, []);

  const fetchUncheckedBookingCount = async () => {
    try {
      const response = await axios.get('https://mixfood-be-production.up.railway.app/api/admin/getUncheckedBookingCount');
      if (response && response.data && response.data.count) {
        setCountBooking(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching unchecked booking count', error);
    }
  };

  const fetchUnconfirmedHireCount = async () => {
    try {
      const response = await axios.get('https://mixfood-be-production.up.railway.app/api/hire/get-hires-unconfirm');
      if (response && response.data && response.data.totalCount) {
        setCountHire(response.data.totalCount);
      }
    } catch (error) {
      console.error('Error fetching unconfirmed hire count', error);
    }
  };

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.sidebar)}>
        <Link
          to={'/admin/home'}
          className={classNames(styles.item, { [styles.active]: pathname === '/admin/home' })}
        >
          Trang chủ
        </Link>
        <Link
          to={'/admin/account'}
          className={classNames(styles.item, { [styles.active]: pathname === '/admin/account' })}
        >
          Tài khoản
        </Link>
        <Link
          to={'/admin/booking'}
          className={classNames(styles.item, 'flex', 'justify-between', { [styles.active]: pathname === '/admin/booking' })}
        >
          Đặt bàn
          {countBooking && <span className='rounded-[50%] bg-red-500 w-[28px] h-[28px] flex items-center justify-center text-[#fff] text-[20px]'>{countBooking}</span>}
        </Link>
        <Link
          to={'/admin/approved-tables'}
          className={classNames(styles.item, { [styles.active]: pathname === '/admin/approved-tables' })}
        >
          Bàn đã duyệt
        </Link>
        <Link
          to={'/admin/recruitment'}
          className={classNames(styles.item, 'flex', 'justify-between', { [styles.active]: pathname === '/admin/recruitment' })}
        >
          Tuyển dụng
          {countHire && <span className='rounded-[50%] bg-red-500 w-[28px] h-[28px] flex items-center justify-center text-[#fff] text-[20px]'>{countHire}</span>}
        </Link>
        <Link
          to={'/admin/reviews'}
          className={classNames(styles.item, { [styles.active]: pathname === '/admin/reviews' })}
        >
          Đánh giá
        </Link>
      </div>
      <Link to={'/'} className={classNames(styles.item)}>
        Đăng xuất
      </Link>
    </div>
  );
}

export default memo(Sidebar);

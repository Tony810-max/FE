import classNames from "classnames";
import styles from './AdminHome.module.scss'
import AdminTitle from "@/components/AdminTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminHome() {
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
    <section className={classNames(styles.wrapper, 'container', 'px-0')}>
      <div className={classNames('my-[40px]')}>
        <AdminTitle title={'Trang chủ'} />
      </div>
      <div>
        <Link to={'/admin/booking'} className="no-underline rounded-md p-[24px] flex flex-col bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
          <span className="text-[#fff] text-[24px] leading-[26px] font-semibold">Đơn đặt bàn</span>
          <span className="text-[#fff] text-[24px] leading-[26px]">{countBooking}</span>
        </Link>
      </div>
      <div className="mt-[16px]">
        <Link to={'/admin/recruitment'} className="no-underline rounded-md p-[24px] flex flex-col bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
          <span className="text-[#fff] text-[24px] leading-[26px] font-semibold">Tuyển dụng</span>
          <span className="text-[#fff] text-[24px] leading-[26px]">{countHire}</span>
        </Link>
      </div>
    </section>
  );
}

export default AdminHome;
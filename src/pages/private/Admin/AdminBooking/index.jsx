import classNames from "classnames";
import styles from './AdminBooking.module.scss'
import AdminTitle from "@/components/AdminTitle";
import BookingTable from "./BookingTable";

function AdminBooking() {
    return (
        <section className={classNames(styles.wrapper, 'container', 'px-0')}>
            <div className={classNames('my-[40px]')}>
                <AdminTitle title={'Đặt bàn'} />
            </div>
            <div>
                <BookingTable />
            </div>
        </section>
    );
}

export default AdminBooking;
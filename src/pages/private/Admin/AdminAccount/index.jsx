import classNames from "classnames";
import styles from './AdminAccount.module.scss'
import AdminTitle from "@/components/AdminTitle";
import AccoutTable from "./AccountTable";

function AdminAccount() {
    return (
        <section className={classNames(styles.wrapper, 'container', 'px-0')}>
            <div className={classNames('my-[40px]')}>
                <AdminTitle title={'Khách hàng'} />
            </div>
            <div>
                <AccoutTable/>
            </div>
        </section>
    );
}

export default AdminAccount;
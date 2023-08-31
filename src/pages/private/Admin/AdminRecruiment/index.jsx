import classNames from "classnames";
import styles from './AdminRecruiment.module.scss'
import AdminTitle from "@/components/AdminTitle";
import RecruimentTable from "./RecruimentTable";

function AdminRecruiment() {
    return (
        <section className={classNames(styles.wrapper, 'container', 'px-0')}>
            <div className={classNames('my-[40px]')}>
                <AdminTitle title={'Tuyển dụng'} />
            </div>
            <div>
                <RecruimentTable />
            </div>
        </section>
    );
}

export default AdminRecruiment;
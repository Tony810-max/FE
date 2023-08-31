import classNames from "classnames";
import styles from './AdminApprovedTable.module.scss'
import AdminTitle from "@/components/AdminTitle";
import ApprovedTable from "./ApprovedTable";

function AdminApprovedTable() {
    return (
        <section className={classNames(styles.wrapper, 'container', 'px-0')}>
            <div className={classNames('my-[40px]')}>
                <AdminTitle title={'Bàn đã duyệt'} />
            </div>
            <div>
                <ApprovedTable />
            </div>
        </section>
    );
}

export default AdminApprovedTable;
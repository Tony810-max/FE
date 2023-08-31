import classNames from "classnames";
import styles from './AdminReviews.module.scss'
import AdminTitle from "@/components/AdminTitle";
import ReviewTable from "./ReviewTable";

function AdminReviews() {
    return (
        <section className={classNames(styles.wrapper, 'container', 'px-0')}>
            <div className={classNames('my-[40px]')}>
                <AdminTitle title={'Đánh giá'} />
            </div>
            <ReviewTable />
        </section>
    );
}

export default AdminReviews;
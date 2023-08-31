import classNames from "classnames";
import styles from './AdminLogin.module.scss'
import AdminLoginForm from "./component/AdminLoginForm";

function AdminLogin() {
    return (
        <section className={classNames(styles.wrapper, 'container', 'px-0')}>
            <AdminLoginForm />
        </section>
    );
}

export default AdminLogin;
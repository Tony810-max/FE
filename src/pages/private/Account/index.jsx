import classNames from 'classnames';
import styles from './Account.module.scss'
import AdminTitle from '@/components/AdminTitle';
import AccountForm from './components/AccountForm';
import AccountPassword from './components/AccountPassword';
import AccountVerify from './components/AccountVerify';

function Account() {
    return (
        <section className={classNames(styles.wrapper, 'container', 'min-h-[100vh]', 'px-0')}>
            <div className={classNames('flex', 'justify-center', 'mb-[80px]')}>
                <span className={classNames(styles.title)}>Thông tin</span>
            </div>
            <div className='flex flex-col gap-[20px] mb-[40px]'>
                <AdminTitle title="Tài khoản" />
                <AccountForm />
            </div>
            <div className='flex flex-col gap-[20px] mb-[40px]'>
                <AdminTitle title="Xác thực" />
                <AccountVerify />
            </div>
            <div className='flex flex-col gap-[20px]'>
                <AdminTitle title="Đổi mật khẩu" />
                <AccountPassword />
            </div>
        </section>
    );
}

export default Account;
import { memo } from 'react';
import styles from './Book.module.scss'
import classNames from 'classnames';
import BookForm from './components/BookForm';

function Book() {
    return (
        <section className={classNames(styles.wrapper, 'container', 'px-0')}>
            <div className={classNames('flex', 'justify-center', 'mb-[80px]')}>
                <span className={classNames(styles.title)}>Đặt bàn</span>
            </div>
            <BookForm />
        </section>
    );
}

export default memo(Book);
import { memo } from "react";
import styles from './Hire.module.scss'
import classNames from "classnames";
import HireForm from "./components/HireForm";

function Hire() {
    return (
        <section className={classNames(styles.wrapper, 'container', 'px-0')}>
            <div className={classNames('flex', 'justify-center', 'mb-[80px]')}>
                <span className={classNames(styles.title)}>Tuyển dụng</span>
            </div>
            <HireForm />
        </section>
    );
}

export default memo(Hire);
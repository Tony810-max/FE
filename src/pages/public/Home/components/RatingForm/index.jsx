import classNames from "classnames";
import { memo } from "react";
import styles from './RatingForm.module.scss'

//img
import titleVector from '@/img/vectorTitle.png'

//css
import 'react-toastify/dist/ReactToastify.css';
import Form from "./components/Form";


function RatingForm() {
    return (
        <section className={classNames(styles.wrapper)}>
            <div className={classNames(styles.ratingForm, 'container', 'px-0')}>
                <div className={classNames(styles.title)}>
                    <span className={classNames(styles.titleText)}>
                        Gửi đánh giá
                    </span>
                    <img src={titleVector} alt='vector' className={classNames(styles.vector)} />
                </div>
                <div className={classNames(styles.form)}>
                    <Form/>
                </div>
            </div>
        </section>
    );
}

export default memo(RatingForm);
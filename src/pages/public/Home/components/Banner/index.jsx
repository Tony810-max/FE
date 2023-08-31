import classNames from 'classnames';
import styles from './Banner.module.scss'

//image
import bannerImg from '@/img/Banner/banner.png'
import { memo } from 'react';
import { Link } from 'react-router-dom';
function Banner() {
    return ( 
        <section className={classNames(styles.wrapper)}>
            <div className={classNames(styles.banner)}>
                <img className={classNames(styles.img)} src={bannerImg} alt='banner' />
            </div>
            <div className={classNames(styles.textWrapper)}>
                <span className={classNames(styles.brand)}>MIX FOOD</span>
                <span className={classNames(styles.desBrand)}>Thiên đường ẩm thực Thái</span>
                <Link to={'/book'} className={classNames(styles.bookBtn, 'no-underline')} aria-label='button book tabke'>Đặt bàn</Link>
            </div>
        </section>
     );
}

export default memo(Banner);
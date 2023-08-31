import { memo } from 'react';
import styles from './BestSeller.module.scss'
import classNames from 'classnames';
import BestSellerItem from './components/BestSellerItem';

//img
import titleVector from '@/img/vectorTitle.png'
import goixoaiImg from '@/img/BestSeller/goixoai.png'
import goitomthailanImg from '@/img/BestSeller/goitomthailan.png'
import goixoaicabasaImg from '@/img/BestSeller/goixoaicabasa.png'

function BestSeller() {
    return (
        <section className={classNames(styles.wrapper, 'container', 'px-0')}>
            <div className={classNames(styles.title)}>
                <span className={classNames(styles.titleText)}>
                    Best Seller
                </span>
                <img src={titleVector} alt='vector' className={classNames(styles.vector)} />
            </div>
            <div className={classNames(styles.bestseller, "grid", "md:grid-cols-3", "gap-[50px]", "xs:grid-cols-1")}>
                <BestSellerItem
                    img={goixoaiImg}
                    name='Gỏi xoài'
                />
                <BestSellerItem
                    img={goitomthailanImg}
                    name='Gỏi Tôm Thái Lan'
                />
                <BestSellerItem
                    img={goixoaicabasaImg}
                    name='Gỏi xoài cá ba sa'
                />
            </div>
        </section>
    );
}

export default memo(BestSeller);
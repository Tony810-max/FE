import styles from './Rating.module.scss'
import { memo, useEffect, useState } from "react";
import classNames from "classnames";
import SwiperCore, { Navigation, Pagination, Grid, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';


//img
import titleVector from '@/img/vectorTitle.png'

import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import RatingCard from './components/RatingCard';

const modulesSwiper = [Grid, Pagination, Navigation, Autoplay];
const breakpointsSwiper = {
    320: {
        slidesPerView: 1,
        spaceBetween: 30,
    },
    576: {
        slidesPerView: 1,
        spaceBetween: 30,
    },
    768: {
        slidesPerView: 1,
        spaceBetween: 30,
    },
    992: {
        slidesPerView: 1,
        spaceBetween: 30,
    },
    1200: {
        slidesPerView: 1,
        spaceBetween: 30,
    },
};

SwiperCore.use(modulesSwiper);
function Rating() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviewsToShow();
    }, []);

    const fetchReviewsToShow = async () => {
        try {
            const response = await axios.get('https://mixfood-be-production.up.railway.app/api/review/reviewsToShow');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews', error);
        }
    };
    return (
        <section className={classNames(styles.wrapper)}>
            <div className={classNames(styles.Rating, 'container', 'px-0')}>
                <div className={classNames(styles.title)}>
                    <span className={classNames(styles.titleText)}>
                        Đánh giá
                    </span>
                    <img src={titleVector} alt='vector' className={classNames(styles.vector)} />
                </div>
                <div className={classNames(styles.menuSwiper)}>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        modules={modulesSwiper}
                        breakpoints={breakpointsSwiper}
                        autoplay={{ delay: 3000 }}
                    >
                        {reviews.map((review, index) => (
                            <SwiperSlide key={index}>
                                <RatingCard
                                    name={review.name}
                                    text={review.rating}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default memo(Rating);
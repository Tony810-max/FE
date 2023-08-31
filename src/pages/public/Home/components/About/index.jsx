import { memo } from "react";
import styles from './About.module.scss'
import classNames from "classnames";

//img
import titleVector from '@/img/vectorTitle.png'
import aboutImg from '@/img/About/about.png'

function About() {
    return (
        <section className={classNames(styles.wrapper)}>
            <div className={classNames(styles.about, 'container', 'px-0')}>
                <div className={classNames(styles.title)}>
                    <span className={classNames(styles.titleText)}>
                        Giới thiệu
                    </span>
                    <img src={titleVector} alt='vector' className={classNames(styles.vector)} />
                </div>
                <div className={classNames(styles.content, 'grid', 'lg:grid-cols-2', 'gap-[50px]', 'xs:grid-cols-1', 'lg:indent-[48px]', 'xs:indent-0')}>
                    <div className={classNames(styles.paragraph)}>
                        <span className={classNames(styles.paraText)}>
                            Chào mừng đến với Mix Food, một địa điểm ẩm thực Thái Lan độc đáo tại Đà Nẵng!
                        </span>
                        <span className={classNames(styles.paraText)}>
                            Mix Food là một nhà hàng ẩm thực Thái Lan nổi tiếng tọa lạc tại trung tâm thành phố Đà Nẵng. Với không gian ấm cúng, chúng tôi mang đến cho khách hàng một trải nghiệm ẩm thực tuyệt vời và phong cách phục vụ chuyên nghiệp.
                        </span>
                        <span className={classNames(styles.paraText)}>
                            Không chỉ có món ăn ngon miệng, Mix Food còn chú trọng đến việc tạo ra một không gian thoải mái và ấm cúng cho khách hàng. Với thiết kế trang nhã, chúng tôi tạo ra một không gian lý tưởng để bạn thưởng thức ẩm thực Thái Lan và tận hưởng buổi tối thú vị bên gia đình và bạn bè.
                        </span>
                        <span className={classNames(styles.paraText)}>
                            Không chỉ dành riêng cho bữa ăn tại nhà hàng, Mix Food còn cung cấp dịch vụ giao hàng đến tận nơi để khách hàng có thể thưởng thức món ăn Thái Lan ngon lành trong môi trường của gia đình mình.
                        </span>
                        <span className={classNames(styles.paraText)}>
                            Với tinh thần phục vụ tận tâm và chất lượng hàng đầu, chúng tôi cam kết mang đến cho khách hàng một trải nghiệm ẩm thực tuyệt vời và đáng nhớ tại Mix Food. Hãy đến và khám phá văn hóa ẩm thực Thái Lan đặc sắc cùng chúng tôi tại Đà Nẵng!
                        </span>
                    </div>
                    <div className={classNames(styles.aboutImgWrapper)}>
                        <img src={aboutImg} alt="about" className={classNames(styles.aboutImg)} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(About);
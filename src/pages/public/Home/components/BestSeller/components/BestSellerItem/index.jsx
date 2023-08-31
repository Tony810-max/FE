import { memo } from "react";
import styles from './BestSellerItem.module.scss'
import classNames from "classnames";

function BestSellerItem(props) {
    return ( 
        <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.imgWrapper)}> 
                <img src={props.img} alt="best seller" className={classNames(styles.img)}/>
            </div>
            <span className={classNames(styles.name)}>{props.name}</span>
        </div>
     );
}

export default memo(BestSellerItem);
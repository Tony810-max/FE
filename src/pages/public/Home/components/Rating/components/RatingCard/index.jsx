import { memo } from "react";
import styles from './RatingCard.module.scss'
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function RatingCard(props) {
    return (
        <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.avatar)}>
                <FontAwesomeIcon icon={faUser} className={classNames(styles.avatarIcon)} />
                <span className={classNames(styles.name)}>{props.name}</span>
            </div>
            <div className="flex justify-center break-all">
                <span className={classNames(styles.rateText)}>{props.text}</span>
            </div>
        </div>
    );
}

export default memo(RatingCard);
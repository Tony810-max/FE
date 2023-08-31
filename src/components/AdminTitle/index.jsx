import classNames from "classnames";
import styles from './AdminTitle.module.scss'

function AdminTitle(props) {
    return ( 
        <div className={classNames(styles.wrapper)}>
            <span className={classNames(styles.block)}/>
            <span className={classNames(styles.title)}>{props.title}</span>
        </div>
     );
}

export default AdminTitle;
import { Link } from "react-router-dom";
import styles from "./MenuLink.module.scss";

const MenuLink = ({ text, target, dropdown }) => {
    return (
        <li className={styles.menuLink}>
            <Link to={target} className={styles.mainLink}>
                {text}
            </Link>
            
            <div className={styles.dropdown}>
                {dropdown.map(({ target, text }, id) => (
                    <Link key={id} to={target} className={styles.subLink}>
                        {text}
                    </Link>
                ))}
            </div>
        </li>
    )
}

export default MenuLink;
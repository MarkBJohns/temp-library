import { Link } from "react-router-dom";
import styles from "./Desktop.module.scss";
import MenuLink from "../MenuLink";
import { useIsPageTop } from "../../hooks";

const Desktop = ({ logo, links }) => {
    const isTop = useIsPageTop();
    
    return (
        <nav className={`${styles.navbar} ${isTop ? styles.isTop : ""}`}>
            <div className={styles.container}>
            
                <Link to={"/"} className={styles.logo}>
                    <img src={logo.src} alt={logo.alt} />
                </Link>
            
                <ul className={styles.navMenu}>
                    {links.map(({ text, target, dropdown }, id) => (
                        <MenuLink
                            key={id}
                            text={text}
                            target={target}
                            dropdown={dropdown}
                        />
                    ))}
                </ul>
            
            </div>
        </nav>
    )
}

export default Desktop;
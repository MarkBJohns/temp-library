import { useState } from "react";
import styles from "./Mobile.module.scss";
import { Link } from "react-router-dom";
import { useResetMenu } from "../../hooks";

const Mobile = ({ logo, burger, cancel, links }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    
    useResetMenu(() => setShowSidebar(false));
    
    const toggleSidebar = () => {
        setShowSidebar(toggle => !toggle);
    }
    
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                
                <Link to={"/"} className={styles.logo}>
                    <img src={logo.src} alt={logo.alt} />
                </Link>
                
                <div className={styles.burger}>
                    <img
                        src={burger.src}
                        alt={burger.alt}
                        onClick={toggleSidebar}
                    />
                </div>
                
                <div className={`${styles.sidebar} ${showSidebar ? styles.open : ""}`}>
                    <div className={styles.sidebarHeader}>
                        <Link to={"/"} className={styles.logo}>
                            <img src={logo.src} alt={logo.alt} />
                        </Link>
                        
                        <div className={styles.cancel}>
                            <img
                                src={cancel.src}
                                alt={cancel.alt}
                                onClick={toggleSidebar}
                            />
                        </div>
                    </div>
                    
                    <ul className={styles.navMenu}>
                        {links.map(({ text, target }, id) => (
                            <Link key={id} to={target} onClick={() => setShowSidebar(false)}>
                                {text}
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Mobile;
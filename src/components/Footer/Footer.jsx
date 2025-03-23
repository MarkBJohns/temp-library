
import { Link } from "react-router-dom";
import { useSendToSection } from "./hooks";
import styles from "./Footer.module.scss";
import content from "./content";
const { logo, locationPin, phoneIcon, contacts, navigation, hours } = content;

const Footer = () => {
    const sendToSection = useSendToSection();
    
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                
                <Link to={"/"} className={styles.logo} onClick={() => sendToSection("hero")}>
                    <img src={logo.src} alt={logo.alt} />
                </Link>
                
                <div className={styles.contacts}>
                    <h3 className={styles.title}>{contacts.heading}</h3>
                    
                    <div className={styles.contactContainer}>
                        {contacts.locations.map((address, id) => (
                            <div key={id} className={styles.contactItem}>
                                <img src={locationPin.src} alt={locationPin.alt} />
                                <a href={address.link} target="_blank" rel="noopener noreferrer">
                                    {address.street} <br /> {address.city}
                                </a>
                            </div>
                        ))}
                        
                        {contacts.phoneNumbers.map((number, id) => (
                            <div key={id} className={styles.contactItem}>
                                <img src={phoneIcon.src} alt={phoneIcon.alt} />
                                <a href={number.link}>{number.number}</a>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className={styles.linkList}>
                    <h3 className={styles.title}>{navigation.heading}</h3>
                    
                    <ul className={styles.links}>
                        {navigation.links.map((link, id) => (
                            <li key={id}>
                                <Link
                                    to={link.destination} 
                                    onClick={() => sendToSection(link.id)}
                                    className={styles.link}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className={styles.hours}>
                    <h3 className={styles.title}>{hours.heading}</h3>
                    
                    <ul className={styles.hoursList}>
                        {hours.times.map((times, id) => (
                            <li key={id}>
                                <span>{times.days}</span>
                                <span>{times.hours}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <p className={styles.copyright}>
                &copy; 2025 Icon Golf Carts of Tampa Bay.
                All Rights Reserved. Powered by
                <a href="https://pinellasweb.io" target="_blank">
                    Pinellas Web
                </a>
            </p>
            
        </footer>
    )
}

export default Footer;
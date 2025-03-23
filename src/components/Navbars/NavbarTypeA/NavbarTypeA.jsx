import content from "./content";
import Desktop from "./components/Desktop";
import Mobile from "./components/Mobile";
import { useIsMobile } from "./hooks";
const { logo, burger, cancel, links } = content;

const NavbarTypeA = () => {
    const isMobile = useIsMobile();
    
    if (isMobile) return <Mobile logo={logo} burger={burger} cancel={cancel} links={links} />
    
    return <Desktop logo={logo} links={links} />
}

export default NavbarTypeA;
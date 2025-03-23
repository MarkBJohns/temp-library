const useSendToSection = () => {
    const sendToSection = (sectionId, scope = document) => {
        setTimeout(() => {
            let container = document.documentElement;
            
            if (scope !== document) {
                container = document.querySelector(scope);
            }
            
            if (!container) {
                console.error(`Error: element ${scope} not found`);
                return;
            }
            
            const section = document.getElementById(sectionId);
            
            if (section && container) {
                const sectionPosition = section.offsetTop - (container.offsetTop || 0);
                
                container.scrollTo({
                    top: sectionPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    }
    
    return sendToSection;
}

export default useSendToSection;
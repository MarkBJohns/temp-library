import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useResetMenu = (closeFunction) => {
    const location = useLocation();
    
    useEffect(() => {
        closeFunction();
    }, [location.pathname]);
}

export default useResetMenu;
import { useEffect, useState } from "react"


const useRefresh = () => {
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefresh(prev => !prev);
            console.log("triggered automatic refresh");
            
        }, 30000);        

        

        return () => clearInterval(interval);
        
        
    }, []);

    return refresh;
}

export default useRefresh;
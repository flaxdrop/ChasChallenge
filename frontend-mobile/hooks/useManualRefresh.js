import { useState, useCallback } from "react"

const useManualRefresh = () => {
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = useCallback(() => {
        setRefresh(prev => !prev);
        console.log("triggered manual refresh");
        
    }, []);

    return [refresh, triggerRefresh];
}

export default useManualRefresh;
import { useState, useCallback } from "react"

const useManualRefresh = () => {
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = useCallback(() => {
        setRefresh(prev => !prev);
        
    }, []);

    return [refresh, triggerRefresh];
}

export default useManualRefresh;
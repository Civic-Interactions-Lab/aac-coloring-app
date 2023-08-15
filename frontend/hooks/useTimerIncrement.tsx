import { useState, useEffect } from "react";

export default function useTimerIncrement(start = 0, timeInterval = 10000) {
    const [num, setNum] = useState(start);

    useEffect(() => {
        const interval = setInterval(() => {
            setNum((prevNum) => prevNum + 1);
        }, timeInterval);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return num;
}

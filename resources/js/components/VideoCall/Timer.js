import React, { useEffect, useState } from "react";

const pad = (counter) => (counter < 10 ? `0${counter}` : counter);

export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [start, setStart] = useState(new Date().valueOf());
    useEffect(() => {
        const interval = setInterval(() => {
            const timenow = new Date().valueOf();
            const secs = Math.floor((timenow - start) / 1000);
            const minutes = Math.floor(secs / 60);
            setMinutes(minutes);
            setSeconds(secs % 60);
        }, 1000);
        return () => clearInterval(interval);
    }, [start]);
    return <div>{pad(minutes) + ":" + pad(seconds)}</div>
}

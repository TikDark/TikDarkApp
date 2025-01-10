"use client";

import { useState, useEffect } from "react";
import './timer.css';

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(30 * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); 
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="timer">
            <h1>Promoção encerra em</h1>
            <p>{formatTime(timeLeft)}</p>
            <p>🕗</p>
        </div>
    );
}

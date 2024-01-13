"use client";
import { useState, useEffect } from 'react';

const TimerDisplay = ({ startTime = 0, stop = false }) => {
    const [displayTime, setDisplayTime] = useState('00:00:00');

    useEffect(() => {
        let intervalId;

        if (startTime && !stop) {
            intervalId = setInterval(() => {
                const now = new Date();
                const elapsedTime = now - startTime;
                const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
                const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
                const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');

                setDisplayTime(`${hours}:${minutes}:${seconds}`);
            }, 1000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [startTime, stop]);

    return (
        <div className="flex justify-center items-center">
            <div className="text-center p-4 mb-1 bg-indigo-100 rounded-lg shadow-inner border border-indigo-300">
                <p className="text-5xl font-bold text-indigo-700 tracking-wider">
                    {displayTime}
                </p>
            </div>
        </div>
    );
};

export default TimerDisplay;

"use client";
import { useState, useEffect } from 'react';

const TimerDisplay = ({ startTime = 0 }) => {
    const [displayTime, setDisplayTime] = useState('00:00:00');

    useEffect(() => {
        if (!(startTime instanceof Date)) {
            setDisplayTime('00:00:00');
            return;
        }

        const intervalId = setInterval(() => {
            const now = new Date();
            const time = Math.floor((now - startTime) / 1000);

            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = time % 60;

            const formattedTime = [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0'),
            ].join(':');

            setDisplayTime(formattedTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [startTime]);

    return (
        <div className="flex min-h-[20vh] max-h-[20vh] justify-center">
            <p className="pt-[5vh] text-[5vh]">
                {displayTime}
            </p>
        </div>
    );
};

export default TimerDisplay;
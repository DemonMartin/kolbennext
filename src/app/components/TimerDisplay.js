"use client";
import { useState, useEffect } from 'react';

const TimerDisplay = ({ startTime = 0, stop = false }) => {
    const [displayTime, setDisplayTime] = useState('00:00:00');
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (!(startTime instanceof Date)) {
            setDisplayTime('00:00:00');
            return;
        }

        const id = setInterval(() => {
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

        setIntervalId(id);

        return () => clearInterval(id);
    }, [startTime]);

    useEffect(() => {
        if (stop && intervalId) {
            clearInterval(intervalId);
        }
    }, [stop, intervalId]);

    return (
        <div className="flex min-h-[10vh] max-h-[10vh] justify-center">
            <p className="pt-[2vh] text-[6vh]">
                {displayTime}
            </p>
        </div>
    );
};

export default TimerDisplay;
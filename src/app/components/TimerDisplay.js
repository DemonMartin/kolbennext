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
          <div className="text-center p-4 mb-4 rounded-xl shadow-lg bg-white bg-opacity-30 border border-white border-opacity-60">
            <p className="text-4xl text-white">
              {displayTime}
            </p>
          </div>
        </div>
    );
};

export default TimerDisplay;

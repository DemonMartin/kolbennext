"use client";
import ImageComponent from './ImageComponent';
import TimerDisplay from './TimerDisplay';
import { useState, useEffect, useRef } from 'react';
import { useRecorder } from 'react-microphone-recorder';

export default function PlayComponent({
    id,
    imgSrc
}) {
    const [timer, setTimer] = useState(null);
    const [started, setStarted] = useState(false);
    const [fluidLevel, setFluidLevel] = useState(0);
    const { audioLevel, startRecording, pauseRecording, stopRecording, resetRecording, time, audioURL, recordingState, isRecording, audioFile } = useRecorder();
	const totalAudioLevel = useState([]);

    const audioLevelRef = useRef(audioLevel);
    const fluidLevelRef = useRef(fluidLevel);
    const intervalIdRef = useRef(null);

    useEffect(() => {
        audioLevelRef.current = Number(audioLevel.toPrecision(3));
        fluidLevelRef.current = Number(fluidLevel.toPrecision(3));
    }, [audioLevel, fluidLevel]);

    const startGame = (id) => {
        if (!started) {
            setTimer(null);
            setTimer(new Date());
            setStarted(true);
            startRecording();
            setFluidLevel(0);

            intervalIdRef.current = setInterval(() => {
                console.log(audioLevelRef.current, fluidLevelRef.current);
                if (fluidLevelRef.current < 1) {
                    totalAudioLevel.push(audioLevelRef.current);
                    if (audioLevelRef.current > 12 && fluidLevelRef.current < 1) {
                        setFluidLevel(Math.min(fluidLevelRef.current + ((audioLevelRef.current / 40000) + 0.003), 1)); // Decrease the step size
                    } else if (audioLevelRef.current < 10 && fluidLevelRef.current > 0) {
                        setFluidLevel(Math.max(fluidLevelRef.current - 0.004, 0)); // Decrease the step size
                    }
                } else {
                    stopGame();
                }
            }, 100); // Increase the update frequency
        } else {
            stopGame();
        }
    }

    const stopGame = () => {
        setStarted(false);
        stopRecording();
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    }

    return (
        <div className={`relative p-4 md:p-6 rounded-3xl shadow-xl transition-shadow duration-300 border border-gray-200 bg-white bg-opacity-25 text-white ${started ? "shadow-2xl" : ""}`}>
            <TimerDisplay startTime={timer} stop={!started} className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 font-semibold text-blue-800" />
            <ImageComponent src={imgSrc} id={id} fluidLevel={fluidLevelRef.current} audioLevel={audioLevel} running={started} />
            <span>{totalAudioLevel.reduce((a, b) => a + b, 0) / totalAudioLevel.length}</span>
            <div className="flex justify-center items-center mt-4">
                <button
                    className={`inline-flex items-center ${started ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-xs sm:text-sm md:text-lg lg:text-xl xl:text-3xl font-bold rounded-full px-2 sm:px-3 md:px-6 lg:px-8 py-1 sm:py-2 md:py-3 shadow transition duration-150 ease-in-out hover:-translate-y-1 active:translate-y-1`}
                    onClick={() => startGame(id)}
                >
                    {started ? 'Pause' : 'Start'}
                </button>
            </div>
        </div>
    );

}
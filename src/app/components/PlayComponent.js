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

    const audioLevelRef = useRef(audioLevel);
    const fluidLevelRef = useRef(fluidLevel);

    useEffect(() => {
        audioLevelRef.current = audioLevel;
        fluidLevelRef.current = fluidLevel;
    }, [audioLevel, fluidLevel]);

    useEffect(() => {
        if (isRecording && started) {
            const intervalId = setInterval(() => {
                console.log(audioLevelRef.current, fluidLevelRef.current);
                if (fluidLevelRef.current < 1) {
                    if (audioLevelRef.current > 1 && fluidLevelRef.current < 1) {
                        setFluidLevel(Math.min(fluidLevelRef.current + 0.0025, 1));
                    } else if (audioLevelRef.current < 1 && fluidLevelRef.current > 0) {
                        setFluidLevel(Math.max(fluidLevelRef.current - 0.01, 0));
                    }
                } else {
                    setStarted(false);
                    clearInterval(intervalId);
                }
            }, 50);
        }
    }, [
        started,
        isRecording,
    ]);

    const startGame = (id) => {
        if (!started) {
            setTimer(new Date());
            setStarted(true);
            startRecording();
            setFluidLevel(0);
        } else {
            setTimer(null);
            setStarted(false);
            stopRecording();
        }
    }


    return (
        <div className="relative bg-blue-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
            <TimerDisplay startTime={timer} stop={!started} className="text-2xl font-bold mb-4" />
            <ImageComponent src={imgSrc} id={id} fluidLevel={fluidLevelRef.current} className="mb-4" />
            <div className="flex justify-center items-center">
                <button
                    className="inline-flex items-center bg-yellow-500 text-white text-2xl rounded-full px-6 py-3 shadow-md hover:shadow-lg active:shadow-inner transition duration-150 mt-4"
                    onClick={() => startGame()}
                >
                    Start
                </button>
            </div>
        </div>
    )

}
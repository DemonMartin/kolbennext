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
                        setFluidLevel(Math.min(fluidLevelRef.current + 0.005, 1));
                    } else if (audioLevelRef.current < 1 && fluidLevelRef.current > 0) {
                        setFluidLevel(Math.max(fluidLevelRef.current - 0.01, 0));
                    }
                } else {
                    clearInterval(intervalId);
                }
            }, 200);
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
        } else {
            setTimer(null);
            setStarted(false);
            stopRecording();
        }
    }


    return (
        <div>
            <TimerDisplay startTime={timer} />
            <ImageComponent src={imgSrc} id={id} fluidLevel={fluidLevelRef.current} />
            <div className="flex justify-center items-center">
                <button
                    className="inline-flex items-center bg-gray-300 rounded-md px-4 py-2 text-gray-700 shadow-md hover:shadow-lg active:shadow-inner transition duration-150 mt-4"
                    onClick={() => startGame()}
                >
                    Start
                </button>
            </div>
        </div>
    )
}
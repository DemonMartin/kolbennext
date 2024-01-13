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

    const startGame = (id) => {
        if (!started) {
            setTimer(null);
            setTimer(new Date());
            setStarted(true);
            startRecording();
            setFluidLevel(0);
        } else {
            stopGame();
        }
    }
    
    const stopGame = () => {
        setStarted(false);
        stopRecording();
    }
    
    useEffect(() => {
        let intervalId;
    
        if (isRecording && started) {
            intervalId = setInterval(() => {
                console.log(audioLevelRef.current, fluidLevelRef.current);
                if (fluidLevelRef.current < 1) {
                    if (audioLevelRef.current > 20 && fluidLevelRef.current < 1) {
                        setFluidLevel(Math.min(fluidLevelRef.current + 0.0025, 1));
                    } else if (audioLevelRef.current < 10 && fluidLevelRef.current > 0) {
                        setFluidLevel(Math.max(fluidLevelRef.current - 0.01, 0));
                    }
                } else {
                    stopGame();
                }
            }, 50);
        }
    
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        started,
        isRecording,
    ]);


    return (
        <div className="relative p-6 rounded-3xl shadow-xl transition-shadow duration-300 hover:shadow-2xl border border-gray-200 bg-white bg-opacity-25">
            <TimerDisplay startTime={timer} stop={!started} className="text-lg font-semibold mb-6 text-blue-800" />
            <ImageComponent src={imgSrc} id={id} fluidLevel={fluidLevelRef.current} audioLevel={audioLevel} running={started} className="mb-6" />
            <div className="flex justify-center items-center">
                <button
                    className={`inline-flex items-center ${started ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white text-lg font-bold rounded-full px-8 py-3 shadow transition duration-150 ease-in-out mt-4 hover:-translate-y-1 active:translate-y-1`}
                    onClick={() => startGame(id)}
                >
                    {started ? 'Pause' : 'Start'}
                </button>
            </div>
        </div>
    );

}
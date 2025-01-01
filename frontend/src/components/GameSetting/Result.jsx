import React, { useEffect, useState } from 'react';
import './Result.css';

const Result = ({ resultTimer, penaltyTime, stopGame }) => {
    const [displayTime, setDisplayTime] = useState(0);
    const [penaltyTimeDisplay, setPenaltyTimeDisplay] = useState(0);
    const [resultDisplay, setResultDisplay] = useState(0);
    const [showTime, setShowTime] = useState(false);
    const [showPenalty, setShowPenalty] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        let currentTime = 0;
        const interval = setInterval(() => {
            if (currentTime < (resultTimer - penaltyTime).toFixed(2)) {
                currentTime += 0.1;
                setDisplayTime(Number(currentTime));
            } else {
                clearInterval(interval);
                setDisplayTime(Number(resultTimer - penaltyTime));
                setShowTime(true);
            }
        }, 1);
        return () => clearInterval(interval);
    }, [resultTimer, penaltyTime]);

    useEffect(() => {
        if (showTime) {
            let currentTime = 0;
            const interval = setInterval(() => {
                if (currentTime < penaltyTime) {
                    currentTime += 0.1;
                    setPenaltyTimeDisplay(Number(currentTime));
                } else {
                    clearInterval(interval);
                    setPenaltyTimeDisplay(Number(penaltyTime));
                    setShowPenalty(true);
                }
            }, 1);
            return () => clearInterval(interval);
        }
    }, [showTime]);

    useEffect(() => {
        if (showPenalty) {
            let currentTime = 0;
            const interval = setInterval(() => {
                if (currentTime < resultTimer.toFixed(2)) {
                    currentTime += 0.1;
                    setResultDisplay(Number(currentTime));
                } else {
                    clearInterval(interval);
                    setResultDisplay(Number(resultTimer));             
                    setShowResult(true);
                }
            }, 1);
            return () => clearInterval(interval);
        }
    }, [showPenalty]);

    return (
        <>
            <div className="result-screen">
                <h1>Your Result</h1>
                <div className="result-details">
                    <img
                        className="result-image"
                        src="../../../public/trophy.jpg"
                        alt="Trophy"
                    />
                    <div className="result-text">
                        <p>Time: <span>{displayTime.toFixed(2)}</span> 秒</p>
                        <p>Penalty: <span>{penaltyTimeDisplay.toFixed(0)}</span> 秒</p>
                        <p className='border'>Your score!: <span>{resultDisplay.toFixed(2)}</span> 秒</p>
                    </div>
                </div>
            </div>
            <button className="game-settings-button" onClick={stopGame}>
                ゲームを終了する
            </button>
        </>
    );
};

export { Result };
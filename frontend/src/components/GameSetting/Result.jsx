import React from 'react';
import './Result.css';

const Result = ({ resultTimer, penaltyTime ,stopGame}) => {
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
                <p>Time: <span>{(resultTimer-penaltyTime).toFixed(2)}</span> 秒</p>
                <p>Penalty: <span>{penaltyTime}</span> 秒</p>
                <p className='border'>Your score!: <span>{resultTimer.toFixed(2)} </span>秒</p>
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
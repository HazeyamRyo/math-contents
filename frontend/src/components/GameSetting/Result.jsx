import React from 'react';

const Result = ({ resultTimer, penaltyTime ,stopGame}) => {
return (
    <div>
        <h1>結果</h1>
        <p>経過時間: {resultTimer-penaltyTime} 秒</p>
        <p>ペナルティ: {penaltyTime} 秒</p>
        <p>合計: {resultTimer} 秒</p>
        <button className="game-settings-button" onClick={stopGame}>
            ゲームを終了する
        </button>
    </div>
);
};

export { Result };
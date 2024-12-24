import React from "react";

const GameInfo = ({ timer, score }) => {
  return (
    <div className="game-info">
      <div className="timer">タイマー: {timer.toFixed(1)}秒</div>
      <div className="score">スコア: {score}</div>
    </div>
  );
};

export { GameInfo } ;
import React, { useState, useEffect, useRef } from "react";
import { ModeSelector } from "./\ModeSelector";
import { DifficultySelector } from "./DifficultySelector";
import { NumberOfQuestionsInput } from "./NumberOfQuestionsInput";
import { Countdown } from "./Countdown";
import { GameInfo } from "./GameInfo";
import { Logo } from "./Logo";
import "./GameSetting.css";


const GameSettings = () => {
  const [mode, setMode] = useState("normal");
  const [difficulty, setDifficulty] = useState("normal");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [isTimeAttackMode, setIsTimeAttackMode] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [hintVisible, setHintVisible] = useState({ normal: true, hard: false });

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(interval);
    } else if (countdown === 0 && isTimeAttackMode) {
      startGame();
    }
  }, [countdown, isTimeAttackMode]);

  useEffect(() => {
    if (isGameActive && isTimeAttackMode) {
      startTimeRef.current = Date.now();
      timerRef.current = requestAnimationFrame(updateTimer);
    }
    return () => cancelAnimationFrame(timerRef.current);
  }, [isGameActive, isTimeAttackMode]);

  const updateTimer = () => {
    setTimer((Date.now() - startTimeRef.current) / 1000);
    timerRef.current = requestAnimationFrame(updateTimer);
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setIsTimeAttackMode(selectedMode === "timeattack");
    if (selectedMode === "timeattack") {
      setNumberOfQuestions(10);
    }
  };

  const handleDifficultyChange = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setHintVisible({
      normal: selectedDifficulty === "normal",
      hard: selectedDifficulty === "hard",
    });
  };

  const handleStart = () => {
    setScore(0);
    if (isTimeAttackMode) {
      setCountdown(3);
    } else {
      startGame();
    }
  };

  const startGame = () => {
    setIsGameActive(true);
    if (isTimeAttackMode) {
      setTimer(0);
    }
    // Additional game logic like generating questions goes here
  };

  const resetGame = () => {
    if (isTimeAttackMode) {
      clearInterval(timerRef.current);
      alert(`タイムアタックモード終了！経過時間: ${timer.toFixed(1)}秒`);
    }
    setIsGameActive(false);
    setTimer(0);
    setCountdown(null);
    setScore(0);
    // Reset other game states if needed
  };

  return (
    <div className="game-settings">
      {!isGameActive && (
        <div className="setting">
          <h2>設定</h2>
          <ModeSelector 
            mode={mode} 
            onModeChange={handleModeChange} 
            props={{normalMode : "通常モード",
                    timeAttackMode : "タイムアタックモード" } }
          /><br />
          {mode === "normal" && (
            <NumberOfQuestionsInput
              numberOfQuestions={numberOfQuestions}
              setNumberOfQuestions={setNumberOfQuestions}
            />
          )}
          {mode === "timeattack" && <div id="timeAttackInfo">10問固定</div>}
          <br />
          <DifficultySelector
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            props={{ normalDifficulty: "normal", hardDifficulty: "hard" }}
          />
          <div className="button-logo">
            <button id="startButton" className="game-settings-button" onClick={handleStart}>
              開始
            </button>
            <Logo />
          </div>
        </div>
      )}
      {isGameActive && (
        <div className="game-setting-container">
          <GameInfo timer={timer} score={score} />
          <button className="game-settings-button" onClick={resetGame}>リセット</button>
        </div>
      )}
      {countdown > 0 && <Countdown countdown={countdown} />}
    </div>
  );
};

export { GameSettings };
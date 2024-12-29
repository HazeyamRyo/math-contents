import React, { useState, useEffect, useRef } from "react";
import { ModeSelector } from "./\ModeSelector";
import { DifficultySelector } from "./DifficultySelector";
import { NumberOfQuestionsInput } from "./NumberOfQuestionsInput";
import { Countdown } from "./Countdown";
import { GameInfo } from "./GameInfo";
import { Logo } from "./Logo";
import "./GameSetting.css";
import { Header } from "../questionComponents/Header/Header";
import { TrigonometricRationsApp } from "../TrigonometricRations/TrigonometricRationsApp";




const GameSettings = (props) => {   // goal,titleをpropsで受け取る
  const [mode, setMode] = useState("normal");
  const [difficulty, setDifficulty] = useState("normal");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [isTimeAttackMode, setIsTimeAttackMode] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(1);
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

  const handleScore = () => {
    setScore(score + 1);
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
    } ;
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
      <>
        <h2 className='Title'>{props.title}</h2>
        <div className="setting">
          <h2 className="setting-h2">設定</h2> 
          <ModeSelector 
            mode={mode} 
            onModeChange={handleModeChange} 
            props={{normalMode : "通常モード",
                    timeAttackMode : "タイムアタックモード" } }
          />
          {mode === "normal" && (
            <NumberOfQuestionsInput
              numberOfQuestions={numberOfQuestions}
              setNumberOfQuestions={setNumberOfQuestions}
            />
          )}
          {mode === "timeattack" && <div id="timeAttackInfo">10問固定</div>}
          
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
      </>
      )}
      {isGameActive && (
        <div className="game-active-container">
          <Header 
            score={score}
            difficulty={difficulty}
            goal={props.goal}
            timer={timer}
            isTimeAttackMode={isTimeAttackMode}
          />
          <TrigonometricRationsApp difficulty = {difficulty} scoreChange={ handleScore }/>
          <button className="game-settings-button" onClick={resetGame}>リセット</button>
        </div>
      )}
      {countdown > 0 && <Countdown countdown={countdown} />}
    </div>
  );
};

export { GameSettings };
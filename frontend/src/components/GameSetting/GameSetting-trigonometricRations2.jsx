import React, { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import { ModeSelector } from "./ModeSelector";
import { DifficultySelector } from "./DifficultySelector";
import { NumberOfQuestionsInput } from "./NumberOfQuestionsInput";
import { Countdown } from "./Countdown";
import { Logo } from "./Logo";
import "./GameSetting.css";
import { Header } from "../questionComponents/Header/Header";
import { TrigonometricRationsApp2 } from "../AppComponents/TrigonometricRationsApp2";
import { Result } from "./Result";

const GameSettings = (props) => {
  const [mode, setMode] = useState("normal");
  const [difficulty, setDifficulty] = useState("normal");
  const [numberOfQuestions, setNumberOfQuestions] = useState(9);
  const [isTimeAttackMode, setIsTimeAttackMode] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [score, setScore] = useState(1);
  const [isGameActive, setIsGameActive] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [penaltyTime, setPenaltyTime] = useState(0);
  const [resultTimer, setResultTimer] = useState(0);
  const [resultDisplay, setResultDisplay] = useState(false);


  const {
    seconds,
    minutes,
    start: startStopwatch,
    pause: pauseStopwatch,
    reset: resetStopwatch,
  } = useStopwatch({ autoStart: false });

  // ミリ秒を計算 (秒をベースに補正)
  const calculateMilliseconds = () => {
    const now = new Date().getTime();
    const elapsedTime = now % 1000; // 現在のミリ秒部分を計算
    return elapsedTime;
  };

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (countdown === 0 && isTimeAttackMode) {
      startGame();
    }
  }, [countdown, isTimeAttackMode]);

  const handleScore = () => {
    setScore(score + 1);
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setIsTimeAttackMode(selectedMode === "timeattack");
    if (selectedMode === "timeattack") {
      setNumberOfQuestions(props.timeAttackModeHas);
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
    setScore(1);
    if (isTimeAttackMode) {
      setCountdown(3);
    } else {
      startGame();
    }
  };

  const startGame = () => {
    setIsGameActive(true);
    if (isTimeAttackMode) {
      resetStopwatch();
      startStopwatch();
    }
  };

  const resultGame = () => {
    if (isTimeAttackMode) {
      pauseStopwatch();
      const calculatedTime = (minutes || 0) * 60 + (seconds || 0) + calculateMilliseconds() / 1000 + (penaltyTime || 0);
      setResultTimer(calculatedTime);
      setResultDisplay(true);
    }
  };

  const stopGame = () => {
    setIsGameActive(false);
    setCountdown(null);
    setScore(0);
    setHintVisible(false);
    setPenaltyTime(0);
    setResultTimer(0);
    setResultDisplay(false);
    alert("ゲームを終了します");
  };

  return (
    <div className="game-settings">
      {(!isGameActive && !resultDisplay  ) && (
        <>
          <h2 className="Title">{props.title}</h2>
          <div className="setting">
            <h2 className="setting-h2">設定</h2>
            <ModeSelector
              mode={mode}
              onModeChange={handleModeChange}
              props={{
                normalMode: "通常モード",
                timeAttackMode: "タイムアタックモード",
              }}
            />
            {mode === "normal" && (
              <NumberOfQuestionsInput
                numberOfQuestions={numberOfQuestions}
                setNumberOfQuestions={setNumberOfQuestions}
                maxQuestions={props.maxQuestions}
                timeAttackMode={isTimeAttackMode}
              />
            )}
            {mode === "timeattack" && (
              <div id="timeAttackInfo">
                {`タイムアタックモードの問題数は${props.timeAttackModeHas}問です！`}
              </div>
            )}
            <DifficultySelector
              difficulty={difficulty}
              onDifficultyChange={handleDifficultyChange}
              props={{ normalDifficulty: "normal", hardDifficulty: "hard" }}
            />
            <div className="button-logo">
              <button
                id="startButton"
                className="game-settings-button"
                onClick={handleStart}
              >
                開始
              </button>
              <Logo />
            </div>
          </div>
        </>
      )}
      {(isGameActive && !resultDisplay  ) && (
        <div className="game-active-container">
          <Header
            score={score}
            difficulty={difficulty}
            goal={props.goal}
            timer={`${minutes}:${seconds}`}
            isTimeAttackMode={isTimeAttackMode}
          />
          <div className="game-info">
            <TrigonometricRationsApp2
              difficulty={difficulty}
              scoreChange={handleScore}
              endGame={resultGame}
              numberOfQuestions={numberOfQuestions}
              isTimeAttackMode={isTimeAttackMode}
              setPenaltyTime={setPenaltyTime}
              penaltyTime={penaltyTime}
            />
            <div className="hint-container">
              {!hintVisible && (
                <button
                  className="hint-button"
                  onClick={() => setHintVisible(!hintVisible)}
                >
                  ヒントを表示
                </button>
              )}
              {hintVisible && (
                <button
                  className="hint-button"
                  onClick={() => setHintVisible(!hintVisible)}
                >
                  ヒントを非表示
                </button>
              )}
              {hintVisible && (
                <img className="hint-img" src={props.hintImg} alt="ヒント" />
              )}
            </div>
          </div>
          <button className="game-settings-button" onClick={stopGame}>
            問題をやめる
          </button>
          
        </div>
      )}
      {countdown > 0 && <Countdown countdown={countdown} />}
      {isTimeAttackMode && resultDisplay && (<Result resultTimer={resultTimer} penaltyTime={penaltyTime} stopGame={stopGame}/>)}
    </div>
  );
};

export { GameSettings };
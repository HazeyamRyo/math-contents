import React, { useState,useEffect } from 'react';
import "./IsCorrect.css";

function IsCorrect({ isCorrect ,setIsCorrect, iswrong , setIswrong, isTimeAttackMode }) {
  const [showNotification, setShowNotification] = useState(false);
  const [showNotification2, setShowNotification2] = useState(false);
  const [showNotification3, setShowNotification3] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setIsCorrect(false);
      }, 2000); // 2秒後に通知を消す
    }
    }, [isCorrect]);

    useEffect(() => {
    if (iswrong) {
      setShowNotification2(true);
      setTimeout(() => {
        setShowNotification2(false);
        setIswrong(false);
      }, 2000); // 2秒後に通知を消す
    }
  },  [iswrong]);

  useEffect(() => {
    if (iswrong && isTimeAttackMode) {
      setShowNotification3(true);
      setTimeout(() => {
        setShowNotification3(false);
        setIswrong(false);
      }, 2000); // 2秒後に通知を消す
    }
  },  [iswrong]);

  return (
    <>
        <div className="is-correct">
        {showNotification && <div className="notification">正解！この調子😊</div>}
        </div>
        <div className="is-wrong">
        {showNotification2 &&  <div className="notification2">残念😭もう一度チャレンジ</div>}
        </div>
        <div className="is-wrong">
        {showNotification3 &&  <div className="notification2">残念😭５秒タイムを加算します</div>}
        </div>
    </>
  );
}

export { IsCorrect };
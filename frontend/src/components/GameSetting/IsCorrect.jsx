import React, { useState,useEffect } from 'react';

function IsCorrect({ isCorrect ,setIsCorrect, iswrong , setIswrong}) {
  const [showNotification, setShowNotification] = useState(false);
  const [showNotification2, setShowNotification2] = useState(false);

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

  return (
    <>
        <div className="is-correct">
        {showNotification && <div className="notification">正解！</div>}
        </div>
        <div className="is-wrong">
        {showNotification2 &&  <div className="notification">不正解！</div>}
        </div>
    </>
  );
}

export { IsCorrect };
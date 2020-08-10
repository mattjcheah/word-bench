import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const { gameEndTime } = props;
  const [, setSecondsCountUp] = useState(0);

  const [isActive, setIsActive] = useState(true);

  const now = new Date().getTime();
  const distance = gameEndTime - now;

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const displayTime =
    minutes + ":" + (seconds.toString().length > 1 ? seconds : "0" + seconds);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setIsActive(false);
    }
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsCountUp((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  return (
    <div className="timer">
      {isActive ? (
        <p>{displayTime}</p>
      ) : (
        <p className="timerComplete">{displayTime}</p>
      )}
    </div>
  );
};

export default Timer;

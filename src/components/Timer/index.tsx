import { useState, useEffect } from "react";

type Props = {
  gameEndTime: number;
};

const Timer = ({ gameEndTime }: Props) => {
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
    let interval: NodeJS.Timer | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsCountUp((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      interval && clearInterval(interval);
    }
    return () => {
      interval && clearInterval(interval);
    };
  }, [isActive, seconds, minutes]);

  return <div>{isActive ? <p>{displayTime}</p> : <p>{displayTime}</p>}</div>;
};

export default Timer;

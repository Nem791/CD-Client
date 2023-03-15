import React, { useState, useEffect, useRef } from "react";
// import './styles.css'

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const INITIAL_COUNT = 10;

export default function Countdown({
  timeRemaing,
  handleFinish,
  handleStartFn,
  isInterval,
  forceStop,
    handleCountRemainTime , 
}) {
  const [secondsRemaining, setSecondsRemaining] = useState(
    timeRemaing ? timeRemaing : INITIAL_COUNT
  );
  const [status, setStatus] = useState(STATUS.STARTED);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const handleStart = () => {
    handleStartFn && handleStartFn();
    setStatus(STATUS.STARTED);
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(INITIAL_COUNT);
  };
  const handleInterval = () => {
    if (!isInterval) return;
    setStatus(STATUS.STARTED);
    setSecondsRemaining(timeRemaing ? timeRemaing : INITIAL_COUNT);
    handleFinish && handleFinish();
  };
  const handleFinishTime = () => {
    if (isInterval) return;
    setStatus(STATUS.STOPPED);
    handleFinish && handleFinish();
  };
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
        handleCountRemainTime && handleCountRemainTime(secondsRemaining - 1)
      } else {
        handleInterval();
        handleFinishTime();
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );
  useEffect(() => {
    if(!forceStop) return;
    handleStop();
  },[forceStop])
  
  return (
    <div className="App">
      <h1>React Countdown Demo</h1>
      <button onClick={handleStart} type="button">
        Start
      </button>
      <button onClick={handleStop} type="button">
        Stop
      </button>
      <button onClick={handleReset} type="button">
        Reset
      </button>
      <div style={{ padding: 20 }}>
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </div>
      <div>Status: {status}</div>
    </div>
  );
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, "0");

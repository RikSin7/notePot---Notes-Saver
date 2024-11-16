import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  updateTime,
} from "../redux/timerSlice";

function Timer() {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.timer.time);
  const isRunning = useSelector((state) => state.timer.isRunning);

  useEffect(() => {
    let timerRef;

    if (isRunning) {
      const startTime = Date.now() - time; // Calculate start time only once
      timerRef = setInterval(() => {
        dispatch(updateTime(Date.now() - startTime)); // Update time continuously
      }, 10);
    }

    // Clean up the interval when the component unmounts or when timer stops
    return () => {
      if (timerRef) {
        clearInterval(timerRef);
      }
    };
  }, [isRunning, time, dispatch]);

  const handleStart = () => {
    if (!isRunning) {
      dispatch(startTimer()); // Dispatch start action
    }
  };

  const handleStop = () => {
    if (isRunning) {
      dispatch(stopTimer()); // Dispatch stop action
    }
  };

  const handleReset = () => {
    dispatch(resetTimer()); // Reset the timer
  };

  const ms = Math.floor((time % 1000) / 10);
  const sec = Math.floor((time / 1000) % 60);
  const min = Math.floor((time / 60000) % 60);

  return (
    <div className="flex sm:flex-row flex-col-reverse items-center justify-center  transition-bg duration-300 sm:gap-8 lg:gap-32 md:gap-8 sm:min-w-[60vw]">
      <div className="flex gap-4 md:text-2xl lg:text-3xl  sm:text-2xl text-xl xss:text-sm xss:gap-1 transition-all duration-300  text-[#ffffff] dark:text-[#646464] ">
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <h1 className=" md:text-6xl sm:text-4xl text-3xl xss:text-sm  transition-all duration-300  text-[#ffffff] dark:text-[#ffffff]  font-semibold">{`${min}:${
        sec < 10 ? "0" : ""
      }${sec}:${ms < 10 ? "0" : ""}${ms}`}</h1>
    </div>
  );
}

export default Timer;

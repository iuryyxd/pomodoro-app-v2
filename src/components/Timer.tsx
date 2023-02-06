import clsx from "clsx";
import { useState, useContext, useEffect } from "react";
import StatesContexts from "../Contexts/StatesContext";
import { FiRotateCcw, FiPlay, FiPause } from "react-icons/fi";

interface TimerProps {
  timerType: number;
}

let timerInterval: any;

export default function Timer({ timerType }: TimerProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);
  const [timer, setTimer] = useState<string>();
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>(60);

  const { pomodoroTimer, longBreakTimer, shortBreakTimer, color } =
    useContext(StatesContexts);

  const timers = {
    1: pomodoroTimer,
    2: shortBreakTimer,
    3: longBreakTimer,
  };

  function startTimer() {
    setIsRunning(true);

    timerInterval = setInterval(() => {
      setSeconds((seconds) => {
        if (minutes === 0 && seconds === 0) {
          pauseTimer();
          return 0;
        } else {
          if (seconds !== 0) {
            return seconds - 1;
          } else {
            return 59;
          }
        }
      });
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    setIsRunning(false);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    setIsRunning(false);
    setPercentage(0);
    setTimer(`${timers[timerType as keyof typeof timers]}:00`);
    setMinutes(timers[timerType as keyof typeof timers]);
    setSeconds(60);
  }

  useEffect(() => {
    setTimer(`${timers[timerType as keyof typeof timers]}:00`);
  }, []);

  useEffect(() => {
    if (isRunning) {
      let minutesFormated = minutes! >= 10 ? minutes : "0" + minutes;
      let secondsFormated = seconds! >= 10 ? seconds : "0" + seconds;
      setTimer(`${minutesFormated}:${secondsFormated}`);

      const percen =
        ((minutes! * 60 + seconds) /
          (timers[timerType as keyof typeof timers] * 60)) *
        100;

      setPercentage(1186 - (1186 * percen) / -100);
    }
  }, [minutes, seconds]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      pauseTimer();
    } else {
      if (seconds === 59) {
        if (!minutes) {
          setMinutes(timers[timerType as keyof typeof timers] - 1);
        } else {
          setMinutes((minutes) => minutes! - 1);
        }
      }
    }
  }, [seconds]);

  useEffect(() => {
    resetTimer();
  }, [pomodoroTimer, shortBreakTimer, longBreakTimer]);

  useEffect(() => {
    clearInterval(timerInterval);
    setIsRunning(false);
    setPercentage(0);
    setTimer(`${timers[timerType as keyof typeof timers]}:00`);
    setMinutes(timers[timerType as keyof typeof timers]);
    setSeconds(60);
  }, [timerType]);

  return (
    <div className="w-full h-[480px] md:h-[380px] sm:h-[300px] rounded-full timer-bg mt-20 mb-[50px] flex items-center justify-center">
      <div className="relative w-[420px] h-[420px] md:w-[340px] md:h-[340px] sm:w-[280px] sm:h-[280px] rounded-full bg-dark-blue-2 flex flex-col items-center justify-center">
        <svg className="w-full h-full absolute">
          <circle
            style={{ strokeDashoffset: percentage }}
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            className={clsx("stroke-[10px] circle", {
              ["stroke-red"]: color === "red",
              ["stroke-cyan"]: color === "cyan",
              ["stroke-pink"]: color === "pink",
            })}
          />
        </svg>
        <h1 className="font-bold text-[100px] md:text-[80px] sm:text-[60px] text-light-blue mb-5 z-10">
          {timer && timer}
        </h1>
        <div className="flex items-center gap-5 text-white">
          {!isRunning ? (
            <button
              className="cursor-pointer bg-transparent z-10"
              onClick={startTimer}
            >
              <FiPlay
                size={24}
                className={clsx(
                  "tracking-[15px] font-bold text-base cursor-pointer z-10 transition-all",
                  {
                    ["hover:text-red"]: color === "red",
                    ["hover:text-cyan"]: color === "cyan",
                    ["hover:text-pink"]: color === "pink",
                  }
                )}
              />
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="cursor-pointer bg-transparent z-10"
            >
              <FiPause
                size={24}
                className={clsx(
                  "tracking-[15px] font-bold text-base cursor-pointer z-10 transition-all",
                  {
                    ["hover:text-red"]: color === "red",
                    ["hover:text-cyan"]: color === "cyan",
                    ["hover:text-pink"]: color === "pink",
                  }
                )}
              />
            </button>
          )}
          <button
            onClick={resetTimer}
            className="cursor-pointer bg-transparent z-10"
          >
            <FiRotateCcw
              size={24}
              className={clsx(
                "tracking-[15px] font-bold text-base cursor-pointer z-10 transition-all",
                {
                  ["hover:text-red"]: color === "red",
                  ["hover:text-cyan"]: color === "cyan",
                  ["hover:text-pink"]: color === "pink",
                }
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

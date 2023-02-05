import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Timer from "./components/Timer";
import StatesContexts from "./Contexts/StatesContext";

export default function App() {
  const [timerType, setTimerType] = useState<number>(1);
  const [pomodoroTimer, setPomodoroTimer] = useState<number>(25);
  const [shortBreakTimer, setShortBreakTimer] = useState<number>(5);
  const [longBreakTimer, setLongBreakTimer] = useState<number>(15);
  const [font, setFont] = useState<number>(1);
  const [color, setColor] = useState<string>("red");

  const fonts = [
    "Kumbh Sans, sans-serif",
    "Roboto Slab, sans-serif",
    "Space Mono, monospace",
  ];

  useEffect(() => {
    document.body.style.fontFamily = fonts[font - 1];
  }, [font]);

  return (
    <StatesContexts.Provider
      value={{
        pomodoroTimer,
        setPomodoroTimer,
        shortBreakTimer,
        setShortBreakTimer,
        longBreakTimer,
        setLongBreakTimer,
        color,
        setColor,
        font,
        setFont,
      }}
    >
      <div className="w-full max-w-[480px] md:max-w-[380px] sm:max-w-[300px] mx-auto h-full flex flex-col">
        <Header timerType={timerType} setTimerType={setTimerType} />
        <Timer timerType={timerType} />
        <Modal />
      </div>
    </StatesContexts.Provider>
  );
}

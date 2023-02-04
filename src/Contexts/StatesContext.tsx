import { createContext } from "react";

interface StatesContextType {
  pomodoroTimer: number;
  setPomodoroTimer: (a: number) => void;
  shortBreakTimer: number;
  setShortBreakTimer: (a: number) => void;
  longBreakTimer: number;
  setLongBreakTimer: (a: number) => void;
  font: number;
  setFont: (a: number) => void;
  color: string;
  setColor: (a: string) => void;
}

const iStatesContextState = {
  pomodoroTimer: 25,
  setPomodoroTimer: () => {},
  shortBreakTimer: 5,
  setShortBreakTimer: () => {},
  longBreakTimer: 15,
  setLongBreakTimer: () => {},
  font: 1,
  setFont: () => {},
  color: "red",
  setColor: () => {},
};

const StatesContexts = createContext<StatesContextType>(iStatesContextState);

export default StatesContexts;

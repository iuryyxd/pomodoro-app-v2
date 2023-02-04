import Logo from "../assets/logo.svg";
import clsx from "clsx";
import StatesContexts from "../Contexts/StatesContext";

import { useContext } from "react";

export const timersType = ["pomodoro", "short break", "long break"];

interface HeaderProps {
  timerType: number;
  setTimerType: (a: number) => void;
}

export default function Header({ timerType, setTimerType }: HeaderProps) {
  const { color } = useContext(StatesContexts);

  return (
    <header className="w-full flex flex-col gap-[50px] items-center mt-[60px]">
      <img src={Logo} alt="logo" />

      <div className="w-full py-5 px-9 flex items-center justify-between bg-dark-blue-2 rounded-[40px] font-bold relative">
        {timersType.map((type, index) => (
          <p
            key={crypto.randomUUID()}
            onClick={() => setTimerType(index + 1)}
            className={clsx(
              "text-light-grey/40 hover:text-light-grey text-sm cursor-pointer transition-all z-10",
              {
                ["text-dark-blue-2 hover:text-dark-blue-2"]:
                  timerType === index + 1,
              }
            )}
          >
            {type}
          </p>
        ))}
        <div
          className={clsx(
            "absolute w-[119px] -ml-[26px] h-12 rounded-3xl transition-transform",
            {
              ["translate-x-[168px]"]: timerType === 2,
              ["translate-x-[338px]"]: timerType === 3,
              ["bg-red"]: color === "red",
              ["bg-cyan"]: color === "cyan",
              ["bg-pink"]: color === "pink",
            }
          )}
        />
      </div>
    </header>
  );
}

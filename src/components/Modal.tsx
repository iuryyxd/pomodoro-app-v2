import { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { IoMdSettings, IoMdClose, IoMdCheckmark } from "react-icons/io";
import { timersType } from "./Header";
import NumberInput from "./NumberInput";
import StatesContexts from "../Contexts/StatesContext";

export default function Modal() {
  const {
    pomodoroTimer,
    setPomodoroTimer,
    shortBreakTimer,
    setShortBreakTimer,
    longBreakTimer,
    setLongBreakTimer,
    font,
    setFont,
    color,
    setColor,
  } = useContext(StatesContexts);

  const [colorSelected, setColorSelected] = useState<string>(color);
  const [fontSelected, setFontSelected] = useState<number>(font);
  const [pomodoroTimerSelected, setPomodoroTimerSelected] =
    useState<number>(pomodoroTimer);
  const [shortBreakTimerSelected, setShortBreakTimerSelected] =
    useState<number>(shortBreakTimer);
  const [longBreakTimerSelected, setLongBreakTimerSelected] =
    useState<number>(longBreakTimer);

  const fontsArray = ["kumbh-sans", "roboto", "space-mono"];
  const colorsArray = ["red", "cyan", "pink"];

  const fonts = {
    "kumbh-sans": "font-kumbh-sans",
    roboto: "font-roboto",
    "space-mono": "font-space-mono",
  };

  const timers = {
    pomodoro: pomodoroTimerSelected,
    "long break": longBreakTimerSelected,
    "short break": shortBreakTimerSelected,
  };

  const setTimers = {
    pomodoro: setPomodoroTimerSelected,
    "long break": setLongBreakTimerSelected,
    "short break": setShortBreakTimerSelected,
  };

  function handleApply() {
    setPomodoroTimer(pomodoroTimerSelected);
    setLongBreakTimer(longBreakTimerSelected);
    setShortBreakTimer(shortBreakTimerSelected);
    setColor(colorSelected);
    setFont(fontSelected);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild className="mx-auto mb-32">
        <IoMdSettings
          size={48}
          className="text-light-blue opacity-50 hover:opacity-100 cursor-pointer transition-all"
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black opacity-30 inset-0" />
        <Dialog.Content className="fixed bg-white w-[588px] z-50 h-[473px] rounded-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <header className="flex items-center justify-between py-8 px-10 border-b border-solid border-black/10">
            <h1 className="text-3xl font-bold">Settings</h1>
            <Dialog.Close asChild>
              <button aria-label="Close" className="bg-transparent">
                <IoMdClose
                  size={24}
                  className="text-dark-blue opacity-60 hover:opacity-100 transition-opacity"
                />
              </button>
            </Dialog.Close>
          </header>

          <main className="px-10 mt-5">
            <div className="flex flex-col">
              <h4 className="font-bold text-sm tracking-[8px]">
                TIME (MINUTES)
              </h4>

              <div className="flex items-center justify-between mt-5 pb-5 border-b border-solid border-black/10">
                {timersType.map((type) => (
                  <NumberInput
                    key={crypto.randomUUID()}
                    name={type}
                    state={timers[type as keyof typeof timers]}
                    setState={setTimers[type as keyof typeof timers]}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-5 pb-5 border-b border-solid border-black/10">
                <h4 className="font-bold text-sm tracking-[8px]">FONT</h4>

                <div className="flex items-center gap-8">
                  {fontsArray.map((item, index) => (
                    <div
                      key={crypto.randomUUID()}
                      className={clsx(
                        `w-11 h-11 transition-all font-bold ${
                          fonts[item as keyof typeof fonts]
                        } flex items-center justify-center rounded-full cursor-pointer`,
                        {
                          ["bg-light-grey hover:opacity-70"]:
                            fontSelected !== index + 1,
                          ["bg-dark-blue-2 text-white"]:
                            fontSelected === index + 1,
                        }
                      )}
                      onClick={() => setFontSelected(index + 1)}
                    >
                      Aa
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 pb-5">
                <h4 className="font-bold text-sm tracking-[8px]">COLOR</h4>

                <div className="flex items-center gap-8">
                  {colorsArray.map((item, index) => (
                    <button
                      key={crypto.randomUUID()}
                      onClick={() => setColorSelected(item)}
                      className={clsx(
                        "w-11 h-11 rounded-full flex items-center justify-center",
                        {
                          ["bg-red"]: index === 0,
                          ["bg-cyan"]: index === 1,
                          ["bg-pink"]: index === 2,
                        }
                      )}
                    >
                      {colorSelected === item && (
                        <IoMdCheckmark color="#161932" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </main>

          <Dialog.Close asChild>
            <button
              onClick={handleApply}
              className={clsx(
                "absolute -bottom-6 left-1/2 -translate-x-1/2 text-white font-bold py-3 px-10 rounded-3xl",
                {
                  ["bg-red"]: color === "red",
                  ["bg-cyan"]: color === "cyan",
                  ["bg-pink"]: color === "pink",
                }
              )}
            >
              Apply
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

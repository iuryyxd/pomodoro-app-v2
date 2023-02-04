import { FiChevronUp, FiChevronDown } from "react-icons/fi";

interface NumberInputProps {
  name: string;
  state: number;
  setState: (a: number) => void;
}

export default function NumberInput({
  name,
  state,
  setState,
}: NumberInputProps) {
  function handleIncreaseState() {
    if (state <= 59) {
      setState(state + 1);
    }
  }

  function handleDecreaseState() {
    if (state > 1) {
      setState(state - 1);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold opacity-40 text-xs">{name}</p>
      <div className="flex items-center justify-between py-2 px-5 w-[156px] bg-light-grey rounded-2xl">
        <p className="font-bold text-base">{state}</p>
        <div className="flex flex-col gap-1">
          <button onClick={handleIncreaseState}>
            <FiChevronUp
              size={20}
              className="opacity-40 hover:opacity-100 transition-opacity"
            />
          </button>
          <button onClick={handleDecreaseState}>
            <FiChevronDown
              size={20}
              className="opacity-40 hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

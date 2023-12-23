import { FC } from "react";
import { Divider, Input, Button, Join } from "react-daisyui";
import { CounterAtom } from "../types/atoms";
import { useCounter } from "../hooks/useCounter";

const Counter: FC<{ counterAtom: CounterAtom; onClickDelete: () => void }> = ({
  counterAtom,
  onClickDelete,
}) => {
  const { state, updateTitle, incrementCount, decrementCount, resetCount } =
    useCounter(counterAtom);
  return (
    <div className="p-2">
      <h3 className="flex">
        <Input
          size="md"
          color="secondary"
          type="text"
          className="text-xl"
          value={state.title}
          onChange={(e) => updateTitle(e.target.value)}
        />
        <Button size="md" color="ghost" onClick={onClickDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </h3>
      <Join className="grid grid-cols-3 py-2">
        <Button className="text-4xl" onClick={() => decrementCount(1)}>
          -1
        </Button>
        <Button color="accent" className="text-4xl">
          {state.count}
        </Button>
        <Button className="text-4xl" onClick={() => incrementCount(1)}>
          +1
        </Button>
      </Join>
      <div className="pt-2">
        <Button color="warning" onClick={resetCount}>
          カウントをリセットする
        </Button>
      </div>
      <Divider />
    </div>
  );
};

export default Counter;

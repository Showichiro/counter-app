import { FC } from "react";
import { Divider, Input, Button, Join } from "react-daisyui";
import { Counter } from "../types/atoms";
import { PrimitiveAtom } from "jotai";
import useCounter from "../hooks/useCounter";

const CounterCard: FC<{
  counterAtom: PrimitiveAtom<Counter>;
  onClickDelete: () => void;
}> = ({ counterAtom, onClickDelete }) => {
  const {
    count,
    decrementCount,
    incrementCount,
    resetCount,
    changeTitle,
    title,
  } = useCounter(counterAtom);
  return (
    <div className="p-2">
      <h3 className="flex">
        <Input
          size="md"
          color="secondary"
          type="text"
          className="text-xl"
          value={title}
          onChange={(e) => changeTitle(e.target.value)}
          aria-label="counter title"
        />
        <Button size="md" color="ghost" onClick={onClickDelete} aria-label="delete counter">
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
      <Join className="grid grid-cols-5 py-2">
        <Button className="text-2xl" onClick={() => decrementCount(10)}>
          -10
        </Button>
        <Button className="text-2xl" onClick={() => decrementCount()}>
          -1
        </Button>
        <Button color="accent" className="text-4xl">
          {count}
        </Button>
        <Button className="text-2xl" onClick={() => incrementCount()}>
          +1
        </Button>
        <Button className="text-2xl" onClick={() => incrementCount(10)}>
          +10
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

export default CounterCard;

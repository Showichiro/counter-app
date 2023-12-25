import { FC } from "react";
import { Divider, Input, Button } from "react-daisyui";
import { Category } from "../types/atoms";
import CounterCard from "./CounterCard";
import { PrimitiveAtom } from "jotai";
import useCategory from "../hooks/useCategory";

const CategoryCard: FC<{
  categoryAtom: PrimitiveAtom<Category>;
  onClickDelete: () => void;
}> = ({ categoryAtom, onClickDelete }) => {
  const { title, changeTitle, countersAtoms, insertCounter, removeCounter } =
    useCategory(categoryAtom);

  return (
    <div className="py-2">
      <h2 className="flex">
        <Input
          color="primary"
          size="lg"
          type="text"
          className="text-2xl"
          value={title}
          onChange={(e) => changeTitle(e.target.value)}
        />
        <Button size="lg" color="ghost" onClick={onClickDelete}>
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
      </h2>
      <div className="p-2">
        {countersAtoms.map((counterAtom) => (
          <CounterCard
            key={`${counterAtom}`}
            counterAtom={counterAtom}
            onClickDelete={() => removeCounter(counterAtom)}
          />
        ))}
        <Button
          className="py-4"
          color="info"
          onClick={() => insertCounter({ title: "カウンター", count: 0 })}
        >
          カウンターを増やす
        </Button>
      </div>
      <Divider />
    </div>
  );
};

export default CategoryCard;

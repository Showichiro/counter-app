import { FC } from "react";
import { Category, Counter } from "../types/atoms";
import { Divider, Input } from "react-daisyui";
import ShareCounterCard from "./ShareCounterCard";

const ShareCategoryCard: FC<{
  category: Omit<Category, "counters"> & {
    counters: Array<Counter & { id: number }>;
  };
}> = ({ category }) => {
  return (
    <div className="py-2">
      <h2 className="flex">
        <Input
          color="primary"
          size="lg"
          type="text"
          className="text-2xl"
          value={category.title}
          readOnly
        />
      </h2>
      <div className="p-2">
        {category.counters.map((counter) => (
          <ShareCounterCard key={counter.id} counter={counter} />
        ))}
      </div>
      <Divider />
    </div>
  );
};

export default ShareCategoryCard;

import { FC } from "react";
import { Counter } from "../types/atoms";
import { Button, Divider, Input, Join } from "react-daisyui";

const ShareCounterCard: FC<{ counter: Counter }> = ({ counter }) => {
  return (
    <div className="p-2">
      <h3 className="flex">
        <Input
          size="md"
          color="secondary"
          type="text"
          className="text-xl"
          value={counter.title}
          readOnly
        />
      </h3>
      <Join className="grid grid-cols-1 py-2">
        <Button color="accent" className="text-4xl">
          {counter.count}
        </Button>
      </Join>
      <Divider />
    </div>
  );
};

export default ShareCounterCard;

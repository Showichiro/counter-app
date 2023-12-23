import { PrimitiveAtom } from "jotai";

export type Counter = { title: string; count: number };
export type CounterAtom = PrimitiveAtom<Counter>;
export type Category = {
  title: string;
  counters: Counter[];
};
export type CategoryAtom = PrimitiveAtom<
  Omit<Category, "counters"> & { counters: CounterAtom[] }
>;

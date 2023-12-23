import { atom } from "jotai";
import { Category, CategoryAtom, CounterAtom } from "../types/atoms";

const initializer = (): CategoryAtom[] => {
  const savedItem = localStorage.getItem("categories");
  if (savedItem) {
    return (JSON.parse(savedItem) as Category[]).map<CategoryAtom>((category) =>
      atom({
        title: category.title,
        counters: category.counters.map<CounterAtom>((counter) =>
          atom(counter)
        ),
      })
    );
  }
  const defaultCounter: CounterAtom = atom({ title: "カウンター", count: 0 });
  return [atom({ title: "カテゴリー", counters: [defaultCounter] })];
};

export const categoriesAtom = atom<CategoryAtom[]>(initializer());

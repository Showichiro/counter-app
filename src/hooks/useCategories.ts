import { atom, useAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useEffect } from "react";
import { categoriesAtom } from "../state/categories";
import { CounterAtom } from "../types/atoms";

export const useCategories = () => {
  const [state, setState] = useAtom(categoriesAtom);

  const readCategories = useAtomCallback((get) => {
    const categories = get(categoriesAtom);
    return categories.map((categoryAtom) => {
      const category = get(categoryAtom);
      return {
        ...category,
        counters: category.counters.map((counterAtom) => {
          const counter = get(counterAtom);
          return counter;
        }),
      };
    });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const categories = readCategories();
      localStorage.setItem("categories", JSON.stringify(categories));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [readCategories]);

  const addNewCategory = () =>
    setState((prev) => {
      const counters: CounterAtom[] = [atom({ title: "カウンター", count: 0 })];
      const newCategoryAtom = atom({
        title: "カテゴリー",
        counters,
      });
      return [...prev, newCategoryAtom];
    });

  const deleteCategoryByKey = (key: string) => {
    setState((prev) => prev.filter((category) => category.toString() !== key));
  };

  return { state, addNewCategory, deleteCategoryByKey };
};

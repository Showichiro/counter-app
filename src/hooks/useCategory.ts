import { atom, useAtom } from "jotai";
import { CategoryAtom } from "../types/atoms";

export const useCategory = (categoryAtom: CategoryAtom) => {
  const [state, setState] = useAtom(categoryAtom);

  const updateTitle = (value: string) =>
    setState((prev) => ({ ...prev, title: value }));

  const deleteCounterByKey = (key: string) =>
    setState((prev) => ({
      ...prev,
      counters: prev.counters.filter((counter) => counter.toString() !== key),
    }));

  const addNewCounter = () =>
    setState((prev) => ({
      ...prev,
      counters: [...prev.counters, atom({ title: "カウンター", count: 0 })],
    }));

  return { state, updateTitle, deleteCounterByKey, addNewCounter };
};

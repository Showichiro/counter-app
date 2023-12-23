import { useAtom } from "jotai";
import { CounterAtom } from "../types/atoms";

export const useCounter = (counterAtom: CounterAtom) => {
  const [state, setState] = useAtom(counterAtom);

  const updateTitle = (title: string) =>
    setState((prev) => ({ ...prev, title }));

  const incrementCount = (val: number) =>
    setState((prev) => ({ ...prev, count: prev.count + val }));

  const decrementCount = (val: number) =>
    setState((prev) => ({ ...prev, count: prev.count - val }));

  const resetCount = () => setState((prev) => ({ ...prev, count: 0 }));

  return {
    state,
    updateTitle,
    incrementCount,
    decrementCount,
    resetCount,
  };
};

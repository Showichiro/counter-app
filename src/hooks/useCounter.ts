import { useAtomValue } from "jotai";
import { Counter } from "../types/atoms";
import { PrimitiveAtom } from "jotai/vanilla";
import { focusAtom } from "jotai-optics";
import { useCallback, useState } from "react";
import { useAtomCallback } from "jotai/utils";

const useCounter = (counterAtom: PrimitiveAtom<Counter>) => {
  const [titleAtom] = useState(
    focusAtom(counterAtom, (optic) => optic.prop("title"))
  );
  const [countAtom] = useState(
    focusAtom(counterAtom, (optic) => optic.prop("count"))
  );
  const title = useAtomValue(titleAtom);
  const changeTitle = useAtomCallback(
    useCallback(
      (_get, set, val: string) => {
        set(titleAtom, val);
      },
      [titleAtom]
    )
  );
  const count = useAtomValue(countAtom);

  const incrementCount = useAtomCallback(
    useCallback(
      (_get, set, val: number = 1) => {
        set(countAtom, (c) => c + val);
      },
      [countAtom]
    )
  );

  const decrementCount = useAtomCallback(
    useCallback(
      (_get, set, val: number = 1) => {
        set(countAtom, (c) => c - val);
      },
      [countAtom]
    )
  );

  const resetCount = useAtomCallback(
    useCallback(
      (_get, set) => {
        set(countAtom, 0);
      },
      [countAtom]
    )
  );

  return {
    title,
    changeTitle,
    count,
    incrementCount,
    decrementCount,
    resetCount,
  };
};
export default useCounter;

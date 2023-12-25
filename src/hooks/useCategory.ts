import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { Category, Counter } from "../types/atoms";
import { useCallback, useState } from "react";
import { focusAtom } from "jotai-optics";
import { splitAtom, useAtomCallback } from "jotai/utils";

const useCategory = (categoryAtom: PrimitiveAtom<Category>) => {
  const [titleAtom] = useState(
    focusAtom(categoryAtom, (optic) => optic.prop("title"))
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

  const [countersAtomsAtom] = useState(
    splitAtom(focusAtom(categoryAtom, (optic) => optic.prop("counters")))
  );
  const [countersAtoms, dispatch] = useAtom(countersAtomsAtom);

  const insertCounter = useCallback(
    (
      counter: Counter = {
        count: 0,
        title: "カウンター",
      }
    ) => {
      dispatch({ type: "insert", value: counter });
    },
    [dispatch]
  );

  const removeCounter = useCallback(
    (atom: PrimitiveAtom<Counter>) => {
      dispatch({ atom, type: "remove" });
    },
    [dispatch]
  );

  return { title, changeTitle, countersAtoms, insertCounter, removeCounter };
};

export default useCategory;

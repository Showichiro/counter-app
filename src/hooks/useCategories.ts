import { atomWithStorage, splitAtom } from "jotai/utils";
import { Category } from "../types/atoms";
import { PrimitiveAtom, useAtom } from "jotai";
import { useCallback } from "react";

const baseCategoriesAtom = atomWithStorage<Category[]>("categories", []);
const categoriesAtomsAtom = splitAtom(baseCategoriesAtom);

const useCategories = () => {
  const [categories, dispatch] = useAtom(categoriesAtomsAtom);

  const insertCategory = useCallback(
    (
      category: Category = {
        title: "カテゴリー",
        counters: [{ title: "カウンター", count: 0 }],
      }
    ) => {
      dispatch({ type: "insert", value: category });
    },
    [dispatch]
  );

  const removeCategory = useCallback(
    (atom: PrimitiveAtom<Category>) => {
      dispatch({ type: "remove", atom });
    },
    [dispatch]
  );

  return {
    categories,
    insertCategory,
    removeCategory,
  };
};

export default useCategories;

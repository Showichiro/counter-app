import { atomWithStorage, splitAtom, useAtomCallback } from "jotai/utils";
import { Sheet } from "../types/atoms";
import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";

const sheetsAtom = atomWithStorage<Sheet[]>("sheets", []);
const selectedSheetAtom = atomWithStorage<number | null>("selectedSheet", null);
const sheetAtomAtoms = splitAtom(sheetsAtom);

const useSheets = () => {
  const sheets = useAtomValue(sheetsAtom);
  const [, dispatch] = useAtom(sheetAtomAtoms);
  const [selectedSheet, setSelectedSheet] = useAtom(selectedSheetAtom);
  const insertSheet = (sheet: Sheet) =>
    dispatch({ type: "insert", value: sheet });

  const deleteSheetById = useAtomCallback(
    useCallback((_get, set, value: number) => {
      set(sheetsAtom, (sheets) => sheets.filter(({ id }) => id !== value));
    }, [])
  );
  return {
    sheets,
    selectedSheet,
    setSelectedSheet,
    insertSheet,
    deleteSheetById,
  };
};

export default useSheets;

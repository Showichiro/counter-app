import { Button } from "react-daisyui";
import Category from "./components/Category";
import { useCategories } from "./hooks/useCategories";

function App() {
  const { state, addNewCategory, deleteCategoryByKey } = useCategories();
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold">カウンター</h1>
      <div className="py-6">
        {state.map((categoryAtom) => (
          <Category
            key={`${categoryAtom}`}
            categoryAtom={categoryAtom}
            onClickDelete={() => deleteCategoryByKey(`${categoryAtom}`)}
          />
        ))}
        <div>
          <Button color="accent" onClick={addNewCategory}>カテゴリーを増やす</Button>
        </div>
      </div>
    </div>
  );
}

export default App;

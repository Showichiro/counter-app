import { Button } from "react-daisyui";
import CategoryCard from "./components/CategoryCard";
import useCategories from "./hooks/useCategories";

function App() {
  const { categories, removeCategory, insertCategory } = useCategories();
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold">カウンター</h1>
      <div className="py-6">
        {categories.map((categoryAtom) => (
          <CategoryCard
            key={`${categoryAtom}`}
            categoryAtom={categoryAtom}
            onClickDelete={() => removeCategory(categoryAtom)}
          />
        ))}
        <div>
          <Button color="accent" onClick={() => insertCategory()}>
            カテゴリーを増やす
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

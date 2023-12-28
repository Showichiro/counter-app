import { FC } from "react";
import NavBar from "../components/Nav";
import useCategories from "../hooks/useCategories";
import CategoryCard from "../components/CategoryCard";
import { Button } from "react-daisyui";

const Index: FC = () => {
  const { categoryAtoms, removeCategory, insertCategory } = useCategories();
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4">
        <div className="py-6">
          {categoryAtoms.map((categoryAtom) => (
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
    </>
  );
};

export default Index;

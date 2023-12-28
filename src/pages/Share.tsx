import { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { ShareLoaderData } from "../loader/shareLoader";
import ShareNav from "../components/ShareNav";
import { Button, Loading } from "react-daisyui";
import ShareCategoryCard from "../components/ShareCategoryCard";

const Share: FC = () => {
  const { data } = useLoaderData() as ShareLoaderData;
  return (
    <>
      <ShareNav />
      <div className="container mx-auto px-4">
        <div className="py-6">
          <Suspense fallback={<Loading />}>
            <Await
              resolve={data}
              errorElement={<>Error</>}
              children={({
                categories,
                name,
              }: Awaited<ShareLoaderData["data"]>) => (
                <>
                  <div className="text-4xl font-bold">{name}</div>
                  {categories.map((category) => (
                    <ShareCategoryCard
                      key={category.id}
                      category={{
                        title: category.name,
                        counters: category.counters.map((val) => ({
                          title: val.name,
                          count: val.count,
                          id: val.id,
                        })),
                      }}
                    />
                  ))}
                </>
              )}
            />
          </Suspense>
        </div>
        <Button
          onClick={() => window.navigator.share({ url: window.location.href })}
        >
          シェアする
        </Button>
      </div>
    </>
  );
};

export default Share;

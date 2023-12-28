import { LoaderFunctionArgs } from "react-router-dom";
import client from "../utils/honoClient";

const shareLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await client.api.sheets[":sheetId"].$get({
    param: { sheetId: params.id as string },
  });
  const json = response.json();
  return { data: json };
};

export default shareLoader;
export type ShareLoaderData = Awaited<ReturnType<typeof shareLoader>>;

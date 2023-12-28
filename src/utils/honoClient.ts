import { hc } from "hono/client";
import { AppType } from "../../api/src";

const client = hc<AppType>(import.meta.env.VITE_API_URL);

export default client;

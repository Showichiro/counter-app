import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Share from "./pages/Share";
import shareLoader from "./loader/shareLoader";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />,
      index: true,
    },
    {
      path: "/share/:id",
      element: <Share />,
      loader: shareLoader,
    },
  ],
  { basename: "/counter-app" }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Buttons from "./buttonsPage";
import MarketingPage from "./MarketingPage";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <MarketingPage />,
        },
      ],
    },
    {
      path: "/buttons",
      element: <Buttons />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

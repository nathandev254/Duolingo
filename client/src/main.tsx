import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App"; // Ensure case matches
import './index.css';
import Layout from "./Layout";
import Buttons from "./buttonsPage"; // Updated to use uppercase

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",          
        element: <App />,  
      },
      
    ],
  },
  {
    path: "/buttons",      
    element: <Buttons />,   
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

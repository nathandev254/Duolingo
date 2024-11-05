import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App"; // Ensure case matches
import './index.css';
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,  // This will wrap the routes defined in children
    children: [
      {
        path: "/",          // Route for the homepage
        element: <App />,   // Renders the App component
      },
      // Additional routes that share the Layout can be added here
    ],
  },
  {
    path: "/buttons",      // Unique Buttons page
    element: <Buttons />,   // Renders the Buttons component without Layout
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

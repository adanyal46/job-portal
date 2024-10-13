import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthApp from "./AuthApp";
import routeConfig from "./routesConfig";
import "./App.scss";
import Loader from "./components/Loader";

const App = () => {
  const token = localStorage.getItem("token");
  const routes = routeConfig(token);

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={createBrowserRouter(routes)}>
        <AuthApp />
      </RouterProvider>
    </Suspense>
  );
};

export default App;

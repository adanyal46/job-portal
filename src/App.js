import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthApp from "./AuthApp";
import "./App.scss";
import Loader from "./components/Loader";
import routeConfig from "./routes/routesConfig";

const App = () => {
  const token = localStorage.getItem("token");
  const routes = routeConfig(token);
  console.log(process.env.REACT_APP_API_URL);

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={createBrowserRouter(routes)}>
        <AuthApp />
      </RouterProvider>
    </Suspense>
  );
};

export default App;

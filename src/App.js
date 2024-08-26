import { lazy, Suspense } from "react";
import { BrowserRouter as MainRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

import "./App.scss";

const MyProfile = lazy(() => import("./pages/myProfile"));
const JobSearch = lazy(() => import("./pages/jobSearch"));
const Notifications = lazy(() => import("./pages/notifications"));
const Settings = lazy(() => import("./pages/settings"));

const App = () => {
  return (
    <Suspense fallback={<p>Error</p>}>
      <div className="app-wrapper">
        <section className="fuse-main-wrapper">
          <MainRouter>
            <Navbar />

            <main className="fuse-main-body">
              <Sidebar />

              <Routes>
                <Route path="/" exact element={<MyProfile />} />
                <Route path="/jobs/search" exact element={<JobSearch />} />
                <Route
                  path="/notifications"
                  exact
                  element={<Notifications />}
                />
                <Route path="/settings" exact element={<Settings />} />
              </Routes>
            </main>
          </MainRouter>
        </section>
      </div>
    </Suspense>
  );
};

export default App;

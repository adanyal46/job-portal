import { lazy, Suspense } from "react";
import { BrowserRouter as MainRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

import "./App.scss";

const MyProfile = lazy(() => import("./pages/myProfile"));
const JobSearch = lazy(() => import("./pages/jobSearch"));
const Mentors = lazy(() => import("./pages/mentors"));
const Bookings = lazy(() => import("./pages/bookings"));
const UpcomingBookings = lazy(() => import("./pages/upcomingBookings"));
const HistoryBookings = lazy(() => import("./pages/historyBookings"));
const MentorDetails = lazy(() => import("./pages/mentorDetails"));
const Earnings = lazy(() => import("./pages/earnings"));
const Blogs = lazy(() => import("./pages/blogs"));
const BlogDetail = lazy(() => import("./pages/blogDetail"));
const WriteBlog = lazy(() => import("./pages/writeBlog"));
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
                <Route path="/mentors" exact element={<Mentors />} />
                <Route path="/bookings" exact element={<Bookings />} />
                <Route
                  path="/upcomingBookings"
                  exact
                  element={<UpcomingBookings />}
                />
                <Route
                  path="/historyBookings"
                  exact
                  element={<HistoryBookings />}
                />
                <Route
                  path="/mentorDetails"
                  exact
                  element={<MentorDetails />}
                />
                <Route path="/earnings" exact element={<Earnings />} />
                <Route path="/blogs" exact element={<Blogs />} />
                <Route path="/blogDetails" exact element={<BlogDetail />} />
                <Route path="/writeBlog" exact element={<WriteBlog />} />
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

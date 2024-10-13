import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "./features/profile/profileSlice";
import Loader from "./components/Loader";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-wrapper">
      <section className="fuse-main-wrapper">
        <Navbar user={user} />
        <main className="fuse-main-body">
          <Sidebar user={user} />
          <Outlet context={user} />
        </main>
      </section>
    </div>
  );
};

export default Layout;

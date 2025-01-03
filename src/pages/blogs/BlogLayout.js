import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/profile/profileSlice";
import Navbar from "../../components/navbar";

const BlogLayout = ({ children, title }) => {
  const { user, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <section className="block_page_bg">
      <Navbar user={user} />
      <div
        className="block_page_container"
        style={{ minHeight: "calc(100vh - 72px)", overflow: "auto" }}
      >
        <h4>{title}</h4>
        {children}
      </div>
    </section>
  );
};

export default BlogLayout;

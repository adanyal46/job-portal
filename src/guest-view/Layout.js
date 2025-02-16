import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./layout.css";
import {
  SocialFacebookIcon,
  SocialLinkdinIcon,
  SocialTwitterIcon,
} from "../assets/svg";
import Navbar from "./includes/Navbar";
import Footer from "./Footer";

const GuestLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default GuestLayout;

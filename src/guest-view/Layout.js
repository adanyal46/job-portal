import { Flex, Layout, Menu } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./layout.css";
const items = [
  {
    key: "jobs",
    label: "Jobs",
  },
  {
    key: "mentorship",
    label: "Mentorship",
  },
  {
    key: "partners",
    label: "Partners",
  },
  {
    key: "employers",
    label: "Employers",
  },
  {
    key: "blogs",
    label: "Blogs",
  },
];
const GuestLayout = () => {
  return (
    <div>
      <nav class="guest__nav">
        <img src="/guest/logo.svg" alt="logo" />
        <ul>
          {items?.map((item, index) => (
            <li key={index}>
              <a href="#">{item.label}</a>
            </li>
          ))}
        </ul>
        <Flex gap={20} align="center">
          <Link to={"/login"}>
            <button className="secondary__btn">
              <span>Login</span>
            </button>
          </Link>
          <Link to={"/signup-type"}>
            <button className="primary__btn">
              <span>Sign up</span>
            </button>
          </Link>
        </Flex>
      </nav>
      <Outlet />
      {/* <footer className="guest__footer">
        <div>
          <img src="/guest/footer_logo.svg" alt="footer_logo" />
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, toSed ut perspiciatis unde omnis
            iste natus error{" "}
          </p>
        </div>
        <div>
          <h5 className="footer__subheading">Link</h5>
          <ul className="footer__items">
            <li className="footer__item">
              <a href="#">Jobs</a>
            </li>
            <li className="footer__item">
              <a href="#">Mentors</a>
            </li>
            <li className="footer__item">
              <a href="#">Employer</a>
            </li>
            <li className="footer__item">
              <a href="#">Recruiter</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="footer__subheading">About Fuse</h5>
          <ul className="footer__items">
            <li className="footer__item">
              <a href="#">About Us</a>
            </li>
            <li className="footer__item">
              <a href="#">Terms & conditions</a>
            </li>
            <li className="footer__item">
              <a href="#">Privacy policy</a>
            </li>
            <li className="footer__item">
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="footer__subheading">About Fuse</h5>
          <h5 className="footer__subheading">Follow Us for Updates</h5>
        </div>
      </footer> */}
    </div>
  );
};

export default GuestLayout;

import { Flex, Layout, Menu } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./layout.css";
import {
  SocialFacebookIcon,
  SocialLinkdinIcon,
  SocialTwitterIcon,
} from "../assets/svg";
const items = [
  {
    key: "jobs",
    label: "Jobs",
    link: "/jobs/view",
  },
  {
    key: "mentorship",
    label: "Mentorship",
    link: "/mentorship",
  },
  {
    key: "partners",
    label: "Partners",
    link: "/partners",
  },
  {
    key: "employers",
    label: "Employers",
    link: "/employers",
  },
  {
    key: "blogs",
    label: "Blogs",
  },
];
const GuestLayout = () => {
  return (
    <div>
      <nav className="guest__nav">
        <Link to={"/"}>
          <img src="/guest/logo.svg" alt="logo" />
        </Link>
        <ul>
          {items?.map((item, index) => (
            <li key={index}>
              <Link to={item.link}>{item.label}</Link>
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
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <img src="/guest/footer_logo.svg" alt="Fuse Logo" />
            </div>
            <p>
              Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit Voluptatem
              Accusantium Doloremque Laudantium, ToTem
            </p>
            <p>Perspiciatis Unde Omnis Iste Natus Error</p>
          </div>
          <div className="footer-links">
            <h3>Links</h3>
            <ul>
              <li>
                <Link to="/jobs/view">Jobs</Link>
              </li>
              <li>
                <Link to="/mentorship">Mentors</Link>
              </li>
              <li>
                <Link to="/employers">Employers</Link>
              </li>
              <li>
                <Link to="/partners">Recruiters</Link>
              </li>
            </ul>
          </div>
          <div className="footer-about">
            <h3>About Fuse</h3>
            <ul>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/term-condition">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <h3>About Fuse</h3>
            <h4>Follow Us For Updates</h4>
            <ul>
              <li>
                <a href="#">
                  <SocialLinkdinIcon />
                </a>
              </li>
              <li>
                <a href="#">
                  <SocialFacebookIcon />
                </a>
              </li>
              <li>
                <a href="#">
                  <SocialTwitterIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            Join Our Diverse Community And Start Connecting With Opportunities
            Today!
          </p>
          <button>Join Us Today</button>
        </div>
        <div className="footer_last">
          <hr />
          <p>&copy; 2024 FuseWW Ltd. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GuestLayout;

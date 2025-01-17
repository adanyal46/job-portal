import { Flex } from "antd";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
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
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="guest__nav">
      <Link to={"/"}>
        <img src="/guest/logo.svg" alt="logo" />
      </Link>
      <ul className={`menu ${isMobileMenuOpen ? "active" : ""}`}>
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
        <div className="menu-icon" onClick={toggleMenu}>
          {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </Flex>
    </nav>
  );
};

export default Navbar;

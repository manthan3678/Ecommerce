import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer text-white p-2 bg-dark">
      <h4 className="text-center">All Right Reserved &copy; Manthan</h4>
      <p className="text-center mt-3 ">
        <Link to="/about" className="text-white text-decoration-none p-2">
          About
        </Link>
        |
        <Link to="/contact" className="text-white text-decoration-none p-2">
          Contact
        </Link>
        |
        <Link to="/policies" className="text-white text-decoration-none p-2">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;

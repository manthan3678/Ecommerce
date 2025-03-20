import React from "react";
import Layout from "../Components/Layout/Layout";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1 className="">404</h1>
        <h2 className="">Oops ! Page Not Found</h2>
        <Link to="/" className="btn bg-secondary-subtle ">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;

import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const DashBoard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      {/* DashBoard Page ko Prevent krege */}
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            {" "}
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 pt-3">
              <h3>Name:- {auth?.user?.name}</h3>
              <h3>Name:- {auth?.user?.email}</h3>
              <h3>Name:- {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;

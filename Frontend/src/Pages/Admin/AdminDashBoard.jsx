import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
const AdminDashBoard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin Name:- {auth?.user?.name}</h3>
              <h4>Admin Email:- {auth?.user?.email}</h4>
              <h4>Admin Contact:- {auth?.user?.phone}</h4>
              <h5>Admin Address:- {auth?.user?.address}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashBoard;

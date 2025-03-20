import React, { use, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../Components/Form/CategoryForm";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";

//
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  // model satte
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatename, setUpdateName] = useState("");
  //!!!!!!!!!!!!!!! handle form !!!!!!!!!!!!!!!
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        toast.success(`${data.category.name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in network error");
    }
  };
  //############## update category ###############
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(e);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        {
          name: updatename,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(`${updatename} is updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethong went wrong on updating");
    }
  };
  // !!!!!!!!!!!! Get Category !!!!!!!!!!!!!!!!
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/getcategory"
      );
      if (data.success) {
        // console.log(data.category);
        setCategories([...data.category]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  //############## Delete category ###############
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pid}`,

        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethong went wrong on updating");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      {" "}
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50 ">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, index) => {
                    return (
                      <tr key={index}>
                        <td>{cat.name}</td>
                        <td>
                          <button
                            className="btn btn-success ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(cat.name);
                              setSelected(cat);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDelete(cat._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ul></ul>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updatename}
              setValue={setUpdateName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;
const UpdateProducts = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  //
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  //
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
  // ######### Update Product ###########
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      // photo less then 1mb
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong update");
    }
  };
  // ########## Delete Product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure to delete product");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/product-delete/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log("while deleting error", error);
    }
  };
  //
  // !!!!!!!!! Get SINGLE PRODUCT !!!!!!!!!!!!!
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      console.log(data);
      setName(data.products.name);
      setId(data.products._id);
      setDescription(data.products.description);
      setPrice(data.products.price);
      setPrice(data.products.price);
      setQuantity(data.products.quantity);
      setShipping(data.products.shipping);
      setCategory(data.products.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Something wrong single producr");
    }
  };
  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Products</h1>
            <div className="mt-1 w-75">
              {/* isko bad me dekhna iska data nhi ara  */}
              <Select
                variant="false"
                placeholder="select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => {
                  return (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  );
                })}
              </Select>
              {/* image section */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo Less Then 1MB"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                  {/* files lete to array rehta isiliye [0] likhe hai */}
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product Photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                      alt="product Photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              {/**************** */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write A Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/*  */}
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  name=""
                  id=""
                  placeholder="Write A Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write A Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write A Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  variant={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "no"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-success " onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger mx-5" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;

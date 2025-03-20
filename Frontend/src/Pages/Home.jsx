import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
// import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const Home = () => {
  const [cart, setCart] = useCart();
  // const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //****************** */
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProduct(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //****************** */
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
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-count`
      );
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };
  //
  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);
  // load more function
  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProduct([...product, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // *****************
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  // ########## get Filter #######
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProduct(data?.products);
    } catch (error) {
      console.log("filter product", error);
    }
  };
  return (
    <Layout>
      <div className="row my-3">
        <div className="col-md-2">
          <h5 className="text-center fw-medium my-2">Filter By Category</h5>
          <div className="d-flex flex-column my-2 px-2">
            {categories?.map((cat) => {
              return (
                <Checkbox
                  key={cat._id}
                  onChange={(e) => handleFilter(e.target.checked, cat._id)}
                >
                  {cat.name}
                </Checkbox>
              );
            })}
          </div>
          {/* !!!!!!! Price Filter !!!!!!!! */}
          <h5 className="text-center fw-medium my-2">Filter By Price</h5>
          <div className="d-flex flex-column my-1 px-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column my-3 mx-1 ">
            <button
              className="btn btn-danger w-50 px-2"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>
        {/* Side */}
        <div className="col-md-10">
          {/* {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)} */}
          <h2 className="text-center fw-normal mb-3">All Products</h2>
          <div className="d-flex flex-wrap">
            {product?.map((p) => {
              return (
                <div
                  className="card mx-4 my-3"
                  style={{ width: "20rem" }}
                  key={p._id}
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={"230px"}
                    width={"100%"}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">{p.name}</h5>
                    <p className="card-text text-capitalize">{p.description}</p>
                    <p className="card-text text-capitalize">${p.price}</p>

                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-success ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added To Cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="m-2 p-3">
            {product && product.length < total && (
              <button
                className="btn btn-warning p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading.." : "Load-More"}
                {/* backend me jitni value denga utne product starting me show honge or fir bad me load more k though show honge */}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

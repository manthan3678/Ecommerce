import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      //   console.log(params.slug);
      //   console.log(data?.products);
      setProduct(data?.products);
      getSimilarProduct(data?.products._id, data?.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  // Intial Product Details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      //   console.log(data);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-4">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"370px"}
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h3 className="text-center">Product Details</h3>
          <h5 className="text-capitalize">Name : {product.name}</h5>
          <h5 className="text-capitalize">
            Description : {product.description}
          </h5>
          <h5 className="text-capitalize">Price : ${product.price}</h5>
          <h5 className="text-capitalize">
            Category : {product?.category?.name}
          </h5>{" "}
          <br />
          <button className="btn btn-success ms-1">ADD TO CART</button>
        </div>
      </div>
      {/* SIMILAR PRODUCTS */}
      <div className="row container-fluid my-5">
        <h5>Similar Products</h5>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}

        <div className="d-flex flex-wrap mt-2">
          {relatedProducts?.map((p) => {
            return (
              <div className="card mx-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{p.name}</h5>
                  <p className="card-text text-capitalize">{p.description}</p>
                  <p className="card-text text-capitalize">${p.price}</p>

                  <button className="btn btn-success ms-1">Add To Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

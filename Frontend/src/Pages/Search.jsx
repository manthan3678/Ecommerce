import React from "react";
import Layout from "../Components/Layout/Layout";
import { useSearch } from "../context/Search";
const Search = () => {
  const [search, setSearch] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h3>Search Result</h3>
          <h5>
            {search?.result.length < 1
              ? "No Product Found"
              : `Found ${search?.result.length}`}
          </h5>
          {/* SHowing the result  */}
          <div className="d-flex flex-wrap mt-3">
            {search?.result.map((p) => {
              return (
                <div
                  className="card mx-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">{p.name}</h5>
                    <p className="card-text text-capitalize">{p.description}</p>
                    <p className="card-text text-capitalize">${p.price}</p>

                    <button className="btn btn-primary ms-1">
                      More Details
                    </button>
                    <button className="btn btn-success ms-1">
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

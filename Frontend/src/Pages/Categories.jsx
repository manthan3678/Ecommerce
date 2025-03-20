import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import useCategory from "../HOOK/useCategory";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="container">
        <div className="row">
          {categories?.map((c) => (
            <div className="col-md-6 my-4 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary p-3">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;

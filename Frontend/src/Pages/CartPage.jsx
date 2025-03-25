import { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import axios from "axios";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clienttoken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-Us", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // remove cart item function
  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item Removed From Cart");
    } catch (error) {
      console.log(error);
    }
  };
  // new
  // payment gateway
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    // console.log(clienttoken);
  }, [auth?.token]);

  const handlePayment = () => {};
  return (
    <Layout>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h2>
            <h4 className="text-center my-2">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {cart?.map((p, i) => {
                return (
                  <div className="row my-3 " key={i}>
                    <div className="col-md-4">
                      {" "}
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        height={"150px"}
                        width={"60%"}
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>Price : ${p.price}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p> Total | CheckOut | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="my-2">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="my-2">
                  {auth?.token ? (
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate("/dashboard/user/login", { state: "/cart" })
                      }
                    >
                      {" "}
                      Login To CheckOut
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="my-3">
              {(() => {
                try {
                  return (
                    <DropIn
                      options={{
                        authorization: clienttoken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                  );
                } catch (error) {
                  console.error("Error Rendering DropIn:", error);
                  return <p>Error loading payment gateway.</p>;
                }
              })()}
            </div>
            {/* <div className="my-2">
              {clienttoken}
              <DropIn
                options={{
                  authorization: clienttoken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button className="btn btn-success" onClick={handlePayment}>
                Make--Payment
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

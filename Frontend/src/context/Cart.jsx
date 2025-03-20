import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  // authprovider ki help se state ko kahi se access kr payege
  const [cart, setCart] = useState([]);
  // default axios
  // axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
// custom hook

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

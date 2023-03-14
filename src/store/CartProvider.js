import { useState } from "react";
import CartContext from "./cart-context";
const CartProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedin = !!token;
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const details = {
    token: token,
    isLoggedin: userIsLoggedin,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <CartContext.Provider value={details}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;

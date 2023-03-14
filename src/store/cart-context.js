import React from "react";
const CartContext = React.createContext({
  token: "",
  isLoggedin: false,
  login: (token) => {},
  logout: () => {},
});
export default CartContext;

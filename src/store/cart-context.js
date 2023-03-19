import React from "react";
const CartContext = React.createContext({
  token: "",
  isLogin: false,
  login: (token) => {},
  logout: () => {},
});
export default CartContext;

import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const NavBar = () => {
  const Data = useContext(CartContext);
  return (
    <>
      <div className={classes.navbartop}>
        <div>
          <NavLink to="/" className={classes["nav-link"]}>
            <h2>MywebLink</h2>
          </NavLink>
        </div>
        <div>
          <NavLink to="/home" className={classes["nav-link"]}>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/products" className={classes["nav-link"]}>
            Products
          </NavLink>
        </div>
        <div>
          <NavLink to="/aboutus" className={classes["nav-link"]}>
            About Us
          </NavLink>
        </div>
        <div>
          {Data.isLoggedin && (
            <NavLink to="/profile" className={classes["nav-link"]}>
              Profile
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};
export default NavBar;

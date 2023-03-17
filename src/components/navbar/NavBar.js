import { NavLink, useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const NavBar = () => {
  const navigate = useNavigate();
  const Data = useContext(CartContext);
  const logOutHandler = () => {
    Data.logout(null);
    navigate("/");
  };
  return (
    <>
      <div className={classes.navbartop}>
        <div>
          {!Data.isLoggedin && (
            <NavLink to="/" className={classes["nav-link"]}>
              <h2>MywebLink</h2>
            </NavLink>
          )}
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div>
            {Data.isLoggedin && <button onClick={logOutHandler}>Logout</button>}
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;

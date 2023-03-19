import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../../store/cart-context";
import classes from "./Header.module.css";

const Header = () => {
  const Data = useContext(CartContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    Data.logout(null);
    navigate("/auth");
  };
  return (
    <>
      <div className={classes.headermain}>
        <div>
          <h2>Expense Tracker</h2>
        </div>
        <div>
          <button
            type="button"
            onClick={logoutHandler}
            className={classes.headerLogoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
export default Header;

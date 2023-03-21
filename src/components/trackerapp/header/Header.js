import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logout(false));

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

import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";
import { useSelector } from "react-redux";
import { toggleTheme } from "../../../store/theme";
import "../../../App.css";
import { useEffect } from "react";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const logoutHandler = () => {
    dispatch(authActions.logout(false));

    navigate("/auth");
  };
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <>
      <div className={classes.headermain}>
        <label className={classes.toggleSwitch}>
          <input
            type="checkbox"
            // value={switchTheme}
            checked={theme === "dark"}
            onChange={() => dispatch(toggleTheme())}
            // onChange={() => setSwitchTheme(!switchTheme)}
          />
          <span className={classes.slider}></span>
        </label>
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

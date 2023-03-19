import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";
const NavBar = () => {
  return (
    <>
      <div className={classes.navbar}>
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
        <div>
          <NavLink to="/auth">Login</NavLink>
        </div>
      </div>
    </>
  );
};
export default NavBar;

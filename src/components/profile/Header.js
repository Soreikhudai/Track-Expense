import { Link } from "react-router-dom";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <>
      <header className={classes.profileHeader}>
        <div>
          <h3>Welcome to Expense Tracker !!!</h3>
        </div>
        <div>
          <p className={classes.headerParagraph}>
            your profile is incomplete.
            <Link to="/updateprofilepage">Complete now</Link>
          </p>
        </div>
      </header>
    </>
  );
};
export default Header;

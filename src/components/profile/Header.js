import { Link } from "react-router-dom";
import classes from "./Header.module.css";

const Header = ({ isProfileComplete }) => {
  return (
    <>
      <header className={classes.profileHeader}>
        <div>
          <h3>Welcome to Expense Tracker !!!</h3>
        </div>
        <div>
          {isProfileComplete ? (
            <p className={classes.headerParagraph}>Your profile is complete.</p>
          ) : (
            <p className={classes.headerParagraph}>
              Your profile is incomplete.{" "}
              <Link to="/updateprofilepage">Complete now</Link>
            </p>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

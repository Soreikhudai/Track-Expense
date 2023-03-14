import classes from "./Header.module.css";
const Header = () => {
  return (
    <>
      <header className={classes.profileHeader}>
        <div>
          <div>
            <h3>Welcome to Expense Tracker !!!</h3>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;

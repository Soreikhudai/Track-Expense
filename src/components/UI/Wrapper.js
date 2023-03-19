import classes from "./Wrapper.module.css";
const Wrapper = (props) => {
  return (
    <div className={classes["wrapper-container"]}>
      <div className={classes.wrapper}>{props.children}</div>;
    </div>
  );
};
export default Wrapper;

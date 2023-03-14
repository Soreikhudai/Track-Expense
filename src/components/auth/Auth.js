import { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./Auth.module.css";
const Auth = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const saveDetailsHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmRef.current.value;
    if (enteredPassword !== enteredConfirmPassword) {
      setErrorMessage("password do not match");
      return;
    } else {
      console.log("user has suucessfully sihgned up");
      setErrorMessage(false);
    }

    console.log(enteredEmail);
  };
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        </div>
      </div>

      <form onSubmit={saveDetailsHandler} className={classes.form}>
        <div className={classes.inputContainer}>
          <div className={classes.labelContainer}>
            <label>Email</label>
          </div>
          <div>
            <input type="email" required ref={emailRef} />
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.labelContainer}>
            <label>Password</label>
          </div>
          <div>
            <input type="password" required minLength="6" ref={passwordRef} />
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.labelContainer}>Confirm Password</div>
          <div>
            <input type="password" required ref={confirmRef} />
          </div>
        </div>
        {errorMessage && (
          <div className={classes.errorMessage}>{errorMessage}</div>
        )}

        <div className={classes.submitContainer}>
          <div>
            <button className={classes["auth-btn-1"]}>
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={switchAuthModeHandler}
              className={classes["auth-btn-2"]}
            >
              {isLogin ? "Create new account" : "Have an account? Log in"}
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};
export default Auth;

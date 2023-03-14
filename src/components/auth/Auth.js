import { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
//import CartContext from "../../store/cart-context";

const Auth = () => {
  const navigate = useNavigate();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const saveDetailsHandler = async (event) => {
    event.preventDefault();

    const details = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFu8-Vjj_SFNU9d3lO4PE0uqF6xhYUqiU";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFu8-Vjj_SFNU9d3lO4PE0uqF6xhYUqiU";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(details),
        returnSecureToken: "true",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("request failed");
      }
      const data = await response.json();
      localStorage.setItem("token", data.idToken);
      navigate("/profile");
    } catch (error) {
      alert("something went wrong");
      console.error(error);
    }
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
              {isLogin
                ? "Don't have an account? Sign up here"
                : "Have an account with us? Log in here"}
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};
export default Auth;

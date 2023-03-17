import { useState, useRef, useContext } from "react";
import Card from "../UI/Card";
import classes from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import CartContext from "../../store/cart-context";
import { SoreiApp } from "../../firebase";

const Auth = () => {
  const auth = getAuth(SoreiApp);
  const Data = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const saveDetailsHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        alert(
          "A verification email has been sent to your email. Please verify and login again."
        );
        setIsLoading(false);
        return;
      }

      Data.login(user.accessToken);
      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      alert("login unable, try again");

      setIsLoading(false);
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
        <div className={classes.inputContainer}>
          <div className={classes.labelContainer}>
            <label>Confirm Password</label>
          </div>
          <div>
            <input
              type="password"
              required
              minLength="6"
              ref={confirmPasswordRef}
            />
          </div>
        </div>

        <div className={classes.submitContainer}>
          <div>
            {!isLoading && (
              <button className={classes["auth-btn-1"]}>
                {isLogin ? "Login" : "Sign Up"}
              </button>
            )}
            {isLoading && <p>sending request....</p>}
          </div>
          <div>
            <Link to="/resetpassword">Forgot your passowrd? Click here</Link>
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

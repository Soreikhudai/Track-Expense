import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { useRef } from "react";
import { SoreiApp } from "../firebase";

const Reset = () => {
  const auth = getAuth(SoreiApp);
  const navigate = useNavigate();
  const passwordChangeRef = useRef("");

  const resetForgotPasswordHandler = async (event) => {
    event.preventDefault();

    const email = passwordChangeRef.current.value;

    if (auth) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent!");
        navigate("/");
      } catch (error) {
        alert("something went wrong");
      }
    }
  };

  const goToAuthPageHandler = () => {
    navigate("/auth");
  };

  return (
    <>
      <Card>
        <form>
          <div
            style={{
              margin: "5px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <h4>Enter the email which you have registered</h4>
            <div>
              <label>Email</label>
              <input
                ref={passwordChangeRef}
                style={{
                  border: "1px solid red",
                  width: "100%",
                  backgroundColor: "lightBlue",
                }}
                type="email"
                placeholder="eg.@gmail.com"
              />
            </div>
            <div>
              <button
                onClick={resetForgotPasswordHandler}
                type="button"
                style={{
                  padding: "10px 70px",
                  backgroundColor: "green",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  fontWeight: "bolder",
                  cursor: "pointer",
                }}
              >
                Send Link
              </button>
            </div>
          </div>
        </form>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={goToAuthPageHandler}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "blue",
              cursor: "pointer",
            }}
          >
            Already a user? Login
          </button>
        </div>
      </Card>
    </>
  );
};
export default Reset;

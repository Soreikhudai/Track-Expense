import classes from "./UpdationPage.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { SoreiApp } from "../../firebase";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";

const UpdationPage = () => {
  const fullNameRef = useRef("");
  const photoUrlRef = useRef("");
  const auth = getAuth(SoreiApp);
  const [userData, setUserData] = useState(null);
  const Data = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!auth.currentUser) {
          return;
        }

        const idToken = await auth.currentUser.getIdToken();
        const response = await fetch(
          `https://react-http-project-da8f6-default-rtdb.firebaseio.com/users/${auth.currentUser.uid}.json?auth=${idToken}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  const updateProfileHandler = async (event) => {
    event.preventDefault();
    const userDetails = {
      displayName: fullNameRef.current.value,
      photoURL: photoUrlRef.current.value,
    };

    try {
      await updateProfile(auth.currentUser, userDetails);
      console.log("User profile updated successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutHandler = () => {
    Data.logout(null);
    navigate("/");
  };
  return (
    <>
      <header className={classes.updationpage}>
        <p className={classes.updationpageparagraph}>
          Winners never quit, Quitters never win
        </p>
        <button onClick={logoutHandler}>Logout</button>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem auto",
          color: "blue",
        }}
      >
        <div>
          <h2 className={classes.contactDetails}>Contact Details</h2>
        </div>
      </div>
      <form className={classes.updateProfileForm}>
        <div>
          <label>Full Name**</label>
          <input
            type="text"
            ref={fullNameRef}
            defaultValue={userData?.displayName}
          />
        </div>
        <div>
          <label>Profile Photo Url**</label>
          <input
            type="text"
            ref={photoUrlRef}
            defaultValue={userData?.photoURL}
          />
        </div>
        <div>
          <div>
            <button onClick={updateProfileHandler}>Update</button>
          </div>
          <div>
            <button>Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdationPage;

import classes from "./UpdationPage.module.css";
import { useRef } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { SoreiApp } from "../../firebase";

const UpdationPage = () => {
  const fullNameRef = useRef("");
  const photoUrlRef = useRef("");
  const auth = getAuth(SoreiApp);

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

  return (
    <>
      <header className={classes.updationpage}>
        <p className={classes.updationpageparagraph}>
          Winners never quite, Quitters never win
        </p>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marign: "1rem auto",
          color: "blue",
        }}
      >
        <div>
          <h2 className={classes.contactDetails}>contact details</h2>
        </div>
      </div>
      <form className={classes.updateProfileForm}>
        <div>
          <label>Full Name**</label>
          <input type="text" ref={fullNameRef} />
        </div>
        <div>
          <label>Profile Photo Url**</label>
          <input type="text" ref={photoUrlRef} />
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

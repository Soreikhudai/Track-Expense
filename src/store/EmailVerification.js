import { useState, useEffect } from "react";
import { getAuth, sendEmailVerification } from "firebase/auth";

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    // Send email verification
    setIsLoading(true);
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setIsLoading(false);
        setIsSent(true);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading && <p>Sending email verification...</p>}
      {!isLoading && isSent && (
        <p>Verification email sent! Please check your email.</p>
      )}
      {!isLoading && !isSent && (
        <p>Something went wrong. Please try again later.</p>
      )}
    </div>
  );
};

export default VerifyEmail;

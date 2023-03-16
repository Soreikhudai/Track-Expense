import { Link } from "react-router-dom";
import EmailVerification from "../store/EmailVerification";

const EmailButtonPage = () => {
  return (
    <>
      <Link to="/emailverification">
        <EmailVerification />
      </Link>
    </>
  );
};
export default EmailButtonPage;

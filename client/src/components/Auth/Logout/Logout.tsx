import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import * as authService from "../../../services/auth";

// todo test dependencies in use effect
const Logout = () => {
  const { userLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .logout()
      .then(() => {
        userLogout();
        navigate("/");
      })
      .catch((err) => console.error(err));
  }, [userLogout, navigate]);

  return <></>;
};

export default Logout;

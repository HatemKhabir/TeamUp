/* eslint-disable react/prop-types */
import { Button, TextField, Typography } from "@mui/material";
import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


function Login({ isSignup = false }) {
  const [isLogin, setIsLogin] = useState(!isSignup);
  const location = useLocation();

  useEffect(() => {
    // Show error message if redirected from verification with error
    if (location.state?.verificationError) {
      toast.error(location.state.verificationError, {
        position: "bottom-right",
        autoClose: 3000
      });
    }
  }, [location]);
  
  return (
<div className={isLogin ? styles.auth_container_signin : styles.auth_container_signup}>
<div className={styles.auth_forms_wrapper}>
        {isLogin ? (
          <Signin setIsLogin={setIsLogin} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
}

export default Login;

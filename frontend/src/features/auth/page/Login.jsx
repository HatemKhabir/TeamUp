/* eslint-disable react/prop-types */
import { Button, TextField, Typography } from "@mui/material";
import styles from "./Login.module.css";
import { useState } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";


function Login({ isSignup = false }) {
  const [isLogin, setIsLogin] = useState(!isSignup);

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

import { Button, TextField, Typography } from "@mui/material";
import styles from "./Signup.module.css";
import { useState } from "react";

export default function Signup({ setIsLogin }) {
  return (
    <div className={styles.auth_signup_form}>
      <Typography className={styles.signup_title} variant="h4">
        SIGN UP
      </Typography>

      <TextField
        className={styles.auth_inputs}
        label="Username"
        variant="outlined"
      />
      <TextField
        className={styles.auth_inputs}
        label="Email"
        variant="outlined"
      />
      <TextField
        className={styles.auth_inputs}
        label="Password"
        variant="outlined"
      />
      <TextField
        className={styles.auth_inputs}
        label="Confirm Password"
        variant="outlined"
      />
      <Typography variant="body1" sx={{ width: "fit-content" }}>
        Already Have an Account ?{" "}
        <span
          className={styles.auth_signin}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          Sign-in
        </span>
      </Typography>
      <Button className={styles.signup_button}>SIGN UP</Button>
    </div>
  );
}

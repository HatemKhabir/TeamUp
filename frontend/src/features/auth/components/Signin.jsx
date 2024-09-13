import { Button, TextField, Typography } from "@mui/material";
import styles from "./Signin.module.css";

export default function Signin({ setIsLogin }) {
  return (
    <div className={styles.auth_login_form}>
      <Typography className={styles.auth_title} variant="h4">
        SIGN IN
      </Typography>
      <TextField
        className={styles.auth_inputs}
        label="Username or Email"
        variant="outlined"
      />
      <TextField
        className={styles.auth_inputs}
        label="Password"
        variant="outlined"
      />
      <Typography variant="body1" sx={{ width: "fit-content" }}>
        You Don't Have an account ?{" "}
        <span
          className={styles.auth_register}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          Sign-up
        </span>
      </Typography>
      <Button className={styles.auth_buttons}>SIGN IN</Button>
    </div>
  );
}

import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import styles from "./Signup.module.css"; // Ensure your styles are correct
import { signUp } from "../services/authApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup({ setIsLogin }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await signUp(email, username, password);
      toast.success("Signup Successful ! Please Login", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => setIsLogin(true),
      });
    } catch (err) {
      setError(err.response.data.msg);
    }
    setLoading(false);
  };

  return (
    <div className={styles.auth_signup_form}>
      <Typography className={styles.signup_title} variant="h4">
        SIGN UP
      </Typography>
      <TextField
        className={styles.auth_inputs}
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        className={styles.auth_inputs}
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className={styles.auth_inputs}
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        className={styles.auth_inputs}
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      )}
      <Typography variant="body1" sx={{ width: "fit-content",textAlign:'center' }}>
        Already have an account?{" "}
        <span className={styles.auth_signin} onClick={() => setIsLogin(true)}>
          Sign-in
        </span>
      </Typography>
      <Button
        className={styles.signup_button}
        onClick={handleSignUp}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "SIGN UP"}
      </Button>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

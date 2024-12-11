import { useContext, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import styles from "./Signin.module.css";
import { signInApi } from "../services/authApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../contexts/AuthProvider";
import { redirect, replace, useNavigate } from "react-router-dom";

export default function Signin({ setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await auth.signIn(email, password); 
      if (response?.error) {
        setError(response.error);
      } else{ toast.success("Login successful!", { 
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
        setTimeout(() => {
          navigate('/', { replace: true });
          window.location.reload(); 
      }, 2000)};
    } catch (err) {
      setError("Invalid email or password");
    }
    setLoading(false);
  };
  return (
    <div className={styles.auth_login_form}>
      <Typography className={styles.auth_title} variant="h4">
        SIGN IN
      </Typography>
      <TextField
        className={styles.auth_inputs}
        label="Username or Email"
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
      {error && <Typography color="error" sx={{textAlign:'center'}}>{error}</Typography>}
      <Typography variant="body1" sx={{ width: "fit-content",textAlign:'center' }}>
        Don't have an account?{" "}
        <span
          className={styles.auth_register}
          onClick={() => setIsLogin(false)}
        >
          Sign-up
        </span>
      </Typography>
      <Button
        className={styles.auth_buttons}
        onClick={handleSignIn}
        disabled={loading}
      >
        {loading ? "Signing In..." : "SIGN IN"}
      </Button>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
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

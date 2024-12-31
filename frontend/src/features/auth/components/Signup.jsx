import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import styles from "./Signup.module.css";
import { signUp } from "../services/authApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup({ setIsLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await signUp(formData.email, formData.username, formData.password);
      toast.success(
        "Registration successful! Please check your email to verify your account.", 
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed", {
        position: "bottom-right",
        autoClose: 5000,
      });
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
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        inputProps={{ minLength: 3 }}
      />
      <TextField
        className={styles.auth_inputs}
        label="Email"
        variant="outlined"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        className={styles.auth_inputs}
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        inputProps={{ minLength: 6 }}
      />
      <TextField
        className={styles.auth_inputs}
        label="Confirm Password"
        variant="outlined"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />
      
      <Typography variant="body1" sx={{ width: "fit-content", textAlign: 'center' }}>
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

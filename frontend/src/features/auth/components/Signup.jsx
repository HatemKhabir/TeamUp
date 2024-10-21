import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import styles from './Signup.module.css'; // Ensure your styles are correct
import { signUp } from '../services/authApis';

export default function Signup({ setIsLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await signUp(email, username, password);
      console.log('Signup successful:', response.data);
      // Handle successful signup (e.g., set auth token, redirect user)
    } catch (err) {
      setError('Failed to sign up');
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
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="body1" sx={{ width: 'fit-content' }}>
        Already have an account?{' '}
        <span className={styles.auth_signin} onClick={() => setIsLogin(true)}>
          Sign-in
        </span>
      </Typography>
      <Button
        className={styles.signup_button}
        onClick={handleSignUp}
        disabled={loading}
      >
        {loading ? 'Signing Up...' : 'SIGN UP'}
      </Button>
    </div>
  );
}

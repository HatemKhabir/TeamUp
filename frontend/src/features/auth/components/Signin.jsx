import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import styles from './Signin.module.css'; // Ensure your styles are correct
import { signInApi } from '../services/authApis';

export default function Signin({ setIsLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await signInApi(email, password);
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., set auth token, redirect user)
    } catch (err) {
      setError('Invalid email or password');
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
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="body1" sx={{ width: 'fit-content' }}>
        Don't have an account?{' '}
        <span className={styles.auth_register} onClick={() => setIsLogin(false)}>
          Sign-up
        </span>
      </Typography>
      <Button
        className={styles.auth_buttons}
        onClick={handleSignIn}
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'SIGN IN'}
      </Button>
    </div>
  );
}

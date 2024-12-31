import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmailApi } from '../services/authApis';
import { Box, CircularProgress, Typography } from '@mui/material';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await verifyEmailApi(token);
        // Redirect to login on success
        navigate('/auth', { replace: true });
      } catch (error) {
        // Redirect to login with error state
        navigate('/auth', { 
          replace: true,
          state: { verificationError: error.response?.data?.msg || 'Verification failed' }
        });
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <CircularProgress color="success" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Verifying your email...
      </Typography>
    </Box>
  );
};

export default EmailVerification; 
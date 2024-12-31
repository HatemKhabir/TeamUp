import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmailApi } from '../services/authApis';
import { Box, CircularProgress, Typography } from '@mui/material';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const verificationAttempted = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (verificationAttempted.current) return;
      verificationAttempted.current = true;

      try {
        const response = await verifyEmailApi(token);
        if (response?.data?.msg) {
          navigate('/auth', { 
            replace: true,
            state: { verificationSuccess: response.data.msg }
          });
        }
      } catch (error) {
        navigate('/auth', { 
          replace: false,
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
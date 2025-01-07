import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#151D20' }}>
          Privacy Policy
        </Typography>

        <Typography variant="body1" paragraph sx={{ mt: 4 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: '#4CC47C', mt: 4 }}>
          1. Information We Collect
        </Typography>
        
        <Typography variant="body1" paragraph>
          We collect information that you provide directly to us, including:
          • Personal information (name, email address)
          • Profile information (sports preferences, skill levels)
          • Game participation history
          • Chat messages and communications
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: '#4CC47C', mt: 4 }}>
          2. How We Use Your Information
        </Typography>
        
        <Typography variant="body1" paragraph>
          • To provide and maintain our Service
          • To notify you about changes to our Service
          • To allow you to participate in interactive features
          • To provide customer support
          • To monitor the usage of our Service
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: '#4CC47C', mt: 4 }}>
          3. Data Security
        </Typography>
        
        <Typography variant="body1" paragraph>
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: '#4CC47C', mt: 4 }}>
          4. Your Rights
        </Typography>
        
        <Typography variant="body1" paragraph>
          You have the right to:
          • Access your personal data
          • Correct inaccurate data
          • Request deletion of your data
          • Object to processing of your data
          • Request data portability
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: '#4CC47C', mt: 4 }}>
          5. Contact Us
        </Typography>
        
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us at:
          youssefelsharkawy@example.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;

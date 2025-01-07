import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#151D20' }}>
          About TeamUp
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ color: '#4CC47C', mt: 4 }}>
          The Developer Behind TeamUp
        </Typography>
        
        <Typography variant="body1" paragraph>
          Hello! I'm Youssef Elsharkawy, a passionate Software Engineering student and the creator of TeamUp. Currently, I work as a part-time Backend Developer at Tata Consultancy Services, where I contribute to enterprise-level solutions and continue to expand my technical expertise.
        </Typography>

        <Typography variant="body1" paragraph>
          TeamUp was born from my personal experience as a sports enthusiast, recognizing the need for a platform that connects players and simplifies the process of organizing sports matches. As both a developer and a sports lover, I wanted to create a solution that brings together technology and athletic passion.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: '#4CC47C', mt: 4 }}>
          Professional Background
        </Typography>
        
        <Typography variant="body1" paragraph>
          • Software Engineering Student with a focus on full-stack development
          • Part-time Backend Developer at Tata Consultancy Services
          • Experienced in Node.js, React, MongoDB, and real-time applications
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: '#4CC47C', mt: 4 }}>
          Vision for TeamUp
        </Typography>
        
        <Typography variant="body1" paragraph>
          My vision for TeamUp is to create a vibrant community where sports enthusiasts can easily connect, organize games, and share their passion for sports. The platform is designed to break down the barriers that often prevent people from participating in sports activities and finding like-minded players.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;

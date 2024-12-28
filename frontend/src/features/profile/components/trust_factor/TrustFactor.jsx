import { Box, Typography, LinearProgress, Button } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useState, useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { commendPlayerApi, reportPlayerApi } from "../../services/profileStats";

const TrustFactor = ({ initialTrust, profileId }) => {
  const [trust, setTrust] = useState(initialTrust);
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);
  const trustColor = trust >= 50 ? "#4CAF50" : "#f44336";
  const isPersonal = auth.userAuth?.username === profileId;

  const handleCommend = async () => {
    try {
      setTrust(prev => prev + 10);
      await commendPlayerApi(profileId);
    } catch (error) {
      setError(error.response?.data?.message || 'Error commending player');
      setTrust(prev => prev - 10);
    }
  };

  const handleReport = async () => {
    try {
      setTrust(prev => prev - 5);
      await reportPlayerApi(profileId);
    } catch (error) {
      setError(error.response?.data?.message || 'Error reporting player');
      setTrust(prev => prev + 5);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <Typography variant="h6" gutterBottom>
        Trust Factor
      </Typography>
      
      <Box sx={{ width: '100%', mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {trust}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={trust}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: trustColor,
              borderRadius: 5,
            },
          }}
        />
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1,
            color: trustColor,
            fontWeight: 'medium'
          }}
        >
          {trust >= 50 ? 'Trusted Player' : 'Needs Improvement'}
        </Typography>

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        {!isPersonal && (
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<ThumbUpIcon />}
              onClick={handleCommend}
              className="w-fit"
            >
              Commend
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<ThumbDownIcon />}
              onClick={handleReport}
              className="w-fit"
            >
              Report
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default TrustFactor;
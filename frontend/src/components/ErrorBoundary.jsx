import { Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { keyframes } from '@mui/system';
const dropDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ErrorBoundary = ({ errorMessage }) => {
  return (
    errorMessage && (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'red',
          BackgroundColor: '#ffcccb',
          border: '1px solid ',
          borderRadius: 1,
          padding: 2,
          mb: 2,
          animation: `${dropDown} 0.5s ease`,
        }}
      >
        <WarningIcon sx={{ mr: 1 }} />
        {errorMessage}
      </Box>
    )
  );
};

export default ErrorBoundary;

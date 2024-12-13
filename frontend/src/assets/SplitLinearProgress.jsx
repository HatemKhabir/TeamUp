import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

function SplitLinearProgress({ value }) {
  const adjustedValue = Math.max(0, Math.min(100, value)); // Clamp value between 0 and 100
  const positiveWidth = adjustedValue > 50 ? (adjustedValue - 50) * 2 : 0; // Positive part
  const negativeWidth = adjustedValue < 50 ? (50 - adjustedValue) * 2 : 0; // Negative part

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "10px",
        borderRadius: "5px",
        backgroundColor: "#e0e0e0", // Background of the bar
        overflow: "hidden",
      }}
    >
      {/* Negative part */}
      {negativeWidth > 0 && (
        <LinearProgress
          variant="determinate"
          value={negativeWidth}
          sx={{
            height:'100%',
            position: "absolute",
            left: 0,
            width: "50%",
            backgroundColor: "transparent",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "red",
              transformOrigin: "left",
            },
          }}
        />
      )}

      {/* Positive part */}
      {positiveWidth > 0 && (
        <LinearProgress
          variant="determinate"
          value={positiveWidth}
          sx={{
            height:'100%',
            position: "absolute",
            right: 0,
            width: "50%",
            backgroundColor: "transparent",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "green",
              transformOrigin: "right",
            },
          }}
        />
      )}
      {/* Center indicator */}
      <Typography
        sx={{
          position: "absolute",
          top: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.75rem",
          fontWeight: "bold",
          color: "gray",
        }}
      >
        0
      </Typography>
    </Box>
  );
}

export default SplitLinearProgress;
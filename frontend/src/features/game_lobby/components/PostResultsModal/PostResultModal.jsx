import React, { useState } from "react";
import { Modal, Box, Typography, Checkbox, Button, FormControlLabel } from "@mui/material";

function PostResultsModal({ open, onClose, players, onSubmit }) {
  const [selectedWinners, setSelectedWinners] = useState([]);

  const handleToggleWinner = (playerId) => {
    setSelectedWinners((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleSubmit = () => {
    const losers = players
      .filter((player) => !selectedWinners.includes(player._id)) 
      .map((player) => player._id);
    onSubmit({ winners: selectedWinners, losers });
    setSelectedWinners([]); 
    onClose(); 
  };


  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Select Winners
        </Typography>
        <Box>
          {players.map((player) => (
            <FormControlLabel
              key={player.id}
              control={
                <Checkbox
                  checked={selectedWinners.includes(player._id)}
                  onChange={() => handleToggleWinner(player._id)}
                />
              }
              label={player.username}
            />
          ))}
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between" gap='20px'>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Set Winners
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PostResultsModal;

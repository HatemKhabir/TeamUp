import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styles from "./GameCards.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { fontSize } from "@mui/system";
import JoinGameModal from "../PlayersListModal/PlayersListModal";
import { AuthContext } from "../../contexts/AuthProvider";
import { joinGameApi, leaveGameApi } from "./services/gameCards";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from "react-router-dom";
function formatDateTime(dateString) {
  if (!dateString) return ""; // Return empty string if dateString is undefined or null
  const date = new Date(dateString);
  if (isNaN(date)) return ""; // Return empty string if date is invalid  
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true 
  }).format(date);
}
  

function GameCards({ gameDetails }) {
 
  const formattedDateTime = gameDetails.date ? formatDateTime(gameDetails.date) : '';
  const [openModal, setOpenModal] = useState(false);
  const [playerJoined, setPlayerJoined] = useState(false);
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);
  const nav=useNavigate()
  useEffect(() => {
    if (!gameDetails || !gameDetails.playersList || !auth.userAuth || !auth.userAuth.id) {
      return
    }
      if (gameDetails.playersList && gameDetails.playersList.includes(auth.userAuth.id)) {
          setPlayerJoined(true);
      }
  }, [auth.userAuth, gameDetails, gameDetails.playersList]);

  async function handleGameJoin() {
    if (!auth.userAuth)
      {
        setError('Login to join a game')
        return null;
      }  
    try {
          const joinGameRequest = await joinGameApi(auth.userAuth.id, gameDetails._id);
          if (joinGameRequest.status === 200) {
              auth.updateGameDetails(joinGameRequest.data.match);
              auth.setUserGames(joinGameRequest.data.user.matchJoined);
              window.location.reload()
            }
            else if (joinGameRequest.status===201){
              console.log('game is full')
            }
      } catch (e) {
          setError(e.message);
      }
  }

  async function handleLeaveGame() {
      try {
          const leaveGameRequest = await leaveGameApi(auth.userAuth.id, gameDetails._id);
          if (leaveGameRequest.status === 200) {
              auth.updateGameDetails(leaveGameRequest.data.match);
              auth.setUserGames(leaveGameRequest.data.user.matchJoined);
              window.location.reload()          
            }
      } catch (e) {
          setError(e.message);
      }
  }

  return (
    <Box className={styles.game_card}>
      {error && <Typography color={'red'}>{error}</Typography>}
      <Box
        component="img"
        src={gameDetails.gamePicCover}
        className={styles.game_image}
        sx={{ boxShadow: 3, borderRadius: '5px' }}
      />
      <Box className={styles.game_details}>
        <Typography variant="body2" sx={{ marginBottom: '5px' }}>
          {formattedDateTime}
        </Typography>
        <Typography variant="body2" sx={{ color: 'grey' }}>
          <LocationOnIcon
            style={{ fontSize: '13px', marginRight: '5px', marginBottom: '-1px' }}
          />
          {gameDetails.location}
        </Typography>
        <Typography variant="h6">{gameDetails.gameTitle}</Typography>
        <Typography variant="body1">
          {gameDetails.playersList.length}/{gameDetails.playersNumber} Players
          Joined
        </Typography>
        <Typography variant="body2" sx={{ color: 'grey' }}>
          <AttachMoneyIcon
            style={{ fontSize: '18px', marginRight: '5px', marginBottom: '-3px' }}
          />
          {`${gameDetails.price} HUF`}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: '300' }}>
          {gameDetails.privacy.charAt(0).toUpperCase() +
            gameDetails.privacy.slice(1)}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: '300' }}>
          {gameDetails.sportType.charAt(0).toUpperCase() +
            gameDetails.sportType.slice(1)}
        </Typography>
      </Box>
      {gameDetails.status !== "finished" ? (
        !playerJoined ? (
          <Button
            className={styles.card_button}
            variant="contained"
            color="success"
            onClick={handleGameJoin}
          >
            Join
          </Button>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center',gap:'10px' }}>
            <Button
              className={styles.card_button}
              variant="contained"
              color="error"
              onClick={handleLeaveGame}
            >
              Leave
            </Button>
            <Button
              className={styles.card_button}
              variant="contained"
              onClick={() => {
                nav(`/game-chat/${gameDetails._id}`);
              }}
              color="info"
            >
              Lobby
            </Button>
          </Box>
        )
      ) : (
        <Typography
          variant="body1"
          sx={{
            color: gameDetails.winners.includes(auth.userAuth.id)?'green':'red',
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {gameDetails.winners.includes(auth.userAuth.id)?'WIN':'LOSS'}
        </Typography>
      )}
    </Box>
  );
}  

export default GameCards;

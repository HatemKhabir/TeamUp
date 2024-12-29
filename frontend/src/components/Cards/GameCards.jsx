import { Box, Button, CircularProgress, Typography, Card, CardMedia, CardContent, Chip } from "@mui/material";
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
  

function GameCards({ gameDetails, joined }) {
 
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
    <Card className={styles.game_card}>
      <CardMedia
        component="img"
        height="140"
        className={styles.game_image}
        image={gameDetails.gamePicCover}
        alt={gameDetails.sportType}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {gameDetails.eventTitle.charAt(0).toUpperCase() + gameDetails.eventTitle.slice(1)}
        </Typography>
        <Box className={styles.card_details}>
          <Typography variant="body2" sx={{ marginBottom: '5px' }}>
            {formattedDateTime}
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey' }}>
            <LocationOnIcon
              style={{ fontSize: '13px', marginRight: '5px', marginBottom: '-1px' }}
            />
            {gameDetails.location}
          </Typography>
          <Typography variant="body1">
            {gameDetails.playersList.length}/{gameDetails.playersNumber} Players
            Joined
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey' }}>
           
            {`${gameDetails.price} HUF`}
          </Typography>
          <Box className={styles.skill_levels}>
            {gameDetails.skillLevel.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                className={styles.skill_chip}
                sx={{
                  backgroundColor: '#4CC47C20',
                  color: '#4CC47C',
                  border: '1px solid #4CC47C',
                  margin: '2px',
                  fontSize: '0.7rem'
                }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
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
          <Box sx={{ display: 'flex', justifyContent: 'center',gap:'5px' }}>
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
            marginTop: "5px",
          }}
        >
          {gameDetails.winners.includes(auth.userAuth.id)?'WIN':'LOSS'}
        </Typography>
      )}
    </Card>
  );
}  

export default GameCards;

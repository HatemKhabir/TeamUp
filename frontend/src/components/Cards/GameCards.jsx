import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./GameCards.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { fontSize } from "@mui/system";
import JoinGameModal from "../PlayersListModal/PlayersListModal";

function formatDateTime(dateString, timeString) {
    const date = new Date(dateString + ' ' + timeString); // Combine date and time
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric', 
      month: 'short', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true // This ensures AM/PM format
    }).format(date);
  }

function GameCards({ gameDetails,joined }) {
    const formattedDateTime = formatDateTime(gameDetails.date, gameDetails.time);
    const [openModal,setOpenModal]=useState(false)


  return (
    <Box className={styles.game_card}>
      <Box component="img" src={gameDetails.locationImg} className={styles.game_image} sx={{boxShadow:3,borderRadius:'5px'}}/>
      <Box className={styles.game_details}>
      <Typography variant="body2" sx={{marginBottom:'5px'}} >
        {formattedDateTime}
      </Typography>
      <Typography  variant="body2" sx={{color:'grey'}}>
        <LocationOnIcon style={{fontSize:'13px',marginRight:'5px',marginBottom:'-1px'}} />
        {gameDetails.location}
      </Typography>
      <Typography  variant="h6" >{gameDetails.gameTitle}</Typography>
      <Typography  variant="body1" sx={{cursor:'pointer',textDecorationLine:'underline'}} onClick={()=>{setOpenModal(!openModal)}}>
        {gameDetails.playersNumber}/{gameDetails.totalPlayers} Players Joined
      </Typography>
      <Typography  variant='subtitle2' sx={{fontWeight:'300'}} >{gameDetails.gamePrivacy}</Typography>
      </Box>
      {joined ?  <Button  className={styles.card_button} variant="contained" color="success">Join</Button>
    :<Box sx={{display:'flex',justifyContent:'flex-end'}}>
      <Button className={styles.card_button} variant="contained" color="error">Leave</Button>
    <Button className={styles.card_button} variant="contained" color="info">Lobby</Button>
    </Box> }
    {openModal&&<JoinGameModal openModal={openModal}/>}
    </Box>
  );
}

export default GameCards;

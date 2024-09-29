import { Box, Button, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from './GameDetails.module.css';

function formatDateTime(dateString, timeString) {
  const date = new Date(dateString + ' ' + timeString); // Combine date and time
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // This ensures AM/PM format
  }).format(date);
}

function GameDetails({ gameDetails }) {
  const playersList = [
    {
      img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
      name: "Hatem",
    },
    {
      img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
      name: "Majid",
    },
    {
      img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
      name: "Ali",
    },
    {
      img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
      name: "Jason",
    },
    {
      img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
      name: "Hatem",
    },
    {
      img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
      name: "Abdullah",
    },
    {
      img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
      name: "Hamid",
    },
  ];

  const imgUrl = "https://th.bing.com/th/id/OIP.86i94hoTxqjQF97o6Cj8vQHaE_?rs=1&pid=ImgDetMain";
  const formattedDateTime = formatDateTime(gameDetails.date, gameDetails.time);

  return (
    <Box className={styles.game_details_box}>
      <Box component="img" src={imgUrl} className={styles.game_details_img} />
      <Box>
        <Box className={styles.game_details}>
          <Typography variant="body2" className={styles.game_details_datetime}>
            {formattedDateTime}
          </Typography>
          <Typography variant="body2" className={styles.game_details_location}>
            <LocationOnIcon style={{ fontSize: "13px", marginRight: "5px", marginBottom: "-2px" }} />
            {gameDetails.location}
          </Typography>
          <Typography variant="h6" className={styles.game_details_title}>
            {gameDetails.gameTitle}
          </Typography>
          <Typography variant="body1" className={styles.game_details_players}>
            {gameDetails.playersNumber}/{gameDetails.totalPlayers} Players Joined
          </Typography>
          {playersList && (
            <Box className={styles.players_list}>
              {playersList.map((player, index) => (
                <Box key={index} className={styles.player_box}>
                  <Box component="img" src={player.img} className={styles.player_img} />
                  <Typography variant="body2">{player.name}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
        <Box className={styles.card_button_container}>
          <Button className={styles.card_button} variant="contained" color="error">
            Leave
          </Button>
        </Box>
    </Box>
  );
}

export default GameDetails;

import { Box, Button, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from './GameDetails.module.css';
import { useContext, useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { getGameDetailsbyId, postWinnersAndLosersApi } from "../../services/gameLobby";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { leaveGameApi } from "../../../../components/Cards/services/gameCards";
import PostResultsModal from "../PostResultsModal/PostResultModal";
import { ToastContainer, toast } from "react-toastify";

function formatDateTime(isoDateString) {
  const date = new Date(isoDateString); 
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // AM/PM format
  }).format(date);
}

function GameDetails({gameObject}) {
  const [isHost,setIsHost]=useState(false);
  const auth=useContext(AuthContext)
  const [error,setError]=useState('')
  const nav=useNavigate()
  const [modalOpen, setModalOpen] = useState(false); 
  
  useEffect(() => {
    if (gameObject && auth.userAuth.username === gameObject.hostUsername) {
      setIsHost(true);
    }
 
  }, [gameObject, auth.userAuth.username]);
  
  async function handleLeaveGame() {
    try {
        const leaveGameRequest = await leaveGameApi(auth.userAuth.id, gameObject._id);
        if (leaveGameRequest.status === 200) {
            auth.updateGameDetails(leaveGameRequest.data.match);
            auth.setUserGames(leaveGameRequest.data.user.matchJoined);
            nav('/',replace)         
          }
    } catch (e) {
        setError(e.message);
    }
}

const handlePostResults = async ({ winners, losers }) => {
  try {
    const response = await postWinnersAndLosersApi(gameObject._id, winners, losers);

    if (response.status != 200) {
      toast.error(response, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setTimeout(()=>{
        nav('/',replace)
      },3000)
    } else if (response.status === 200) {
      toast.success("Match results updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setTimeout(()=>{
        nav('/',replace)
      },3000)
      console.log("Updated match details:", response.data);
    }
  } catch (e) {
    console.error("Error posting results:", e.message);
    setError(e.message);
    toast.error(`An error occurred: ${e.message}`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }
};

  return (
    <Box className={styles.game_details_box}>
      {error&& <Typography>{error}</Typography>}
      <Box>
      <Box component="img" src={gameObject.gamePicCover} className={styles.game_details_img} />
        <Box className={styles.game_details}>
          <Typography variant="body2" className={styles.game_details_datetime}>
            {formatDateTime(gameObject.date)}
          </Typography>
          <Typography variant="body2" className={styles.game_details_location}>
            <LocationOnIcon style={{ fontSize: "13px", marginRight: "5px", marginBottom: "-2px" }} />
            {gameObject.location}
          </Typography>
          <Typography variant="h6" className={styles.game_details_title}>
            {gameObject.eventTitle}
          </Typography>
          <Typography variant="body1" className={styles.game_details_players}>
            {gameObject.playersList.length}/{gameObject.playersNumber} Players Joined
          </Typography>
          {gameObject.playersList && (
            <Box className={styles.players_list}>
              {gameObject.playersList.map((player, index) => (
                <Box key={index} className={styles.player_box}>
                  <Box component="img" src={player.profilePicture} className={styles.player_img} />
                  <Typography variant="body2">{player.username}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Box className={styles.card_button_container}>
        {isHost&&<Button className={styles.card_button} variant='outlined' color='primary'  onClick={() => setModalOpen(true)} >
         Post Results
        </Button>}
        <Button className={styles.card_button} variant="contained" color="error" onClick={handleLeaveGame}> 
          Leave
        </Button>
      </Box>
      <PostResultsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        players={gameObject.playersList}
        onSubmit={handlePostResults}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}

export default GameDetails;

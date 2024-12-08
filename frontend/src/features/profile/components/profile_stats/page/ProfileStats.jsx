import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import styles from "./ProfileStats.module.css";
import PlayersListModal from "../../../../../components/PlayersListModal/PlayersListModal";
import { Button, Tooltip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { AuthContext } from "../../../../../contexts/AuthProvider";

function ProfileStats({profileId,playerData}) {
  const [selectedSport, setSelectedSport] = useState('volleyball');
  const handleChange = (event) => {
    setSelectedSport(event.target.value);
  };
  const [isPersonal, setIsPersonal] = useState(false);
  const auth = useContext(AuthContext);


  useEffect(() => {
    if (auth.userAuth && auth.userAuth.username === profileId) {
      setIsPersonal(true);
    }
    
  }, [auth.userAuth, playerData, profileId]);

  return (
    <Box className={styles.profile_stats}>
      <Box sx={{width:'fit-content',marginLeft:'10px'}}>
       <select name="selectedSport" className={styles.select_menu} onChange={handleChange}>
          <option value="volleyball">Volleyball</option>
          <option value="football">Football</option>
          <option value="tennis">Tennis</option>
          <option value="padel">Padel</option>
          <option value="basketball">Basketball</option>
          <option value="tabletennis">Table Tennis</option>
        </select>
        </Box>
        <Box className={styles.stats_boxs}>
      <Box className={styles.profile_main_stats}>
        <Typography variant="h6" sx={{ alignSelf: "flex-start" }}>
          Main Staistics
        </Typography>
        <Box className={styles.profile_stats_numbers}>
          <Box>
            <Typography variant="body2">Matches</Typography>
            <Typography variant="body2"> {playerData?.profileData?.record[selectedSport]
          ? playerData.profileData.record[selectedSport].wins + playerData.profileData.record[selectedSport].losses
          : 0}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Wins</Typography>
            <Typography variant="body2"> {
        playerData?.profileData?.record[selectedSport]
          ? playerData.profileData.record[selectedSport].wins
          : 0
      }</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Losses</Typography>
            <Typography variant="body2"> {
        playerData?.profileData?.record[selectedSport]
          ? playerData.profileData.record[selectedSport].losses
          : 0
      }</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
  <Typography variant="body2">Trust Factor</Typography>
  <LinearProgress
    variant="determinate"
    value={playerData?.profileData ? playerData.profileData.trustFactor : 0}
    color="success"
    sx={{
      "& .MuiLinearProgress-root": {
        backgroundColor: "rgb(255, 255, 177) !important",
        height: "50px",
      },
    }}
  />
  {!isPersonal &&
  <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <Button
        variant="contained"
        color="success"
        startIcon={<ThumbUpIcon />}
        sx={{
          minWidth: "fit-content",
          padding: "5px 10px",
        }}
        onClick={() => {
          // Handle commend logic here
          console.log("Commend button clicked");
        }}
      >
 
        Commend
      </Button>
      <Button
        variant="outlined"
        color="error"
        startIcon={<ThumbDownIcon />}
        sx={{
          minWidth: "fit-content",
          padding: "5px 10px",
        }}
        onClick={() => {
          // Handle report logic here
          console.log("Report button clicked");
        }}
      >
        Report
      </Button>
  </Box>
}
</Box>
        </Box>
      </Box>
      <Box  className={styles.profile_side_informations}>
      <Typography variant="h6" sx={{ alignSelf: "flex-start" }}>
         Friends List
        </Typography>
        {playerData?.profileData?.friendsList && playerData?.profileData?.friendsList.map((player,index)=>(
          <Box key={index} className={styles.player_modal_info}>
            <Box component='img' src={player.profilePicture} className={styles.player_modal_img}/>
            <Typography variant='subtitle1' sx={{padding:'5px'}} className={styles.player_modal_name}>{player.username}</Typography>
        </Box>))}
      </Box>
      </Box>
    </Box>
  );
}

export default ProfileStats;
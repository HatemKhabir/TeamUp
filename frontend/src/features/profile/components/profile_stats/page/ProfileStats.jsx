import React, { startTransition, useContext, useEffect, useState } from "react";
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
import { commendPlayerApi, reportPlayerApi } from "../../../services/profileStats";
import { useOptimistic } from "react";
import SplitLinearProgress from "../../../../../assets/SplitLinearProgress";

function ProfileStats({profileId,playerData}) {
  const [selectedSport, setSelectedSport] = useState('volleyball');
  const handleChange = (event) => {
    setSelectedSport(event.target.value);
  };
  const [error,setError]=useState('')
  const [isPersonal, setIsPersonal] = useState(false);
  const auth = useContext(AuthContext);
  const [trustFactor, setTrustFactor] = useState(playerData.trustFactor);

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
            <Typography variant="body2"> {playerData?.record[selectedSport]
          ? playerData.record[selectedSport].wins + playerData.record[selectedSport].losses
          : 0}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Wins</Typography>
            <Typography variant="body2"> {
        playerData?.record[selectedSport]
          ? playerData.record[selectedSport].wins
          : 0
      }</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Losses</Typography>
            <Typography variant="body2"> {
        playerData?.record[selectedSport]
          ? playerData.record[selectedSport].losses
          : 0
      }</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
  {error&&<Typography color={'red'}>{error}</Typography>}
  <Typography variant="body2">Trust Factor</Typography>
  <SplitLinearProgress
    value={trustFactor ?? 0}     
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
          setTrustFactor((prev) => prev + 10);
          commendPlayerApi(profileId)
            .then((response) => {
              console.log(response.message);
            })
            .catch((error) => {
              console.log(error.response);
              setError(error.response.data.message)
              setTrustFactor((prev) => prev - 10);
            });
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
          setTrustFactor((prev) => prev -1 );
          reportPlayerApi(profileId)
    .then((response) => {
      console.log(response.message);
    })
    .catch((error) => {
      console.error(error);
      setError(error.response.data.message)

      setTrustFactor((prev) => prev + 1);
          });
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
        {playerData?.friendsList && playerData?.friendsList.map((player,index)=>(
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
import { Box } from "@mui/material";

import styles from './PlayerProfile.module.css'
import { useNavigate, useParams } from "react-router-dom";
import ProfileDetails from "../components/profile_details/page/ProfileDetails";
import ProfileStats from "../components/profile_stats/page/ProfileStats";
import { useEffect, useState } from "react";
import { getPlayerStats } from "../services/profileStats";

function PlayerProfile() {
  const { playerId } = useParams();
  const [playerData,setPlayerData]=useState('')
  const navigate=useNavigate()

  useEffect(() => {
    if (!playerId) {
     
      navigate('/'); 
    }

    async function getPlayerData() {
      try {
        const playerDataResponse = await getPlayerStats(playerId);
        if (playerDataResponse) {
          setPlayerData(playerDataResponse);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (playerId) {
      getPlayerData();
    }
  }, [playerId, navigate]);
  return (
    <Box className={styles.player_profile}>
      <ProfileDetails playerData={playerData} profileId={playerId}/>
      <ProfileStats playerData={playerData} profileId={playerId}/>
    </Box>
  );
}

export default PlayerProfile;
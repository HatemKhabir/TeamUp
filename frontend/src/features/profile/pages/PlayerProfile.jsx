import { Box, Typography } from "@mui/material";

import styles from './PlayerProfile.module.css'
import { useNavigate, useParams } from "react-router-dom";
import ProfileDetails from "../components/profile_details/page/ProfileDetails";
import ProfileStats from "../components/profile_stats/page/ProfileStats";
import { useEffect, useState } from "react";
import { getPlayerStats } from "../services/profileStats";
import MatchHistory from "../components/matches_history/MatchHistory";

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
        console.log(playerDataResponse )

        if (playerDataResponse) {
          setPlayerData(playerDataResponse.responseData.profileData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (playerId) {
      console.log('here')
      getPlayerData();
    }
  }, [playerId, navigate]);
  if (!playerData) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h6">Loading player data...</Typography>
      </Box>
    );
  }
  return (
    <Box className={styles.player_profile}>
      <ProfileDetails playerData={playerData} profileId={playerId}/>
      <ProfileStats playerData={playerData} profileId={playerId}/>
      <Typography variant="h6" sx={{textAlign:'center' }}>
          Match History
        </Typography>    
    <MatchHistory/>
    </Box>
  );
}

export default PlayerProfile;
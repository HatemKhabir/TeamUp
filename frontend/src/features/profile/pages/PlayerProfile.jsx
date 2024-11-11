import { Box } from "@mui/material";
import ProfileDetails from "../components/profile_details/ProfileDetails";
import ProfileStats from "../components/profile_stats/ProfileStats";
import styles from './PlayerProfile.module.css'

function PlayerProfile() {
  
  return (
    <Box className={styles.player_profile}>
      <ProfileDetails/>
      <ProfileStats/>
    </Box>
  );
}

export default PlayerProfile;

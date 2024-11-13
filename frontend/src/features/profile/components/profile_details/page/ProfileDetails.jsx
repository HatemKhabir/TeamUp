import styles from "./ProfileDetails.module.css";
import padelLogo from "../../../../../assets/padelLogo.png";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Typography } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import MessageIcon from "@mui/icons-material/Message";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { countryCodeMap } from "../../../../../../constants/countryCode";

function ProfileDetails({profileId,playerData }) {
    const backgroundImage =
    "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg";
  const [isFriend, setIsFriend] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPersonal, setIsPersonal] = useState(false);
  
  // Check if this profile belongs to the logged-in user
  useEffect(() => {
    if (auth.userAuth && auth.userAuth.username === profileId) {
      setIsPersonal(true);
    }
    console.log('dip',playerData.profileData)
  }, [auth.userAuth, playerData, profileId]);
  return (
    <Box className={styles.profile_details}>
      <Box
        component="img"
        src={playerData?.profileData?.profilePic}
        className={styles.player_profile_cover}
      />
      <Box className={styles.player_profile_image}>
        <Box
          component="img"
          src={playerData?.profileData?.coverPic}
          className={styles.player_profile_pic}
        />
        <Box className={styles.player_profile_buttons}>
          <Box className={styles.player_profile_details}>
            <Typography variant="h6">
            {playerData?.profileData?.username || 'Username not available'}
            <span className={styles.player_profile_country}>
            {playerData?.profileData?.country && countryCodeMap[playerData.profileData.country] && (
              <ReactCountryFlag svg countryCode={countryCodeMap[playerData.profileData.country]} />
            )}</span>
            </Typography>
            <Typography variant="caption" sx={{ textAlign: "left" }}>
            {playerData?.profileData?.bio || 'No bio available'}
            </Typography>
            <br />
            <Typography variant="caption">          {playerData?.profileData?.joinDate || 'Joining date not available'}
            </Typography>
          </Box>
          <Box sx={{ width: "fit-content", display: "flex" }}>
            {!isPersonal? !isFriend ? (
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                color="success"
                onClick={() => {
                  setIsFriend(true);
                }}
                sx={{ width: "fit-content", textWrap: "nowrap" }}
              >
                Add Friend
              </Button>
            ) : (
              <Box sx={{ width: "fit-content", display: "flex", gap: "10px",flexWrap:'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<PersonRemoveIcon />}
                  color="error"
                  onClick={() => {
                    setIsFriend(false);
                  }}
                  sx={{ width: "fit-content", textWrap: "nowrap" }}
                >
                  Remove Friend
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MessageIcon />}
                  color="primary"
                  sx={{ width: "fit-content", textWrap: "nowrap" }}
                >
                  Send Message
                </Button>
              </Box>
            ):<Button 
            variant="outlined"
            startIcon={<EditIcon />}
            color="primary"
            sx={{ width: "fit-content", textWrap: "nowrap" }}
          >
            Edit Profile
              </Button>}
          </Box>
        </Box>
      </Box>
      </Box>
  )
}

export default ProfileDetails
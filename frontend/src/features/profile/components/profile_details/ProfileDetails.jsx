import styles from "./ProfileDetails.module.css";
import padelLogo from "../../../../assets/padelLogo.png";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Typography } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import MessageIcon from "@mui/icons-material/Message";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
function ProfileDetails() {
    const backgroundImage =
    "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg";
  const [isFriend, setIsFriend] = useState(true);
  const [isPersonal,setIsPersonal]=useState(false);

  return (
    <Box className={styles.profile_details}>
      <Box
        component="img"
        src={backgroundImage}
        className={styles.player_profile_cover}
      />
      <Box className={styles.player_profile_image}>
        <Box
          component="img"
          src={padelLogo}
          className={styles.player_profile_pic}
        />
        <Box className={styles.player_profile_buttons}>
          <Box className={styles.player_profile_details}>
            <Typography variant="h6">
              Username
              <span className={styles.player_profile_country}>
                <ReactCountryFlag svg countryCode="US" />
              </span>
            </Typography>
            <Typography variant="caption" sx={{ textAlign: "left" }}>
              One Line Bio
            </Typography>
            <br />
            <Typography variant="caption">Joining Date</Typography>
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
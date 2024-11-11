import React, { useState } from "react";
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

function ProfileStats() {
  const [selectedSport, setSelectedSport] = useState("");
  const handleChange = (event) => {
    setSelectedSport(event.target.value);
  };
  return (
    <Box className={styles.profile_stats}>
      <Box sx={{width:'fit-content',marginLeft:'10px'}}>
       <select name="selectedSport" className={styles.select_menu}>
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
            <Typography variant="body2">500</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Wins</Typography>
            <Typography variant="body2">300</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Losses</Typography>
            <Typography variant="body2">300</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="body2">Trust Factor</Typography>
            <LinearProgress
              variant="determinate"
              value={50}
              color="success"
              sx={{
                "& .MuiLinearProgress-root": {
                  backgroundColor: "rgb(255, 255, 177) !important",
                  height: "50px",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box  className={styles.profile_side_informations}>
      <Typography variant="h6" sx={{ alignSelf: "flex-start" }}>
         Friends List
        </Typography>
      </Box>
      </Box>
    </Box>
  );
}

export default ProfileStats;

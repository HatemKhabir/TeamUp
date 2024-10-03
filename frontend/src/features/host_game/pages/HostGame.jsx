import React, { useState } from "react";
import CommonHeader from "../../../components/Header/CommonHeader";
import styles from "./HostGame.module.css";
import footballHost from "../../../assets/footballHost.png";
import volleyballHost from "../../../assets/volleyballHost.png";
import tennistHost from "../../../assets/tennistHost.png";
import BasketballHost from "../../../assets/BasketballHost.png";
import tableTennishost from "../../../assets/tableTennishost.png";
import padelHost from "../../../assets/padelHost.png";
import AddIcon from "@mui/icons-material/Add"; // Import the Plus Icon

import {
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  IconButton,
  InputAdornment,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function HostGame() {
  const [selectedSportId, setSelectedSportId] = useState(null);
  const [gameTitle, setGameTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
  const [image, setImage] = useState(null);
  const [playerCount,setPlayerCount]=useState(0)
  const [gameFee,setGameFee]=useState(0)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // For previewing the image
    }
  };
  const sports = [
    { id: 1, sportName: "Football", sportPicture: footballHost },
    { id: 2, sportName: "Volleyball", sportPicture: volleyballHost },
    { id: 3, sportName: "Table Tennis", sportPicture: tableTennishost },
    { id: 4, sportName: "Tennis", sportPicture: tennistHost },
    { id: 5, sportName: "Basketball", sportPicture: BasketballHost },
    { id: 6, sportName: "Padel", sportPicture: padelHost },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create a local URL to preview the image
    }
  };
  const handleBoxClick = (id) => {
    setSelectedSportId(id);
  };
  return (
    <Box className={styles.host_game_page}>
      <header>
        <CommonHeader />
      </header>
      <main className={styles.host_game_main}>
        <Box className={styles.host_game_sports}>
          {sports &&
            sports.map((sport, index) => (
              <Box
                key={sport.id}
                onClick={() => {
                  handleBoxClick(sport.id);
                }}
                className={styles.host_game_sport_box}
                sx={{
                  backgroundImage: `url(${sport.sportPicture})`, // Use template literal for the URL
                  backgroundColor: "lightgray",
                  backgroundSize: "auto",
                  backgroundPosition: "40%",
                  border:
                    selectedSportId === sport.id ? "3px solid #4CAF50" : "none",
                }}
              >
                <Typography className={styles.host_game_sport_title}>
                  {sport.sportName}
                </Typography>
              </Box>
            ))}
        </Box>

        <Box className={styles.host_game_info}>
          <Box className={styles.host_game_info1}>
            <Typography className={styles.host_game_info_title}>
              Game Details
            </Typography>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <TextField
                label="Game Title"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                variant="outlined"
                placeholder="Game Title"
                InputLabelProps={{
                  shrink: true,
                  color: "success", // Keep the label fixed in the shrunk position
                }}
                sx={{
                  textAlign: "left",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50", // Change border color on focus
                    },
                  },
                }}
              />
              <TextField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="outlined"
                sx={{
                  textAlign: "left",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50", // Change border color on focus
                    },
                  },
                }}
                placeholder="Game Location"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "fit-content", margin: "5px" }}
                      position="end"
                    >
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  color: "success",
                }}
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                label="Game Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                placeholder="You can specify any personal game rules , arrival time , what to wear etc..."
                rows={4}
                InputLabelProps={{
                  shrink: true,
                  color: "success",
                }}
                sx={{
                  textAlign: "left",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50", // Change border color on focus
                    },
                  },
                }}
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box className={styles.host_game_info_privacy}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Privacy
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="public"
                    sx={{ width: "fit-content","& .MuiFormControlLabel-label": { fontSize: "14px" }, }}
                    control={
                      <Radio  color="success" />
                    }
                    label="Public"
                  />
                  <FormControlLabel
                    value="private"
                    sx={{ width: "fit-content","& .MuiFormControlLabel-label": { fontSize: "14px" }, }}
                    control={
                      <Radio  color="success" />
                    }
                    label="Private"
                  />
                </RadioGroup>
              </Box>
              <Box
                sx={{
                  border: "2px dashed lightgrey",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px", // Set a height for the upload box
                  marginTop: "16px", // Space between the radio group and upload box
                  cursor: "pointer",
                  backgroundImage: selectedImage
                    ? `url(${selectedImage})`
                    : "none", // Display the uploaded image
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  "&:hover": {
                    borderColor: "blue", // Change border color on hover
                  },
                }}
                onClick={() => document.getElementById("image-upload").click()} // Click to open file dialog
              >
                <input
                  id="image-upload"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange} // Handle file change
                />
                {!selectedImage && ( // Display the upload icon and text only if no image is selected
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <AddIcon sx={{ marginRight: "8px" }} /> Upload Game
                    Thumbnail
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <Box className={styles.host_game_info1}>
            <Typography className={styles.host_game_info_title}>
              Players Details
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "50px",
                justifyContent: "flex-start",
              }}
            >
              <TextField
                label="Players Limit"
                value={playerCount}
                onChange={(e) => setPlayerCount(e.target.value)}
                variant="outlined"
                placeholder="Number of Players"
                type="number"
                InputLabelProps={{
                  shrink: true,
                  color: "success", // Keep the label fixed in the shrunk position
                }}
                sx={{
                  textAlign: "left",
                  width: "fit-content",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50", // Change border color on focus
                    },
                  },
                }}
              />
              <TextField
                label="Game Fee"
                value={gameFee}
                onChange={(e) => setGameFee(e.target.value)}
                variant="outlined"
                sx={{
                  textAlign: "left",
                  width: "fit-content",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50", // Change border color on focus
                    },
                  },
                }}
                placeholder="Leave Empty if Free"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{
                        width: "fit-content",
                        marginRight: "10px",
                        marginLeft: "-5px",
                        marginTop: "2px",
                      }}
                      position="end"
                    >
                      HUF
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  color: "success",
                }}
              />
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Skill Level
              </FormLabel>
              <Box className={styles.host_game_skill_checkbox}>
                <FormGroup row>
                  <FormControlLabel
                    sx={{
                      width: "fit-content",
                      "& .MuiFormControlLabel-label": { fontSize: "14px" },
                    }}
                    control={
                      <Checkbox defaultChecked size="small" color="success" />
                    }
                    label="Beginners"
                  />
                  <FormControlLabel
                    sx={{
                      width: "fit-content",
                      "& .MuiFormControlLabel-label": { fontSize: "14px" },
                    }}
                    control={<Checkbox defaultChecked size="small" color="success" />}
                    label="Average"
                  />
                  <FormControlLabel
                    sx={{
                      width: "fit-content",
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        textWrap: "nowrap",
                      },
                    }}
                    control={<Checkbox defaultChecked size="small" color="success" />}
                    label="Semi-Pro"
                  />
                  <FormControlLabel
                    sx={{
                      width: "fit-content",
                      "& .MuiFormControlLabel-label": { fontSize: "14px" },
                    }}
                    control={<Checkbox defaultChecked size="small" color="success" />}
                    label="Professional"
                  />
                </FormGroup>
              </Box>
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <FormLabel id="gender-radio-group-label">Gender</FormLabel>
              <Box className={styles.host_game_gender_radio}>
                <RadioGroup row>
                  {" "}
                  {/* Radio buttons aligned horizontally */}
                  <FormControlLabel
                    sx={{
                      width: "fit-content",
                      "& .MuiFormControlLabel-label": { fontSize: "14px" },
                    }}
                    control={<Radio size="small" color="success" />}
                    label="Male"
                    value="male"
                  />
                  <FormControlLabel
                    sx={{
                      width: "fit-content",
                      "& .MuiFormControlLabel-label": { fontSize: "14px" },
                    }}
                    control={<Radio size="small" color="success" />}
                    label="Female"
                    value="female"
                  />
                  <FormControlLabel
                    sx={{
                      width: "fit-content",
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                      },
                    }}
                    control={<Radio size="small" color="success" />}
                    label="Mixed"
                    value="mixed"
                  />
                </RadioGroup>
              </Box>
            </Box>
            <Button className={styles.host_game_button}>Host Game</Button>
          </Box>
        </Box>
      </main>
    </Box>
  );
}

export default HostGame;

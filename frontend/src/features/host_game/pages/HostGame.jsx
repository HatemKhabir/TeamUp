import React, { useContext, useEffect, useState } from "react";
import CommonHeader from "../../../components/Header/CommonHeader";
import styles from "./HostGame.module.css";
import footballHost from "../../../assets/footballHost.png";
import volleyballHost from "../../../assets/volleyballHost.png";
import tennistHost from "../../../assets/tennistHost.png";
import BasketballHost from "../../../assets/BasketballHost.png";
import tableTennishost from "../../../assets/tableTennishost.png";
import padelHost from "../../../assets/padelHost.png";

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
import { AuthContext } from "../../../contexts/AuthProvider";
import { hostGame } from "../services/hostGame";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen/index";
import axiosInstance from "../../../../libs/axios";

function HostGame() {
  const [selectedSportId, setSelectedSportId] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [playerCount, setPlayerCount] = useState(0);
  const [gameFee, setGameFee] = useState(0);
  const navigate = useNavigate();
  const [gameDate, setGameDate] = useState("");
  const [gender, setGender] = useState(null);
  const [skillLevels, setSkillLevels] = useState([]);
  const [errors, setErrors] = useState({}); // Object to track errors for each field
  const [submission, setSumbission] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const auth = useContext(AuthContext);
  const cld = new Cloudinary({ cloud: { cloudName: 'de26qjxpf' } });

  const sports = [
    {
      id: 1,
      sportName: "Football",
      sportPicture: footballHost,
      databaseName: "football",
    },
    {
      id: 2,
      sportName: "Volleyball",
      sportPicture: volleyballHost,
      databaseName: "volleyball",
    },
    {
      id: 3,
      sportName: "Table Tennis",
      sportPicture: tableTennishost,
      databaseName: "tabletennis",
    },
    {
      id: 4,
      sportName: "Tennis",
      sportPicture: tennistHost,
      databaseName: "tennis",
    },
    {
      id: 5,
      sportName: "Basketball",
      sportPicture: BasketballHost,
      databaseName: "basketball",
    },
    {
      id: 6,
      sportName: "Padel",
      sportPicture: padelHost,
      databaseName: "padel",
    },
  ];

  const handleBoxClick = (databaseName) => {
    setSelectedSportId(databaseName);
  };

  const handleSkillLevelChange = (event) => {
    const skill = event.target.name;
    setSkillLevels((prev) =>
      event.target.checked
        ? [...prev, skill]
        : prev.filter((level) => level != skill)
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (selectedSportId == null)
      newErrors.sportType = "Please Specifiy which sport ! ";

    if (!eventTitle.trim()) newErrors.eventTitle = "Game title is required.";
    if (!location.trim()) newErrors.location = "Location is required.";
    if (!gameDate) newErrors.gameDate = "Date and time are required.";
    if (!description.trim())
      newErrors.description = "Game description is required.";
    if (!playerCount || isNaN(playerCount) || playerCount <= 0)
      newErrors.playerCount = "Please enter a valid number of players.";
    if (gameFee && (isNaN(gameFee) || gameFee < 0))
      newErrors.gameFee = "Please enter a valid fee.";
    if (!gender) newErrors.gender = "Please select a gender.";
    if (skillLevels.length === 0)
      newErrors.skillLevels = "Please select at least one skill level.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    let uploadedImageUrl = null;
      if (image) {
        const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'TeamUp');
  try{
    const response = await axiosInstance.post(
      'https://api.cloudinary.com/v1_1/de26qjxpf/image/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const data = response.data;
        uploadedImageUrl = data.secure_url; // Retrieve the uploaded image URL
      }catch(e){
        console.log(e)
      }
    if (validateForm()) {
      const gameDetails = {
        eventTitle: eventTitle,
        sportType: selectedSportId,
        hostUsername: auth.userAuth.username,
        eventDescription: description,
        price: gameFee,
        location: location,
        playersNumber: playerCount,
        date: gameDate,
        skillLevel: skillLevels,
        gender: gender,
        privacy: privacy,
        gamePicCover:uploadedImageUrl || null 
      };
      try {
        const response = await hostGame(gameDetails);
        console.log(response);
        toast.success(`Match Created ! `, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.log(error);
        toast.error(`Submission Failed ${error.message}`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } else {
      console.log("Form is invalid, not submitting.");
    }
  }
  };

  return (
    <Box className={styles.host_game_page}>
      <header>
        <CommonHeader />
      </header>
      <main className={styles.host_game_main}>
        <Box className={styles.host_game_sports}>
          {errors.sportType && (
            <Typography color="error" sx={{ textAlign: "center" }}>
              {errors.sportType}
            </Typography>
          )}

          {sports &&
            sports.map((sport, index) => (
              <Box
                key={sport.sportName}
                onClick={() => {
                  handleBoxClick(sport.databaseName);
                }}
                className={styles.host_game_sport_box}
                sx={{
                  backgroundImage: `url(${sport.sportPicture})`, // Use template literal for the URL
                  backgroundColor: "lightgray",
                  backgroundSize: "auto",
                  backgroundPosition: "40%",
                  border:
                    selectedSportId === sport.databaseName
                      ? "4px solid #4CAF50"
                      : "none",
                }}
              >
                <Typography className={styles.host_game_sport_title}>
                  {sport.sportName}
                </Typography>
              </Box>
            ))}
        </Box>
        {/*First Half Box*/}
        <Box className={styles.host_game_info}>
          <Box className={styles.host_game_info1}>
            <Typography className={styles.host_game_info_title}>
              Game Details
            </Typography>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <TextField
                label="Game Title"
                error={errors.eventTitle}
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                variant="outlined"
                required
                placeholder="Game Title"
                helperText={errors.eventTitle}
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
                error={!!errors.location}
                helperText={errors.location}
                sx={{
                  textAlign: "left",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50", // Change border color on focus
                    },
                  },
                }}
                placeholder="Game Location"
                required
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
                required
                error={!!errors.description}
                helperText={errors.description}
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
                  onChange={(e) => setPrivacy(e.target.value)}
                >
                  <FormControlLabel
                    value="public"
                    sx={{
                      width: "fit-content",
                      "& .MuiFormControlLabel-label": { fontSize: "14px" },
                    }}
                    control={<Radio color="success" />}
                    label="Public"
                  />
                  <FormControlLabel
                    value="private"
                    sx={{
                      width: "fit-content",
                      "& .MuiFormControlLabel-label": { fontSize: "14px" },
                    }}
                    control={<Radio color="success" />}
                    label="Private"
                  />
                </RadioGroup>
                {errors.privacy && (
                  <Typography color="error">{errors.privacy}</Typography>
                )}
              </Box>
              <Box>
                <input
                  type="datetime-local"
                  id="date_picker"
                  value={gameDate}
                  onChange={(newValue) => setGameDate(newValue.target.value)}
                />
                {errors.gameDate && (
                  <Typography color="error">{errors.gameDate}</Typography>
                )}
              </Box>
            </Box>
          </Box>
          {/*Second Half Box*/}
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
                required
                value={playerCount}
                onChange={(e) => setPlayerCount(e.target.value)}
                variant="outlined"
                placeholder="Number of Players"
                type="number"
                error={!!errors.playerCount}
                helperText={errors.playerCount}
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
                required
                value={gameFee}
                onChange={(e) => setGameFee(e.target.value)}
                variant="outlined"
                error={!!errors.gameFee}
                helperText={errors.gameFee}
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
                  {["Beginners", "Average", "Semi-Pro", "Professional"].map(
                    (level, index) => (
                      <FormControlLabel
                        key={level}
                        sx={{
                          width: "fit-content",
                          "& .MuiFormControlLabel-label": { fontSize: "14px" },
                        }}
                        control={
                          <Checkbox
                            checked={skillLevels.includes(level)}
                            onChange={(e) => handleSkillLevelChange(e)}
                            size="small"
                            color="success"
                            name={level}
                          />
                        }
                        label={level}
                      />
                    )
                  )}
                </FormGroup>
                {errors.skillLevels && (
                  <Typography color="error">{errors.skillLevels}</Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <FormLabel id="gender-radio-group-label">Gender</FormLabel>
              <Box className={styles.host_game_gender_radio}>
                <RadioGroup row onChange={(e) => setGender(e.target.value)}>
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
                {errors.gender && (
                  <Typography color="error">{errors.gender}</Typography>
                )}
              </Box>
            </Box>
            <Box className={styles.cover_box} sx={{ display: "flex", gap: "20px", alignItems: "center",flexWrap:'nowrap'}}>
      <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
      <FormLabel sx={{textAlign:'left'}}>Upload a Cover</FormLabel>
        <Box sx={{display:'flex',alignItems:'center',width:'fit-content'}}>
        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="upload-image"
        />
        <label htmlFor="upload-image" style={{width:'fit-content'}}>
          <Button variant="contained" sx={{width:'80%'}} component="span" disabled={uploading}>
            {uploading ? "Uploading..." : "Choose Image"}
          </Button>
        </label>
      {preview && (
        <Box
          sx={{
            mt: 2,
            width: "100px",
            height: "100px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          
        </Box>
      )}
      </Box>
      </Box>
      <Button
        className={styles.host_game_button}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        disabled={uploading}
      >
        Host Game
      </Button>
    </Box>
          </Box>
        </Box>
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
      </main>
    </Box>
  );
}

export default HostGame;

import React, { useContext, useEffect, useState, useRef } from "react";
import CommonHeader from "../../../components/Header/CommonHeader";
import styles from "./HostGame.module.css";
import footballHost from "../../../assets/footballHost.png";
import volleyballHost from "../../../assets/volleyballHost.png";
import tennistHost from "../../../assets/tennistHost.png";
import BasketballHost from "../../../assets/BasketballHost.png";
import tableTennishost from "../../../assets/tableTennishost.png";
import padelHost from "../../../assets/padelHost.png";
import volleyball from "../../../assets/volleyball.jpg";
import tennis from "../../../assets/tennis.jpg";
import football from "../../../assets/football.png";
import tabletennis from "../../../assets/tabletennis.jpg";
import padel from "../../../assets/padel.jpg";
import basketball from "../../../assets/basketball.webp";

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
  Autocomplete,
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
  const auth = useContext(AuthContext);
  const cld = new Cloudinary({ cloud: { cloudName: "de26qjxpf" } });
  const [locationInput, setLocationInput] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  const sports = [
    {
      id: 1,
      sportName: "Football",
      sportPicture: footballHost,
      databaseName: "football",
      coverPic: football,
    },
    {
      id: 2,
      sportName: "Volleyball",
      sportPicture: volleyballHost,
      databaseName: "volleyball",
      coverPic: volleyball,
    },
    {
      id: 3,
      sportName: "Table Tennis",
      sportPicture: tableTennishost,
      databaseName: "tabletennis",
      coverPic: tabletennis,
    },
    {
      id: 4,
      sportName: "Tennis",
      sportPicture: tennistHost,
      databaseName: "tennis",
      coverPic: tennis,
    },
    {
      id: 5,
      sportName: "Basketball",
      sportPicture: BasketballHost,
      databaseName: "basketball",
      coverPic: basketball,
    },
    {
      id: 6,
      sportName: "Padel",
      coverPic: padel,
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

  const uploadSportImage = async (selectedSport) => {
    try {
      // Find the selected sport object
      const sport = sports.find(
        (sport) => sport.databaseName === selectedSport
      );
      if (!sport) return null;

      const formData = new FormData();
      // Use the coverPic from the selected sport
      const response = await fetch(sport.coverPic);
      const blob = await response.blob();
      formData.append("file", blob, `${sport.databaseName}.jpg`);
      formData.append("upload_preset", "TeamUp");

      const uploadResponse = await axiosInstance.post(
        "https://api.cloudinary.com/v1_1/de26qjxpf/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return uploadResponse.data.secure_url;
    } catch (error) {
      console.error("Error uploading sport image:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Upload the selected sport's cover image
        const uploadedImageUrl = await uploadSportImage(selectedSportId);

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
          gamePicCover: uploadedImageUrl,
        };

        console.log("Submitting game details:", gameDetails); // For debugging
        const response = await hostGame(gameDetails);
        console.log(response);
        toast.success(`Match Created!`, {
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
  };

  // Initialize Google services
  useEffect(() => {
    const initializeGoogleServices = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        try {
          autocompleteService.current =
            new window.google.maps.places.AutocompleteService();
          placesService.current = new window.google.maps.places.PlacesService(
            document.createElement("div")
          );
        } catch (error) {
          console.error("Error initializing Google services:", error);
        }
      } else {
        // If not loaded yet, try again after a short delay
        setTimeout(initializeGoogleServices, 100);
      }
    };

    initializeGoogleServices();
  }, []);

  // Handle location input change
  const handleLocationInputChange = async (event, newValue) => {
    setLocationInput(newValue || "");
    setLocation(newValue || ""); // Update both states

    if (newValue && autocompleteService.current) {
      try {
        const response = await autocompleteService.current.getPlacePredictions({
          input: newValue,
          componentRestrictions: { country: "HU" },
          types: ['geocode'], // Use geocode to get addresses
          fields: ['formatted_address', 'geometry', 'name']
        });

        setLocationSuggestions(response?.predictions || []);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setLocationSuggestions([]); // Clear suggestions on error
      }
    } else {
      setLocationSuggestions([]); // Clear suggestions if input is empty
    }
  };

  // Handle location selection
  const handleLocationSelect = (event, prediction) => {
    if (prediction) {
      if (typeof prediction === 'string') {
        setLocation(prediction);
        setLocationInput(prediction);
      } else if (prediction.description) {
        // Get more details about the place when selected
        if (placesService.current) {
          placesService.current.getDetails(
            {
              placeId: prediction.place_id,
              fields: ['formatted_address']
            },
            (place, status) => {
              if (status === 'OK' && place) {
                setLocation(place.formatted_address);
                setLocationInput(place.formatted_address);
              } else {
                setLocation(prediction.description);
                setLocationInput(prediction.description);
              }
            }
          );
        } else {
          setLocation(prediction.description);
          setLocationInput(prediction.description);
        }
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
              <Box className={styles.input_box}>
                <Autocomplete
                  freeSolo
                  options={locationSuggestions}
                  getOptionLabel={(option) => 
                    typeof option === "string" ? option : option.description || ""
                  }
                  value={location}
                  inputValue={locationInput}
                  onInputChange={handleLocationInputChange}
                  onChange={handleLocationSelect}
                  disableClearable
                  renderOption={(props, option) => (
                    <Box component="li" {...props} sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      padding: '8px 10px',
                      '&:hover': {
                        backgroundColor: 'rgba(76, 175, 80, 0.08)'
                      }
                    }}>
                      <LocationOnIcon sx={{ color: "text.secondary", mr: 2 }} />
                      {option.description}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      required
                      error={!!errors.location}
                      helperText={errors.location}
                      placeholder="Game Location"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment sx={{
                            width: "fit-content",
                            marginRight: "10px",
                            marginLeft: "-5px",
                            marginTop: "2px",
                          }}
                          position="end">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        textAlign: "left",
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#4CAF50",
                          },
                        },
                        "& .MuiAutocomplete-clearIndicator": {
                          color: "#666",
                          "&:hover": {
                            color: "#333"
                          }
                        }
                      }}
                    />
                  )}
                  ListboxProps={{
                    sx: {
                      maxHeight: '200px',
                      '& li': {
                        borderBottom: '1px solid #eee',
                        '&:last-child': {
                          borderBottom: 'none'
                        }
                      }
                    }
                  }}
                />
              </Box>
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
                  className={styles.date_picker}
                  onChange={(newValue) => setGameDate(newValue.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
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
        <Button
          className={styles.host_game_button}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Host Game
        </Button>
      </main>
    </Box>
  );
}

export default HostGame;

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { 
  Avatar,
  CircularProgress, 
  List, 
  ListItem, 
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { searchUsersApi } from "../services/navbar";
import { useNavigate } from "react-router-dom";
import { countryCodeMap } from "../../../../constants/countryCode";

export default function NavbarSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  // Handle input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    async function queryUsers() {
      try {
        const response = await searchUsersApi(searchTerm);
        setSearchResults(response);
      } catch (e) {
        console.error(e);
      }
    }
    queryUsers();
  }, [searchTerm]);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Paper
        component="form"
        sx={{
          p: "0.2rem 2rem",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "25px",
          height: "40px",
          maxWidth: "60rem",
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
          }}
          placeholder="Search for Players"
          inputProps={{
            "aria-label": "search player",
            sx: { textAlign: "center" },
          }}
          onChange={handleInputChange} // Trigger search on every input change
          value={searchTerm}
        />
        <IconButton
          type="button"
          sx={{ p: "10px", width: "40px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* Display search results */}
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      )}

      {searchResults && searchResults.length > 0 && searchTerm.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            width: "100%",
            maxWidth: "60rem",
            mt: "0.5rem",
            borderRadius: "10px",
            zIndex: 1,
          }}
        >
          <List>
            {searchResults.map((result, index) => (
              <ListItem
                sx={{ 
                  cursor: "pointer",
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  },
                  padding: '8px 16px'
                }}
                key={index}
                onClick={() => {
                  window.location.href = `/profile/${result.username}`;
                }}
              >
                <ListItemAvatar sx={{width:'fit-content'}}>
                  <Avatar 
                    src={result.profilePicture || '/default-avatar.png'} 
                    alt={result.username}
                    sx={{ width: 40, height: 40, marginRight: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText 
                  primary={result.username}
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ReactCountryFlag
                        countryCode={countryCodeMap[result.country]}
                        svg
                        style={{
                          width: '20px',
                          height: '20px',
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {result.country}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

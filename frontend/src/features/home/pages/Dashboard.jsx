import styles from "./Dashboard.module.css";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import Add from "@mui/icons-material/Add";

import CardsCarousel from "../../../components/CardsCarousel/CardsCarousel";
import SideBar from "../../../components/SideBar/SideBar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { getPlayerGamesById, getPublicGames, joinPrivateGame } from "../services/Dashboard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const auth = useContext(AuthContext);
  
  const [loadingPublicGames, setLoadingPublicGames] = useState(false);
  const [hasFetchedGames, setHasFetchedGames] = useState(false);
  const [publicGames,setPublicGames]=useState([])
  const nav = useNavigate();
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [gameCode, setGameCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        if (auth.userAuth?.id && !hasFetchedGames) { 
          const response = await getPlayerGamesById(auth.userAuth.id);
          auth.setUserGames(response.data);
        }
        setLoadingPublicGames(true);
          const publicGamesResponse = await getPublicGames();
          if (publicGamesResponse.data) setPublicGames(publicGamesResponse.data);
          setHasFetchedGames(true); 
          setLoadingPublicGames(false);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    if (auth) {
      fetchGames();
      console.log(auth.publicGames)
    }
  }, [auth.userAuth, auth.setUserGames, auth.setPublicGames, hasFetchedGames, auth]);

  const handleOpenJoinDialog = () => {
    setOpenJoinDialog(true);
  };

  const handleCloseJoinDialog = () => {
    setOpenJoinDialog(false);
    setGameCode('');
    setJoinError('');
  };

  const handleJoinGame = async () => {
    if (!gameCode.trim()) {
      setJoinError('Please enter a game code');
      return;
    }

    try {
      const response = await joinPrivateGame(gameCode, auth.userAuth.id);
      handleCloseJoinDialog();
      setAlertMessage('Successfully joined the game!');
      setAlertSeverity('success');
      setShowAlert(true);
      // Refresh games list
      const updatedGames = await getPlayerGamesById(auth.userAuth.id);
      auth.setUserGames(updatedGames.data);
    } catch (error) {
      setJoinError(error.response?.data?.error || 'Failed to join game');
      setAlertMessage('Failed to join game');
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  return (
    <Box className={styles.landing_page}>
      <header className={styles.landing_page_header}>
        <SideBar Dashboard={true} />
      </header>
      <main className='p-2'>
        {auth.isAuth ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px",backgroundColor:'white',padding:'10px',borderRadius:'10px',boxShadow:'10px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <Box className={styles.landing_page_horizontal_stack}>
              <Typography variant="h6">Your Upcoming Games</Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                color="success"
                onClick={handleOpenJoinDialog}
                sx={{ width: "fit-content", textWrap: "nowrap" }}
              >
                Join Private Game
              </Button>
            </Box>
            <Box className={styles.landing_page_cards}>
              {auth.userGames?.length > 0 ? (
                <CardsCarousel gameDetailsList={auth.userGames.filter((game)=>game.status!='finished')} />
              ) : (
                <>
                  <Box
                    sx={{
                      border: "2px solid black",
                      marginBottom: "30px",
                      padding: "30px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        textAlign: "center",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      You don't have any upcoming games !{" "}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Please{" "}
              <span
                onClick={() => nav("/auth")}
                className={styles.login_inline}
              >
                Login
              </span>{" "}
              to view your upcoming games !{" "}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px",marginTop:'50px',backgroundColor:'white',borderRadius:'10px',paddingTop:'10px',boxShadow:'10px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <Box className={styles.landing_page_horizontal_stack}>
            <Typography variant="h6">Checkout these public games :</Typography>
          </Box>
          <Box className={styles.landing_page_cards}>
            {loadingPublicGames ? (
              <CircularProgress />
            ) : (
              <>
                {publicGames.length > 0 ? (
                  <CardsCarousel gameDetailsList={publicGames} />
                ) : (
                  <Box
                    sx={{
                      border: "2px solid black",
                      marginBottom: "30px",
                      padding: "30px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        textAlign: "center",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      No Available Public Games yet !{" "}
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </main>
      <Dialog open={openJoinDialog} onClose={handleCloseJoinDialog}>
        <DialogTitle>Join Private Game</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Game Code"
            type="text"
            fullWidth
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
            error={!!joinError}
            helperText={joinError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJoinDialog}>Cancel</Button>
          <Button onClick={handleJoinGame} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={() => setShowAlert(false)}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;

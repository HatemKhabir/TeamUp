import styles from "./LandingPage.module.css";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
} from "@mui/material";
import Add from "@mui/icons-material/Add";

import CardsCarousel from "../../../components/CardsCarousel/CardsCarousel";
import SideBar from "../../../components/SideBar/SideBar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { getPlayerGamesById, getPublicGames } from "../services/landingPage";
import { replace, useNavigate } from "react-router-dom";

function LandingPage() {
  const auth = useContext(AuthContext);
  
  const [loadingPublicGames, setLoadingPublicGames] = useState(false);
  const [hasFetchedGames, setHasFetchedGames] = useState(false);
  const [publicGames,setPublicGames]=useState([])
  const nav = useNavigate();

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

  return (
    <Box className={styles.landing_page}>
      <header className={styles.landing_page_header}>
        <SideBar landingPage={true} />
      </header>
      <main>
        {auth.isAuth ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Box className={styles.landing_page_horizontal_stack}>
              <Typography variant="h6">Your Upcoming Games</Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                color="success"
                onClick={() => {
                  nav("/public-games", replace);
                }}
                sx={{ width: "fit-content", textWrap: "nowrap" }}
              >
                Join Game
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px",marginTop:'50px' }}>
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
    </Box>
  );
}

export default LandingPage;

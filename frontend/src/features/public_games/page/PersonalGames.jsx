import GameCards from '../../../components/Cards/GameCards';
import { Box, Button,Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CommonHeader from '../../../components/Header/CommonHeader';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import styles from "./PersonalGames.module.css";
import { getPlayerGamesById } from '../../home/services/Dashboard';



function PersonalGames() {
  const auth=useContext(AuthContext) 
  const [gameDetailsList,setGameDetailsList]=useState([]);

  const [hasFetchedGames, setHasFetchedGames] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        if (auth.userAuth?.id && !hasFetchedGames) { 
          const response = await getPlayerGamesById(auth.userAuth.id);
          console.log(response)
          setGameDetailsList(response.data)
          setHasFetchedGames(true); 
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    if (auth.userAuth) {
      fetchGames();
      console.log(auth.publicGames)
    }
  }, [auth.userAuth, auth.setUserGames, auth.setPublicGames, hasFetchedGames, auth]);
  
  
  
  return (
      <div className={styles.sports_games}>
          <header>
              <CommonHeader pageName='personal-games'/>
          </header>
          <Box sx={{display:'flex'}}>
          <main className={styles.games_list_main}>
            <Box className={styles.games_page_infos}>
              <Typography variant='body2' sx={{marginLeft:'20px'}}>{gameDetailsList.length} Games 
              </Typography>
            </Box>
            {gameDetailsList.length>0 ?
          
            <Box className={styles.game_cards_container}>
             {gameDetailsList.map((game, index) => (
                  <GameCards key={index} gameDetails={game} joined={game.joined} />
                ))}
                </Box>  :
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                You don't have any upcoming or previous games !{" "}
              </Typography>
           }
          </main>
          </Box>
      </div>
  );
}

export default PersonalGames;
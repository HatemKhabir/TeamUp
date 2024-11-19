import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import styles from './SportGames.module.css'
import GameCards from '../../../components/Cards/GameCards';
import { Box, Button,Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SideBar from '../../../components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import { fetchSportSpecificAPI } from '../services/sportGames';



function SportGames() {
  const { sportName } = useParams();
  const [gameDetailsList,setGameDetailsList]=useState([]);

  useEffect(()=>{
  const fetchGames=async()=>{
 try{
    const response=await fetchSportSpecificAPI(sportName);
    if (response.status===200){
      setGameDetailsList(response.data);
    }
  }catch(e){
  throw e
 }
  }
  fetchGames();
  })
  
  
  return (
      <div className={styles.sports_games}>
          <header>
              <Header sportName={sportName} />
          </header>
          <Box sx={{display:'flex'}}>
          <aside className={styles.games_list_aside}><SideBar sportName={sportName}/></aside>
          <main className={styles.games_list_main}>
            <Box className={styles.games_page_infos}>
              <Typography variant='body2' sx={{marginLeft:'20px'}}>{gameDetailsList.length} Games 
              </Typography>

            <Button className={styles.sorting_button} endIcon={<KeyboardArrowDownIcon />}>Sort By</Button>
            </Box>
            <Box className={styles.game_cards_container}>
              {gameDetailsList ? gameDetailsList.map((game, index) => (
                  <GameCards key={index} gameDetails={game} joined={game.joined} />
              )):
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
              }
              </Box>
            <Button className={styles.load_button}>Load More</Button>  
          </main>
          </Box>
      </div>
  );
}

export default SportGames;
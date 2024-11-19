import styles from './PublicGames.module.css'
import GameCards from '../../../components/Cards/GameCards';
import { Box, Button,Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SideBar from '../../../components/SideBar/SideBar';
import CommonHeader from '../../../components/Header/CommonHeader';



function SportGames() {
 
  
  
  return (
      <div className={styles.sports_games}>
          <header>
              <CommonHeader pageName='explore'/>
          </header>
          <Box sx={{display:'flex'}}>
          <aside className={styles.games_list_aside}><SideBar/></aside>
          <main className={styles.games_list_main}>
            <Box className={styles.games_page_infos}>
              <Typography variant='body2' sx={{marginLeft:'20px'}}>{gameDetailsList.length} Games 
              </Typography>

            <Button className={styles.sorting_button} endIcon={<KeyboardArrowDownIcon />}>Sort By</Button>
            </Box>
            <Box className={styles.game_cards_container}>
              {gameDetailsList.map((game, index) => (
                  <GameCards key={index} gameDetails={game} joined={game.joined} />
              ))}
              </Box>
            <Button className={styles.load_button}>Load More</Button>  
          </main>
          </Box>
      </div>
  );
}

export default SportGames;
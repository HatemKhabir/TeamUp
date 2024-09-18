import styles from './PublicGames.module.css'
import GameCards from '../../../components/Cards/GameCards';
import { Box, Button,Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SideBar from '../../../components/SideBar/SideBar';
import CommonHeader from '../../../components/Header/CommonHeader';



function SportGames() {
 
  const gameDetailsList = [
      {
          locationImg: 'https://lh3.googleusercontent.com/p/AF1QipN3smfJ3sZoW31B8bqYpGpBeKhI2_f59JT3qUl5=s680-w680-h510-rw',
          date: '2024-09-20',
          time: '18:00',
          location: 'Local Park',
          gameTitle: 'Soccer Friendly Match',
          playersNumber: 8,
          totalPlayers: 10,
          joined:true,
          gamePrivacy: 'Public'
      },
      {
          locationImg: 'https://lh3.googleusercontent.com/p/AF1QipN3smfJ3sZoW31B8bqYpGpBeKhI2_f59JT3qUl5=s680-w680-h510-rw',
          date: '2024-09-21',
          time: '15:00',
          location: 'Community Center',
          gameTitle: 'Basketball Tournament',
          playersNumber: 5,
          totalPlayers: 5,
          joined:true,
          gamePrivacy: 'Private'
      }, {
        locationImg: 'https://lh3.googleusercontent.com/p/AF1QipN3smfJ3sZoW31B8bqYpGpBeKhI2_f59JT3qUl5=s680-w680-h510-rw',
        date: '2024-09-21',
        time: '15:00',
        location: 'Community Center',
        gameTitle: 'Basketball Tournament',
        playersNumber: 5,
        totalPlayers: 5,
        joined:false,
        gamePrivacy: 'Private'
    }, {
      locationImg: 'https://lh3.googleusercontent.com/p/AF1QipN3smfJ3sZoW31B8bqYpGpBeKhI2_f59JT3qUl5=s680-w680-h510-rw',
      date: '2024-09-21',
      time: '15:00',
      location: 'Community Center',
      gameTitle: 'Basketball Tournament',
      playersNumber: 5,
      totalPlayers: 5,
      joined:true,
      gamePrivacy: 'Private'
  }, {
    locationImg: 'https://lh3.googleusercontent.com/p/AF1QipN3smfJ3sZoW31B8bqYpGpBeKhI2_f59JT3qUl5=s680-w680-h510-rw',
    date: '2024-09-21',
    time: '15:00',
    location: 'Community Center',
    gameTitle: 'Basketball Tournament',
    playersNumber: 5,
    totalPlayers: 5,
    joined:true,
    gamePrivacy: 'Private'
}, {
  locationImg: 'https://lh3.googleusercontent.com/p/AF1QipN3smfJ3sZoW31B8bqYpGpBeKhI2_f59JT3qUl5=s680-w680-h510-rw',
  date: '2024-09-21',
  time: '15:00',
  location: 'Community Center',
  gameTitle: 'Basketball Tournament',
  playersNumber: 5,
  joined:false,
  totalPlayers: 5,
  gamePrivacy: 'Private'
},
      // Add more games as needed
  ];
  
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
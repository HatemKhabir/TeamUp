import styles from './LandingPage.module.css'
import { Box, Button, InputAdornment, Typography } from '@mui/material'
import Add from '@mui/icons-material/Add'

import CardsCarousel from '../../../components/CardsCarousel/CardsCarousel'
import SideBar from '../../../components/SideBar/SideBar'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider'
import { getPlayerGamesById } from '../services/landingPage'
import { replace, useNavigate } from 'react-router-dom'

function LandingPage() {
  const auth=useContext(AuthContext)
  const [userGames,setUserGames]=useState([]);
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
},]

const nav=useNavigate();

useEffect(() => {
  const timer = setTimeout(async () => {
    if (auth.userAuth && auth.userAuth.id) {  
      try {
        const response = await getPlayerGamesById(auth.userAuth.id);
        console.log('User games:', response.data);  
        setUserGames(response.data)
      } catch (error) {
        console.error('Error fetching user games:', error);
      }
    }
  }, 500); 

  return () => clearTimeout(timer);
}, [auth.userAuth]);

  return (
    <Box className={styles.landing_page}>
    <header className={styles.landing_page_header}>
      <SideBar landingPage={true}/>
      </header>
    <main>
      {auth.isAuth?<Box sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
        <Box className={styles.landing_page_horizontal_stack}>
          <Typography variant='h6'>Your Upcoming Games</Typography>
          <Button variant='outlined' startIcon={<Add/>} color='success' onClick={()=>{nav('/public-games',replace)}} sx={{width:'fit-content',textWrap:'nowrap'}}>
            Join Game
          </Button>
        </Box>
        <Box className={styles.landing_page_cards}>
        {userGames.length>0? <CardsCarousel gameDetailsList={userGames} />:<>
        <Box sx={{border:'2px solid black',marginBottom:'30px',padding:'30px'}}>
        <Typography variant='h4' sx={{textAlign:'center',marginTop:'10px',marginBottom:'10px'}}>You don't have any upcoming games ! </Typography>

        </Box>
        </>}
        </Box>
      </Box>:<Box>
      <Typography variant='h4' sx={{textAlign:'center',marginTop:'10px',marginBottom:'10px'}}>Please <span onClick={()=>nav('/auth')} className={styles.login_inline}>Login</span> to view your upcoming games ! </Typography>
      </Box>
      }
      <Box sx={{display:'flex',flexDirection:'column',gap:'30px'}}>
        <Box className={styles.landing_page_horizontal_stack}>
          <Typography variant='h6'>Checkout these public games :</Typography>
        </Box>
        <Box className={styles.landing_page_cards}>
        {gameDetailsList && <CardsCarousel gameDetailsList={gameDetailsList} />}
        </Box>
      </Box>
    </main>
      </Box>
  )
}

export default LandingPage
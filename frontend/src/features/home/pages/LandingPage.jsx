import React from 'react'
import SideBar from '../../../components/side_bar/SideBar'
import styles from './LandingPage.module.css'
import { Box, Button, InputAdornment, Typography } from '@mui/material'
import Add from '@mui/icons-material/Add'
import LocationOn from '@mui/icons-material/LocationOn'
import GameCards from '../../../components/Cards/GameCards'
import CardsCarousel from '../../../components/CardsCarousel/CardsCarousel'

function LandingPage() {
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
  return (
    <Box className={styles.landing_page}>
    <header className={styles.landing_page_header}>
      <SideBar landingPage={true}/>
      </header>
    <main>
      <Box sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
        <Box className={styles.landing_page_horizontal_stack}>
          <Typography variant='h6'>Your Upcoming Games</Typography>
          <Button variant='outlined' startIcon={<Add/>} color='success' sx={{width:'fit-content',textWrap:'nowrap'}}>
            Join Game
          </Button>
        </Box>
        <Box className={styles.landing_page_cards}>
        {gameDetailsList && <CardsCarousel gameDetailsList={gameDetailsList} />}
        </Box>
      </Box>
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
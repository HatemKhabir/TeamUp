import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import styles from './SportGames.module.css'
import GameCards from '../../../components/Cards/GameCards';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import SideBar from '../../../components/side_bar/SideBar';



function SportGames() {
  const { sportName } = useParams();
 
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
  ];
  
  return (
      <div className={styles.sports_games}>
          <header>
              <Header sportName={sportName} />
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
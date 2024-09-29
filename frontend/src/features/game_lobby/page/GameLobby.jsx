import { Box } from '@mui/material'
import ChatBox from '../../../components/ChatBox/ChatBox'
import CommonHeader from '../../../components/Header/CommonHeader'
import GameDetails from '../components/GameDetails/GameDetails'
import styles from './GameLobby.module.css'

function GameLobby() {
  const gameObject= {
    locationImg: 'https://lh3.googleusercontent.com/p/AF1QipN3smfJ3sZoW31B8bqYpGpBeKhI2_f59JT3qUl5=s680-w680-h510-rw',
    date: '2024-09-21',
    time: '15:00',
    location: 'Community Center',
    gameTitle: 'Basketball Tournament',
    playersNumber: 5,
    totalPlayers: 5,
    joined:true,
    gamePrivacy: 'Private'
}
  return (
    <div>
        <header>
          <CommonHeader pageName='game-chat'/>
        </header>
        <Box className={styles.game_lobby}>
        <aside className={styles.game_details}>
          <GameDetails gameDetails={gameObject}/>
        </aside>
        <main className={styles.game_chat}>
         <ChatBox/>
        </main>
        </Box>
    </div>
  )
}

export default GameLobby
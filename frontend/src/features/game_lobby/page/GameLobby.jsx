import { Box } from '@mui/material'
import ChatBox from '../../../components/ChatBox/ChatBox'
import CommonHeader from '../../../components/Header/CommonHeader'
import GameDetails from '../components/GameDetails/GameDetails'
import styles from './GameLobby.module.css'


function GameLobby() {
  return (
    <div className={styles.gameLobby}>
        <header>
          <CommonHeader pageName='game-chat'/>
        </header>
        <Box className={styles.game_lobby}>
        <aside className={styles.game_details}>
          <GameDetails/>
        </aside>
        <main className={styles.game_chat}>
         <ChatBox/>
        </main>
        </Box>
    </div>
  )
}

export default GameLobby
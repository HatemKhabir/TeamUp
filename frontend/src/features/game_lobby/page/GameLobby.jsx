import { Box, Typography } from '@mui/material'
import ChatBox from '../../../components/ChatBox/ChatBox'
import CommonHeader from '../../../components/Header/CommonHeader'
import GameDetails from '../components/GameDetails/GameDetails'
import styles from './GameLobby.module.css'
import { useEffect, useState } from 'react'
import { replace, useNavigate, useParams } from 'react-router-dom'
import { getGameDetailsbyId } from '../services/gameLobby'


function GameLobby() {
  const {gameId}=useParams()
  const [gameObject, setGameObject] = useState(null);
  const nav=useNavigate()

  
  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const response = await getGameDetailsbyId(gameId);
        setGameObject(response);
        if (response.status=='finished')
          nav('/',replace)
      } catch (e) {
        console.error(e);
      }
    }
    fetchGameDetails();
  }, [gameId]);

  if (!gameObject) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className={styles.gameLobby}>
        <header>
          <CommonHeader pageName='game-chat'/>
        </header>
        <Box className={styles.game_lobby}>
        <aside className={styles.game_details}>
          <GameDetails gameObject={gameObject}/>
        </aside>
        <main className={styles.game_chat}>
         <ChatBox chatId={gameObject.chat}/>
        </main>
        </Box>
    </div>
  )
}

export default GameLobby
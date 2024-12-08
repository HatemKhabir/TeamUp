import { Box, Typography } from '@mui/material'
import styles from './PrivateChats.module.css'
import ChatsList from '../components/chats_list/ChatsList'
import CommonHeader from '../../../components/Header/CommonHeader'
import ChatBox from '../../../components/ChatBox/ChatBox'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider'
import { getPlayerStats } from '../../profile/services/profileStats'
import { useParams } from 'react-router-dom'

function PrivateChats() {
  const [friendsList,setFriendsList]=useState([])
  const auth=useContext(AuthContext)
  const {friendshipId}=useParams()
  const [friendships,setFriendShips]=useState([])
  useEffect(() => {
    async function getPlayerData() {
      try {
        if(auth.userAuth?.username){
        const playerDataResponse = await getPlayerStats(auth.userAuth?.username);
        if (playerDataResponse) {
          console.log(playerDataResponse)
          setFriendsList(playerDataResponse.responseData.profileData?.friendsList);
          setFriendShips(playerDataResponse.friendships)
        }
      }
      } catch (e) {
        console.error(e);
      }
    }
    
    if (auth.userAuth?.username) {
      getPlayerData();
    }
    console.log(friendsList)
  }, [ auth.userAuth?.username]);
  
  if (!auth.userAuth){
    return <Typography>Loading ...</Typography>
  }
  
  return (
    <div>
        <header>
          <CommonHeader pageName='private-chat'/>
        </header>
        <Box className={styles.private_chats}>
        <aside className={styles.friends_list_aside}>
          <ChatsList friendsList={friendsList} friendships={friendships}/>
        </aside>
        <main className={styles.game_chat}>
         <ChatBox friendshipId={friendshipId}/>
        </main>
        </Box>
    </div>
  )
}

export default PrivateChats
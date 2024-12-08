import { Box } from '@mui/material'
import styles from './ChatBox.module.css'
import MessagesContainer from './sub-components/MessagesContainer/MessagesContainer'
import MessageInput from './sub-components/MessageInput/MessageInput'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../libs/axios'
import { fetchLobbyMessagesApi } from './services/messages'

function ChatBox({chatId,friendshipId}) {
  const [messages,setMessages]=useState([])
  useEffect(()=>{
  async function fetchGroupMessages() {
    try{
       const response=await fetchLobbyMessagesApi(chatId)
       console.log(response) 
       setMessages(response)
    }catch(e){
      console.log(e)
    }
  }
  if (chatId)
  fetchGroupMessages()
  },[chatId])

  return (
    <Box className={styles.common_chat_box}>
        <MessagesContainer messages={messages}/>
        <MessageInput chatId={chatId?chatId:friendshipId}/>
    </Box>
  )
}

export default ChatBox
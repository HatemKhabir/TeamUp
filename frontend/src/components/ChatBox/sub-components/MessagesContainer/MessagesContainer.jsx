import React from 'react'
import Messages from '../Messages/Messages'
import { Box } from '@mui/material'
import styles from './MessagesContainer.module.css'
function MessagesContainer() {
  return (
    <Box className={styles.messages_container}><Messages sender={false}/>
    <Messages sender={true}/>
    <Messages sender={true}/>
    <Messages sender={true}/>
    <Messages sender={false}/>
    <Messages sender={true}/>
    <Messages sender={true}/>
    <Messages sender={true}/>
    <Messages sender={false}/></Box>
  )
}

export default MessagesContainer
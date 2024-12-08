import React, { useContext, useEffect } from 'react'
import Messages from '../Messages/Messages'
import { Box } from '@mui/material'
import styles from './MessagesContainer.module.css'
import { AuthContext } from '../../../../contexts/AuthProvider'
function MessagesContainer({ messages }) {
  const auth=useContext(AuthContext)

  return (
    <Box className={styles.messages_container}>
      {messages.map((msg) => (
        <Messages 
          key={msg._id} 
          sender={msg.senderID._id != auth.userAuth.id} // Compare with logged-in user
          content={msg.content}
          senderImg={msg.senderID.profilePicture}
        />
      ))}
    </Box>
  );
}

export default MessagesContainer;

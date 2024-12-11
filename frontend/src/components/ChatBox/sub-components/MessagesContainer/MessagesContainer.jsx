import React, { useContext, useEffect, useRef } from 'react';
import Messages from '../Messages/Messages';
import { Box } from '@mui/material';
import styles from './MessagesContainer.module.css';
import { AuthContext } from '../../../../contexts/AuthProvider';

function MessagesContainer({ messages }) {
  const auth = useContext(AuthContext);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    console.log(messages)
  }, [messages]); // Run this effect whenever `messages` changes

  return (
    <Box className={styles.messages_container} ref={containerRef}>
      {messages.map((msg) => (
        <Messages
          key={msg._id}
          sender={msg.senderID._id !== auth.userAuth.id} // Compare with logged-in user
          content={msg.content}
          senderImg={msg.senderID.profilePicture}
        />
      ))}
    </Box>
  );
}

export default MessagesContainer;

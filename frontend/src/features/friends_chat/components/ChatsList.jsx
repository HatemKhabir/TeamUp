import React, { useEffect, useState } from 'react';
import { getLobbiesMessages } from '../services/privateChats';
import { auth } from '../contexts/AuthContext';

const ChatsList = () => {
  const [lobbies, setLobbies] = useState([]);

  const getLastMessage = async () => {
    try {
      const messages = await getLobbiesMessages(auth.userAuth.id);
      if (!messages || !Array.isArray(messages)) {
        console.log('No messages or invalid format:', messages);
        return;
      }
      
      setLobbies(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (auth.userAuth?.id) {
      getLastMessage();
    }
  }, [auth.userAuth?.id]);

  return (
    <div>
      {/* Render your chats list here */}
    </div>
  );
};

export default ChatsList; 
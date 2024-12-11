import { Box } from "@mui/material";
import styles from "./ChatBox.module.css";
import MessagesContainer from "./sub-components/MessagesContainer/MessagesContainer";
import MessageInput from "./sub-components/MessageInput/MessageInput";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../libs/axios";
import {
  fetchLobbyMessagesApi,
  fetchPrivateMessagesApi,
} from "./services/messages";
import { AuthContext } from "../../contexts/AuthProvider";
import { SocketContext } from "../../contexts/SocketContext";

function ChatBox({ chatId, friendshipId }) {
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext); // Retrieve the socket from context

  useEffect(() => {
    async function fetchGroupMessages() {
      try {
        const response = await fetchLobbyMessagesApi(chatId);
        console.log(response);
        setMessages(response);
      } catch (e) {
        console.log(e);
      }
    }
    async function fetchPrivateMessages() {
      try {
        const response = await fetchPrivateMessagesApi(friendshipId);
        console.log(response);
        setMessages(response);
      } catch (e) {
        console.log(e);
      }
    }
    if (chatId) {
      fetchGroupMessages();
    }
    if (friendshipId) {
      fetchPrivateMessages();
    }
  }, [chatId, friendshipId]);

  useEffect(() => {
    if (!socket) {
      return; 
    }
  
    if (!chatId && !friendshipId) {
      return; 
    }
  
    const roomId = chatId || friendshipId;
  
    socket.emit("leaveChat", roomId);
    socket.off("newMessage");
    socket.emit("joinChat", roomId);
  
    socket.on("newMessage", (newMessage) => {
      console.log("New message received via socket:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  
    return () => {
      socket.emit("leaveChat", roomId);
      socket.off("newMessage"); 
    };
  }, [socket, chatId, friendshipId]);
  
  return (
    <Box className={styles.common_chat_box}>
      <MessagesContainer messages={messages} />
      <MessageInput chatId={chatId ? chatId : friendshipId} />
    </Box>
  );
}

export default ChatBox;

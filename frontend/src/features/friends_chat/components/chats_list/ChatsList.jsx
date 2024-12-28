import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./ChatsList.module.css";
import { Box, Button, Typography } from "@mui/material";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getLastMessageApi, getLobbiesMessages } from "../../services/privateChats";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { SocketContext } from "../../../../contexts/SocketContext";

function ChatsList({ friendsList, friendships }) {
  const navigate = useNavigate();
  const [userChats, setUserChats] = useState([]);
  const auth = useContext(AuthContext);
  const socket = useContext(SocketContext);

  const handleFriendClick = (friendshipId) => {
    window.location.href = `/friends-chat/${friendshipId}`;
  };

  useEffect(() => {
    async function getLastMessage() {
      try {
        if (!friendships || friendships.length === 0) {
          return;
        }
        const chatIds = friendships.map((friendship) => friendship.chat);
        const response = await getLastMessageApi(chatIds);
        const gameLobbiesMessages = await getLobbiesMessages(auth.userAuth.id);
        
        // Make sure both are arrays before spreading
        const allChats = [
          ...(Array.isArray(response) ? response : []),
          ...(Array.isArray(gameLobbiesMessages) ? gameLobbiesMessages : [])
        ].filter(Boolean); // Remove any null/undefined values
        
        auth.updateUserChats(allChats);
        setUserChats(allChats);

        // Join all chat rooms on initial load
        if (socket && chatIds.length > 0) {
          socket.emit('joinUserChats', chatIds);
        }
      } catch (e) {
        console.error('Error fetching messages:', e);
        setUserChats([]); // Set empty array on error
      }
    }
    getLastMessage();
  }, [friendships, socket, auth.userAuth.id]);

  // Listen for real-time updates
  useEffect(() => {
    if (socket) {
      socket.on('chatListUpdate', (updatedChat) => {
        setUserChats(prev => {
          const newChats = prev.map(chat => 
            chat._id === updatedChat._id ? updatedChat : chat
          );
          if (!prev.find(chat => chat._id === updatedChat._id)) {
            newChats.push(updatedChat);
          }
          return newChats;
        });
      });

      socket.on('messageReceived', (updatedChat) => {
        setUserChats(prev => 
          prev.map(chat => 
            chat._id === updatedChat._id ? updatedChat : chat
          )
        );
      });

      return () => {
        socket.off('chatListUpdate');
        socket.off('messageReceived');
      };
    }
  }, [socket]);

  const sortedChats = useMemo(() => {
    const friendsChats=friendsList.map((friend) => {
      const friendship = friendships.find(
        (friendship) =>
          friendship.recipient === friend._id ||
          friendship.sender === friend._id
      );
      const lastMessage = userChats.find(
        (chat) => chat._id === friendship?.chat
      );
      return { friend, friendship, lastMessage };
    })
    .filter(chat => chat.friendship)
    const eventChats=userChats.filter((chat)=>chat.isGroupChat)
    console.log([...friendsChats,...eventChats])
    return [...friendsChats,...eventChats].sort((a, b) => {
      const dateA = a.lastMessage?.latestMsg?.createdAt || 0;
      const dateB = b.lastMessage?.latestMsg?.createdAt || 0;
      return new Date(dateB) - new Date(dateA); 
    });
  }, [friendsList, friendships, userChats]);

  useEffect(()=>{
console.log(userChats)
console.log(sortedChats)
  },[userChats,sortedChats])
  return (
    <Box className={styles.chats_list}>
      <Box className={styles.chats_list_title}>
        <Typography variant="subtitle2">{friendsList.length} CHATS</Typography>
      </Box>
      {sortedChats.length > 0 && (
        <Box>
          {sortedChats.map((chat, index) => {
            const lastMessage = chat.lastMessage?.latestMsg || chat.latestMsg;
            const isUnread = chat.lastMessage
              ? chat.lastMessage.openedBy && !chat.lastMessage.openedBy.includes(auth.userAuth.id)
              : chat.openedBy && !chat.openedBy.includes(auth.userAuth.id);

            const messagePreview = lastMessage && lastMessage.senderID
              ? `${lastMessage.senderID.username}: ${lastMessage.content}`
              : "No messages yet";

            return (
              <div
                className={styles.friend_box}
                key={index}
                onClick={() =>
                  handleFriendClick(chat.friendship ? chat.friendship.chat : chat._id)
                }
                style={{ cursor: "pointer" }}
              >
                <Box
                  component="img"
                  src={
                    chat.friend
                      ? chat.friend.profilePicture
                      : chat.eventId?.gamePicCover
                  }
                  className={styles.friend_image}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={"600"}>
                    {chat.friend ? chat.friend.username : chat.eventId?.eventTitle}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontSize={"0.8em"}
                    fontWeight={"400"}
                  >
                    {messagePreview}
                  </Typography>
                  {isUnread && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "mediumvioletred",
                      }}
                    />
                  )}
                </Box>
              </div>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default ChatsList;

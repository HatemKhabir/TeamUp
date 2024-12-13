import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./ChatsList.module.css";
import { Box, Button, Typography } from "@mui/material";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getLastMessageApi, getLobbiesMessages } from "../../services/privateChats";
import { AuthContext } from "../../../../contexts/AuthProvider";

function ChatsList({ friendsList, friendships }) {
  const navigate = useNavigate();
  const [userChats, setUserChats] = useState([]);
  const auth=useContext(AuthContext)
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
        const gameLobbiesMessages=await getLobbiesMessages(auth.userAuth.id);
        const allChats=[...response,...gameLobbiesMessages];
        auth.updateUserChats(response)
        setUserChats(allChats);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
    getLastMessage();
  }, [friendships]);

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
          {sortedChats.map((chat, index) => (
            <div
              className={styles.friend_box}
              key={index}
              onClick={() => handleFriendClick(chat.friendship?chat.friendship.chat:chat._id)}
              style={{ cursor: "pointer" }}
            >
              <Box
                component="img"
                src={chat.friend?chat.friend.profilePicture:chat.eventId.gamePicCover}
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
                  {chat.friend?chat.friend.username:chat.eventId.eventTitle}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontSize={"0.8em"}
                  fontWeight={"400"}
                >
                  {chat.lastMessage? chat.lastMessage.latestMsg
                    ? `${chat.lastMessage.latestMsg.senderID.username} : ${chat.lastMessage.latestMsg.content}`
                    : "No messages yet":chat.latestMsg?`${chat.latestMsg.senderID.username} : ${chat.latestMsg.content}`
                    : "No messages yet"}
                </Typography>
                {!chat.lastMessage?.openedBy.includes(auth.userAuth.id) && (
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
                  ></Box>
                )}
              </Box>
            </div>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ChatsList;

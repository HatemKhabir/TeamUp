import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./ChatsList.module.css";
import { Box, Button, Typography } from "@mui/material";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getLastMessageApi } from "../../services/privateChats";
import { AuthContext } from "../../../../contexts/AuthProvider";

function ChatsList({ friendsList, friendships }) {
  const navigate = useNavigate();
  const [chatsLastMsgs, setChatsLastMsgs] = useState([]);
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
        auth.updateUserChats(response)
        setChatsLastMsgs(response);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
    getLastMessage();
  }, [friendships, auth.userAuth.userChats]);

  const sortedChats = useMemo(() => {
    return friendsList.map((friend) => {
      const friendship = friendships.find(
        (friendship) =>
          friendship.recipient === friend._id ||
          friendship.sender === friend._id
      );
      const lastMessage = chatsLastMsgs.find(
        (chat) => chat._id === friendship?.chat
      );
      return { friend, friendship, lastMessage };
    })
    .filter(chat => chat.friendship)
    .sort((a, b) => {
      const dateA = a.lastMessage?.latestMsg?.createdAt || 0;
      const dateB = b.lastMessage?.latestMsg?.createdAt || 0;
      return new Date(dateB) - new Date(dateA); 
    });
  }, [friendsList, friendships, chatsLastMsgs]);


  return (
    <Box className={styles.chats_list}>
      <Box className={styles.chats_list_title}>
        <Typography variant="subtitle2">{friendsList.length} CHATS</Typography>
      </Box>
      {sortedChats.length > 0 && (
        <Box>
          {sortedChats.map(({ friend, friendship, lastMessage }, index) => (
            <div
              className={styles.friend_box}
              key={index}
              onClick={() => handleFriendClick(friendship.chat)}
              style={{ cursor: "pointer" }}
            >
              <Box
                component="img"
                src={friend.profilePicture}
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
                  {friend.username}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontSize={"0.8em"}
                  fontWeight={"400"}
                >
                  {lastMessage && lastMessage.latestMsg
                    ? `${lastMessage.latestMsg.senderID.username} : ${lastMessage.latestMsg.content}`
                    : "No messages yet"}
                </Typography>
                {!lastMessage?.openedBy.includes(auth.userAuth.id) && (
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

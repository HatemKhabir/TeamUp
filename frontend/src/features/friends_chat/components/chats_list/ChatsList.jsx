import React from "react";
import styles from "./ChatsList.module.css";
import { Box, Button, Typography } from "@mui/material";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ChatsList({ friendsList, friendships }) {
  const navigate = useNavigate();

  const handleFriendClick = (friendshipId) => {
    //navigate(`/friends-chats/${friendshipId}`);
    console.log(friendshipId)
  };

  return (
    <Box className={styles.chats_list}>
      <Box className={styles.chats_list_title}>
        <Typography variant="subtitle2">{friendsList.length} CHATS</Typography>
      </Box>
      {friendsList && (
        <Box>
          {friendsList.map((friend, index) => (
            <div
              className={styles.friend_box}
              key={index}
              onClick={() => handleFriendClick(friendships.find(friendship=>friendship.recipient==friend._id||friendship.sender==friend._id).chat)}
              style={{ cursor: "pointer" }}
            >
              <Box
                component="img"
                src={friend.profilePicture}
                className={styles.friend_image}
              />
              <Typography variant="subtitle1" sx={{ fontSize: "0.8em" }}>
                {friend.username}
              </Typography>
            </div>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ChatsList;

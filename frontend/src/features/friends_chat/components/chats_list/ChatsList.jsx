import React from 'react'
import styles from './ChatsList.module.css'
import { Box, Button, Typography } from '@mui/material'
import { IoMdAddCircle } from 'react-icons/io'

function ChatsList({friendsList}) {
  return (
    <Box className={styles.chats_list}>
        <Box className={styles.chats_list_title}>
            <Typography variant='subtitle2'>5 CHATS</Typography>
            <IoMdAddCircle title='New Message' cursor='pointer' className={styles.new_message_logo}/>

        </Box>
        {friendsList&& <Box>
        {friendsList.map((friend,index)=>(
            <div className={styles.friend_box} key={index}><Box component="img" src={friend.img} className={styles.friend_image} />
            <Typography variant='subtitle1' sx={{fontSize:'0.8em'}}>{friend.name}</Typography></div>
        ))}      
        </Box>}
        
    </Box>
  )
}

export default ChatsList
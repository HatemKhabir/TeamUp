import styles from './Messages.module.css'
import {Box, Typography} from '@mui/material'
function Messages({sender}) {
    const msgImage="https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1"
    return (
    <Box className={sender?styles.sender_message_box:styles.receiver_message_box}>
        <Box component='img' src={msgImage} className={styles.messages_image}/>
        <Box className={sender?styles.message_content_box_sender:styles.message_content_box_receiver}><Typography variant='body2'>User Message Is Typed Here</Typography></Box>
    </Box>
  )
}

export default Messages
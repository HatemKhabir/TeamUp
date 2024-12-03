import styles from './Messages.module.css'
import {Box, Typography} from '@mui/material'
function Messages({ sender, content, senderImg }) {
  return (
    <Box className={sender ? styles.sender_message_box : styles.receiver_message_box}>
      <Box component="img" src={senderImg} className={styles.messages_image} />
      <Box className={sender ? styles.message_content_box_sender : styles.message_content_box_receiver}>
        <Typography variant="body2">{content}</Typography>
      </Box>
    </Box>
  );
}

export default Messages;

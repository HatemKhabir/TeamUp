import { Box } from '@mui/material'
import styles from './ChatBox.module.css'
import MessagesContainer from './sub-components/MessagesContainer/MessagesContainer'
import MessageInput from './sub-components/MessageInput/MessageInput'

function ChatBox() {
  return (
    <Box className={styles.common_chat_box}>
        <MessagesContainer/>
        <MessageInput/>
    </Box>
  )
}

export default ChatBox
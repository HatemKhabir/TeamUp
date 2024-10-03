import { Box } from '@mui/material'
import styles from './PrivateChats.module.css'
import ChatsList from '../components/chats_list/ChatsList'
import CommonHeader from '../../../components/Header/CommonHeader'
import ChatBox from '../../../components/ChatBox/ChatBox'

function PrivateChats() {
  const friendsList=[
    {
      img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
      name: "Abdullah",
    },
    {
      img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
      name: "Hamid",
    }, {
        img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
        name: "Hamid",
      }, {
        img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
        name: "Hamid",
      }, {
        img: "https://th.bing.com/th/id/OIP.2gQ-vmi3bh0WLoAzY27o4gAAAA?pid=ImgDet&w=360&h=360&rs=1",
        name: "Hamid",
      },
  ]
  return (
    <div>
        <header>
          <CommonHeader pageName='game-chat'/>
        </header>
        <Box className={styles.private_chats}>
        <aside className={styles.friends_list_aside}>
          <ChatsList friendsList={friendsList}/>
        </aside>
        <main className={styles.game_chat}>
         <ChatBox/>
        </main>
        </Box>
    </div>
  )
}

export default PrivateChats
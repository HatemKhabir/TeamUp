import { Box, Typography } from '@mui/material'
import styles from './PlayersListModal.module.css'
import { useState } from 'react';
import avatar from '../../assets/avatar.png'

function PlayersListModal({openModal}) {
  const [playersList,setPlayersList] = useState([
    {
      name: "John Doe",
      imgUrl: avatar
    },
    {
      name: "Jane Smith",
      imgUrl: avatar    },
    {
      name: "Mike Johnson",
      imgUrl: avatar    },
    {
      name: "Alice Brown",
      imgUrl: avatar    },
    {
      name: "Chris Lee",
      imgUrl: avatar    }
  ]);
  
  
  return (
    <Box className={openModal?styles.player_modal:styles.player_modal_hidden}>
        {playersList&&playersList.map((player,index)=>(
          <Box key={index} className={styles.player_modal_info}>
            <Box component='img' src={player.imgUrl} className={styles.player_modal_img}/>
            <Typography variant='subtitle1' className={styles.player_modal_name}>{player.name}</Typography>
        </Box>))}
    </Box>
  )
}

export default PlayersListModal
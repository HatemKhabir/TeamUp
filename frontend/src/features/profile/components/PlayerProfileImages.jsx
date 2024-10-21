import { Box, Typography } from '@mui/material'
import styles from './PlayerProfileImages.module.css'
import avatar from '../../../assets/avatar.png'
import ReactCountryFlag from "react-country-flag"


function PlayerProfileImages() {
    const backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY_GZS_UMlBR8TZ7-mRLfyPDheyOUKi7IjQw&s"

  return (
    <Box
    sx={{
      backgroundImage:`url(${backgroundImage})`,
      backgroundSize:'cover',
      backgroundRepeat:'no-repeat',
      opacity:'0.7',
      position:'relative',
      height:'28vh',
      width:'100%',
    }}>
      <Box className={styles.player_profile_name}>
   <Box component='img' src={avatar} className={styles.player_profile_picture}/>
   <Box className={styles.player_profile_details}>
    <Typography variant='h6'>Username<span className={styles.player_profile_country}><ReactCountryFlag svg countryCode="US"/></span></Typography>
    <Typography variant='body1'>One Line Bio</Typography>
    <Typography variant='body2'>Joining Date</Typography>
   </Box>
   </Box>
   </Box>
  )
}

export default PlayerProfileImages
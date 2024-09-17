import { Box, Typography } from '@mui/material';
import volleyballImg from '../../../../assets/volleyball.jpg';
import footballImg from '../../../../assets/football.png';
import basketballImg from '../../../../assets/basketball.webp';
import tabletennisImg from '../../../../assets/tabletennis.jpg';
import padelImg from '../../../../assets/padel.jpg';
import tennisImg from '../../../../assets/tennis.jpg';
import styles from './Header.module.css'

function Header({ sportName }) {
    const headerImages = {
        'volleyball': volleyballImg,
        'football': footballImg,
        'basketball': basketballImg,
        'tabletennis': tabletennisImg,
        'padel': padelImg,
        'tennis': tennisImg
    };

    const imgUrl = headerImages[sportName] || null;

    return (
        <div className={styles.header}>
            {imgUrl && (
                <Box
                    className={styles.header_box}
                    style={{
                        backgroundImage: `url(${imgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: '0% 80%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent:'center',
                        height: '17vh',
                        color: 'white',
                        textAlign: 'left',
                    }}
                >
                    <Box className={styles.header_text}>
                      <Typography
                        variant='subtitle1' 
                        style={{
                            fontWeight: 'normal',
                            fontSize: '16px', 
                        }}
                        className={styles.header_title}
                    >
                        Public Games
                    </Typography>
                   
                    <Typography
                        variant='h4'
                        style={{
                            fontWeight: 'bold',
                            marginBottom: '8px', 
                        }}
                        className={styles.header_title}

                    >
                        {sportName}
                    </Typography>
                    </Box>
                  
                </Box>
            )}
        </div>
    );
}

export default Header;
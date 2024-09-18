import { Box, Typography } from '@mui/material';
import explorePage from '../../assets/explorePage.jpg'
import chatPage from '../../assets/chatPage.png'
import styles from './CommonHeader.module.css'

function CommonHeader({pageName}) {
    const headerImages = {
        'explore': explorePage,
        'game-chat':chatPage
    };
    const imgUrl = headerImages['explore'] || null;

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
                        variant='h4'
                        style={{
                            fontWeight: 'bold',
                            marginBottom: '8px', 
                        }}
                        className={styles.header_title}

                    >
                        {pageName=='explore'?'Public Games':pageName=='game-chat'?'Game Lobby':''}
                    </Typography>
                    </Box>
                  
                </Box>
            )}
        </div>
    );
}

export default CommonHeader;
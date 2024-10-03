import { Box, Typography } from '@mui/material';
import explorePage from '../../assets/explorePage.jpg'
import styles from './CommonHeader.module.css'

function CommonHeader() {
    const headerImages = {
        'explore': explorePage,
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
                        Public Games
                    </Typography>
                    </Box>
                  
                </Box>
            )}
        </div>
    );
}

export default CommonHeader;
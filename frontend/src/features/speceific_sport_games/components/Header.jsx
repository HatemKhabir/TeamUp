import { Typography } from '@mui/material';
import volleyballImg from '../../../assets/volleyball.jpg';
import footballImg from '../../../assets/football.png';
import basketballImg from '../../../assets/basketball.webp';
import tabletennisImg from '../../../assets/tabletennis.jpg';
import padelImg from '../../../assets/padel.jpg';
import tennisImg from '../../../assets/tennis.jpg';

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
        <div>
            {imgUrl && <img src={imgUrl} alt={`${sportName} header`} style={{ maxWidth: '100%', height: 'auto' }} />}
            <Typography variant='h2'>{sportName}</Typography>
        </div>
    );
}

export default Header;
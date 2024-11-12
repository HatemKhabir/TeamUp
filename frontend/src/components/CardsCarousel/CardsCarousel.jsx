import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import styles from './CardsCarousel.module.css'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';import GameCards from "../Cards/GameCards";
import { breakpoints } from "@mui/system";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
const CardsCarousel = ({ gameDetailsList=[] }) => {
  
  const settings = {
    dots: true, 
    infinite: false,
    speed: 500, 
    slidesToShow: 4, 
    slidesToScroll: 1, 
    responsive: [
      {
        breakpoint: 920, // For mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint:1240,
        settings:{
          slidesToShow:3,
          slidesToScroll:3
        }
      }, {
        breakpoint:624,
        settings:{
          slidesToShow:1,
          slidesToScroll:1
        }
      },
     
    ]
  }; 


 
   return (
    <Box className={styles.landing_page_cards}>
      <Slider {...settings} className={styles.carousel_styles}>
        {gameDetailsList.length > 0 ? (
          gameDetailsList.map((game, index) => (
            <Box key={index} sx={{ margin: '0px 35px', overflow: 'visible', height: '340px' }}>
              <GameCards gameDetails={game} />
            </Box>
          ))
        ) : (
          <Typography variant="body2" align="center">
            No games available at the moment.
          </Typography>
        )}
      </Slider>
    </Box>
  );
};


export default CardsCarousel;

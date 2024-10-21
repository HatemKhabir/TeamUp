import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import styles from './CardsCarousel.module.css'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';import GameCards from "../Cards/GameCards";
import { breakpoints } from "@mui/system";
const CardsCarousel = ({ gameDetailsList }) => {
  const settings = {
    dots: true, // Pagination dots
    infinite: false, // Carousel won't loop
    speed: 500, // Transition speed
    slidesToShow: 4, // Number of cards visible at once
    slidesToScroll: 1, // Number of cards to scroll at once
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />,
    dotsClass:`slick-dots ${styles.slickdots}`, // Custom previous arrow
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
          slidesToScroll:3
        }
      },
     
    ]
  };

  return (
    <Box className={styles.landing_page_cards}>
      <Slider {...settings} className={styles.carousel_styles}>
        {gameDetailsList && gameDetailsList.map((game, index) => (
         <Box key={index} sx={{ margin: '0px 35px',overflow:'visible',height:'340px' }}> {/* Custom width of carousel item */}
         <GameCards gameDetails={game} />
       </Box>))}
      </Slider>
    </Box>
  );
};

// Custom arrows for the carousel
const NextArrow = ({ onClick }) => {
  return (
    <div className={styles.nextArrow} onClick={onClick}>
      <ArrowCircleRightOutlinedIcon color='success'/>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <ArrowCircleLeftOutlinedIcon color='success'/>
    </div>
  );
};

export default CardsCarousel;

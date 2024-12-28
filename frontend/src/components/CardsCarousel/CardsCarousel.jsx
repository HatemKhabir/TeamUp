import React, { useEffect, useState } from 'react';
import styles from './CardsCarousel.module.css';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import GameCards from '../Cards/GameCards';

function CardsCarousel({ gameDetailsList }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = React.useRef(null);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth <= 600) {
        setItemsPerView(1);
      } else if (window.innerWidth <= 900) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Fix maxIndex calculation to prevent swiping when no more cards
  const maxIndex = Math.max(0, Math.ceil(gameDetailsList.length - itemsPerView));

  // Reset currentIndex if it's beyond maxIndex (e.g., after screen resize)
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
    console.log(currentIndex) 
  }, [maxIndex, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  // Check if we can move forward
  const canMoveNext = currentIndex < maxIndex && gameDetailsList.length > itemsPerView;

  const translateValue = -currentIndex * (100 / itemsPerView);

  return (
    <Box className={styles.carousel_container}>
      <IconButton 
        className={styles.arrow_button}
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        <ArrowBack />
      </IconButton>

      <Box className={styles.carousel_viewport} ref={carouselRef}>
        <Box 
          className={styles.carousel_track}
          sx={{ transform: `translateX(${translateValue}%)` }}
        >
          {gameDetailsList.map((gameDetails, index) => (
            <Box 
              key={index}
              className={styles.carousel_item}
            >
              <GameCards gameDetails={gameDetails} />
            </Box>
          ))}
        </Box>
      </Box>

      <IconButton 
        className={styles.arrow_button}
        onClick={handleNext}
        disabled={!canMoveNext}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
}

export default CardsCarousel;

import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import styles from './SportGames.module.css'
import GameCards from '../../../components/Cards/GameCards';
import { Box, Button,Typography, Menu, MenuItem, Chip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SideBar from '../../../components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import { fetchSportSpecificAPI } from '../services/sportGames';
import useMediaQuery from '@mui/material/useMediaQuery';
import basketLogo from "../../../assets/basketLogo.png";
import footballLogo from "../../../assets/footballLogo.png";
import volleyLogo from "../../../assets/volleyLogo.png";
import ttlogo from "../../../assets/ttlogo.png";
import tennisLogo from "../../../assets/tennisLogo.png";
import padelLogo from "../../../assets/padelLogo.png";



function SportGames() {
  const { sportName } = useParams();
  const [gameDetailsList,setGameDetailsList]=useState([]);
  const [sortedGames, setSortedGames] = useState([]);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('date-asc'); // default sort
  const [activeSkillFilters, setActiveSkillFilters] = useState([]);
  const skillLevels = ['Beginners', 'Average', 'Semi-Pro', 'Professional'];
  const isMobile = useMediaQuery('(max-width:768px)');

  const sportsLogos = [
    { sport: "volleyball", logo: volleyLogo },
    { sport: "football", logo: footballLogo },
    { sport: "tennis", logo: tennisLogo },
    { sport: "tabletennis", logo: ttlogo },
    { sport: "padel", logo: padelLogo },
    { sport: "basketball", logo: basketLogo },
  ];

  // Menu handling
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  // Sorting function
  const handleSort = (sortType) => {
    let sorted = [...gameDetailsList];
    
    switch (sortType) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }

    setSortBy(sortType);
    setSortedGames(sorted);
    handleSortClose();
  };

  const handleSkillFilter = (skill) => {
    setActiveSkillFilters(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill);
      }
      return [...prev, skill];
    });
  };

  useEffect(()=>{
  const fetchGames=async()=>{
    const response=await fetchSportSpecificAPI(sportName);
    if (response){
      setGameDetailsList(response);
      // Initial sort by date ascending
      const initialSorted = [...response].sort((a, b) => new Date(a.date) - new Date(b.date));
      setSortedGames(initialSorted);
    }
  }
  fetchGames();
  },[sportName])
  
  // Get sort label for button
  const getSortLabel = () => {
    switch (sortBy) {
      case 'price-asc':
        return 'Price: Low to High';
      case 'price-desc':
        return 'Price: High to Low';
      case 'date-asc':
        return 'Date: Earliest First';
      case 'date-desc':
        return 'Date: Latest First';
      default:
        return 'Sort By';
    }
  };

  useEffect(() => {
    let filtered = [...gameDetailsList];
    
    // Apply skill filters
    if (activeSkillFilters.length > 0) {
      filtered = filtered.filter(game => 
        game.skillLevel.some(skill => activeSkillFilters.includes(skill))
      );
    }
    
    // Apply existing sort
    // ... your existing sort logic

    setSortedGames(filtered);
  }, [gameDetailsList, sortBy, activeSkillFilters]);

  return (
      <div className={styles.sports_games}>
          <header>
              <Header sportName={sportName} />
          </header>
          
          {isMobile && (
            <Box className={styles.mobile_sports_list}>
              {sportsLogos.map((sport) => (
                <Box
                  key={sport.sport}
                  onClick={() => navigate(`/${sport.sport}`)}
                  className={`${styles.mobile_sport_item} ${
                    sportName === sport.sport ? styles.mobile_sport_selected : ''
                  }`}
                >
                  <img 
                    src={sport.logo} 
                    alt={sport.sport} 
                    className={styles.mobile_sport_icon}
                  />
                  <Typography variant="caption">
                    {sport.sport.charAt(0).toUpperCase() + sport.sport.slice(1)}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{display:'flex'}}>
          {!isMobile && (
            <aside className={styles.games_list_aside}><SideBar sportName={sportName}/></aside>
          )}
          <main className={isMobile ? styles.games_list_main_mobile : styles.games_list_main}>
            <Box className={styles.games_page_infos}>
              <Typography variant='body2' sx={{marginLeft: isMobile ? '10px' : '20px'}}>{sortedGames.length} Games 
              </Typography>

              <Box className={styles.filters_container}>
                {skillLevels.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    clickable
                    size={isMobile ? "small" : "medium"}
                    onClick={() => handleSkillFilter(skill)}
                    className={styles.filter_chip}
                    sx={{
                      backgroundColor: activeSkillFilters.includes(skill) 
                        ? '#4CC47C' 
                        : 'white',
                      color: activeSkillFilters.includes(skill) 
                        ? 'white' 
                        : '#666',
                      border: '1px solid #4CC47C',
                      '&:hover': {
                        backgroundColor: activeSkillFilters.includes(skill) 
                          ? '#45b371' 
                          : '#f5f5f5',
                      }
                    }}
                  />
                ))}
              </Box>

              <Button 
                className={styles.sorting_button} 
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleSortClick}
                size={isMobile ? "small" : "medium"}
              >
                {getSortLabel()}
              </Button>

              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={handleSortClose}
              >
                <MenuItem onClick={() => handleSort('price-asc')}>
                  Price: Low to High
                </MenuItem>
                <MenuItem onClick={() => handleSort('price-desc')}>
                  Price: High to Low
                </MenuItem>
                <MenuItem onClick={() => handleSort('date-asc')}>
                  Date: Earliest First
                </MenuItem>
                <MenuItem onClick={() => handleSort('date-desc')}>
                  Date: Latest First
                </MenuItem>
              </Menu>
            </Box>
            {sortedGames.length>0 ? 
                <Box className={styles.game_cards_container}>
              {sortedGames.map((game, index) => (
                  <GameCards key={index} gameDetails={game} joined={game.joined} />
              ))
              }</Box>:
              <Box
                    sx={{
                      border: "2px solid black",
                      marginBottom: "30px",
                      marginTop:'30px',
                      textAlign:'center',
                      alignSelf:'center',
                      padding: "30px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        textAlign: "center",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      No Available Public Games yet !{" "}
                    </Typography>
                  </Box>}
          </main>
          </Box>
      </div>
  );
}

export default SportGames;
import { Box } from "@mui/material";
import basketLogo from "../../assets/basketLogo.png";
import footballLogo from "../../assets/footballLogo.png";
import volleyLogo from "../../assets/volleyLogo.png";
import ttlogo from "../../assets/ttlogo.png";
import tennisLogo from "../../assets/tennisLogo.png";
import padelLogo from "../../assets/padelLogo.png";
import styles from './SideBar.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideBar({landingPage=false}) {
  const navigate=useNavigate()
  const sportsLogos = [
    { sport: "volleyball", logo: volleyLogo },
    { sport: "football", logo: footballLogo },
    { sport: "tennis", logo: tennisLogo },
    { sport: "tabletennis", logo: ttlogo },
    { sport: "padel", logo: padelLogo },
    { sport: "basketball", logo: basketLogo },
  ];
  const [selectedSport, setSelectedSport] = useState(null); 

  const handleSelect = (sport) => {
    setSelectedSport(sport);
    navigate(`/${sport}`)
  };

  return (
    <Box className={landingPage?styles.landingPage:styles.sidebar}>
      {sportsLogos.map((sports, index) => (
        <Box
          key={index}
          component="button"
          className={`${styles.sidebar_button} ${
            selectedSport === sports.sport ? styles.selected : ""
          }`} 
          onClick={() => handleSelect(sports.sport)}
        >
          <Box
            component="img"
            src={sports.logo}
            alt={sports.sport}
            className={styles.sidebar_picture}
          />
        </Box>
      ))}
    </Box>
  );
}

export default SideBar;
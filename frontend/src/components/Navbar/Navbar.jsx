import { useState } from "react";
import styles from "./Navbar.module.css";
import { Badge, Button, Link, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import NavbarSearch from "./Navbar-Search/NavbarSearch";
import TextsmsIcon from '@mui/icons-material/Textsms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { color } from "@mui/system";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const nav=useNavigate()
  const [isAuth, setIsAuth] = useState(false);
  
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1 className={styles.logo_text}>TeamUp</h1>
      </div>
      <div className={styles.navbar_search}>
        <NavbarSearch />
      </div>
      {!isAuth ? (
        <div className={styles.nav_buttons}>
          <Link
            className={styles.auth_button}
            onClick={() => setIsAuth(!isAuth)}
          >
            Login
          </Link>
          <span className={styles.auth_divider}>|</span>
          <Link className={styles.auth_button}>SignUp</Link>
        </div>
      ) : (
        <div className={styles.logged_in_elements}>
          <div className={styles.logged_in_texts}>
            {/* Link for Host Game */}
            <Typography className={styles.logged_in_text} variant="body1">
              <Link to="/host-game" className={styles.link}>HOST GAME</Link>
            </Typography>
            <span className={styles.auth_divider}>|</span>
            {/* Link for My Games */}
            <Typography className={styles.logged_in_text} variant="body1">
              <Link to="/" className={styles.link}>MY GAMES</Link>
            </Typography>
          </div>
          <div className={styles.logged_in_buttons}>
            {/* Icon with Badge for Messages */}
            <Link to="/friends-chat">
      <Badge badgeContent={4} color="error" sx={{ width: "fit-content",cursor:'pointer',transition:'all 0.3s ease-in' }} className={styles.navbar_logos}>
        <TextsmsIcon sx={{ color: "white" }} />
      </Badge>
    </Link>

            <Badge badgeContent={0} color="error" sx={{ width: "fit-content",cursor:'pointer',transition:'all 0.3s ease-in' }} className={styles.navbar_logos}>
              <NotificationsIcon sx={{ color: "white" }} />
            </Badge>
            <AccountCircleIcon sx={{ color:'white', width: "fit-content",cursor:'pointer',transition:'all 0.3s ease-in' }} className={styles.navbar_logos}/>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default Navbar;

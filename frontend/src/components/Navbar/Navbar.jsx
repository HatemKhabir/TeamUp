import { useState } from "react";
import styles from "./Navbar.module.css";
import { Badge, Button, Link, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import NavbarSearch from "./Navbar-Search/NavbarSearch";
import TextsmsIcon from '@mui/icons-material/Textsms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { color } from "@mui/system";
function Navbar() {
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
          <Typography className={styles.logged_in_text} variant="body1">
            HOST GAME
          </Typography>
          <span className={styles.auth_divider}>|</span>
          <Typography className={styles.logged_in_text} variant="body1">
            MY GAMES
          </Typography>
          </div>
          <div className={styles.logged_in_buttons}>
          <Badge badgeContent={4} color="error" sx={{width:"fit-content"}}>
          <TextsmsIcon sx={{color:"white"}}/>
          </Badge>
            <Badge badgeContent={0} color="error" sx={{width:"fit-content"}} >
            <NotificationsIcon sx={{color:"white"}}/>
            </Badge>
            <AccountCircleIcon sx={{color:"white"}}/>
            
            </div> 
        </div>
      )}
    </div>
  );
}

export default Navbar;

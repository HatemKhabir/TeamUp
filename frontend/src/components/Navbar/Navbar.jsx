import { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { Badge, Button, Link, Menu, MenuItem, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import NavbarSearch from "./Navbar-Search/NavbarSearch";
import TextsmsIcon from '@mui/icons-material/Textsms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { color } from "@mui/system";
import { replace, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
function Navbar() {
  const nav=useNavigate()
  const [isAuth, setIsAuth] = useState(localStorage.getItem('userAuth')?true:false);
  const [anchorEl, setAnchorEl] = useState(null);
  const auth=useContext(AuthContext)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
   
  const handleLogout=async()=>{
  try{
   const response=await auth.signOut()
   console.log(response)
   nav('/auth')
  }catch(e){
    console.log(e.message)
  }
  }


  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1 onClick={()=>nav('/')} className={styles.logo_text}>TeamUp</h1>
      </div>
      <div className={styles.navbar_search}>
        <NavbarSearch />
      </div>
      {!isAuth ? (
        <div className={styles.nav_buttons}>
          <Link
          href='/auth'
            className={styles.auth_button}
          >
            Login
          </Link>
          <span className={styles.auth_divider}>|</span>
          <Link 
          href='/auth'
          className={styles.auth_button}>SignUp</Link>
        </div>
      ) : (
        <div className={styles.logged_in_elements}>
          <div className={styles.logged_in_texts}>
            {/* Link for Host Game */}
            <Typography className={styles.logged_in_text} variant="body1">
              <Link href="/host-game" className={styles.link}>HOST GAME</Link>
            </Typography>
          </div>
          <div className={styles.logged_in_buttons}>
            {/* Icon with Badge for Messages */}
            <Link to="/friends-chat">
      <Badge badgeContent={0} color="error"  sx={{ width: "fit-content",cursor:'pointer',transition:'all 0.3s ease-in',marginRight:'10px' }} className={styles.navbar_logos}>
        <TextsmsIcon onClick={()=>nav('/friends-chat')} sx={{ color: "white" }} />
      </Badge>
    </Link>
        <AccountCircleIcon    aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
         sx={{ color:'white', width: "fit-content",cursor:'pointer',transition:'all 0.3s ease-in' }} className={styles.navbar_logos}/>
            <Menu
        className={styles.profile_menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{nav(`/profile/${auth.userAuth.username}`);}}>Profile</MenuItem>
        <MenuItem onClick={()=>{nav('/personal-games'),replace}}>My Matches</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default Navbar;

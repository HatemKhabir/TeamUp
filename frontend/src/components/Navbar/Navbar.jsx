import { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Badge, Button, Link, Menu, MenuItem, Typography, Popover, Box } from "@mui/material";
import Divider from '@mui/material/Divider';
import NavbarSearch from "./Navbar-Search/NavbarSearch";
import TextsmsIcon from '@mui/icons-material/Textsms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { color } from "@mui/system";
import { replace, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import axiosInstance from "../../../libs/axios";
import { acceptInvite, declineInvite } from "../../features/profile/components/profile_header/services/profileDetails";
import { SocketContext } from "../../contexts/SocketContext";

function Navbar() {
  const nav=useNavigate()
  const [isAuth, setIsAuth] = useState(localStorage.getItem('userAuth')?true:false);
  const [anchorEl, setAnchorEl] = useState(null);
  const loggedinUserId = isAuth
    ? JSON.parse(localStorage.getItem('userAuth')).id
    : null;

  const [unreadMsgs, setUnreadMsgs] = useState(0);
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
  
  const [pendingInvites, setPendingInvites] = useState([]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const socket = useContext(SocketContext);

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleAcceptInvite = async (inviteId) => {
    try {
      await acceptInvite(inviteId);
      setPendingInvites(prev => prev.filter(invite => invite._id !== inviteId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectInvite = async (inviteId) => {
    try {
      await declineInvite(inviteId);
      setPendingInvites(prev => prev.filter(invite => invite._id !== inviteId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPendingInvites = async () => {
      try {
        const response = await axiosInstance.get('/api/users/pending-invites',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data)
        setPendingInvites(response.data.data);
      } catch (error) {
        console.error('Error fetching pending invites:', error);
      }
    };

    if (isAuth) {
      fetchPendingInvites();
    }
  }, [isAuth]);

  useEffect(() => {
    if (auth.userAuth?.userChats) {
      const loggedInUserId = auth.userAuth.id;
      const unread = auth.userAuth.userChats.filter(
        (chat) => !chat.openedBy.includes(loggedInUserId)
      );
      setUnreadMsgs(unread.length);
    }
  }, [auth.userAuth?.id, auth.userAuth?.userChats]);

  useEffect(() => {
    if (socket) {
      console.log('Socket in Navbar:', socket.id);
      
      socket.on('newFriendRequest', (newRequest) => {
        console.log('Navbar received friend request:', newRequest);
        setPendingInvites(prev => [...prev, newRequest]);
      });

      return () => {
        socket.off('newFriendRequest');
      };
    }
  }, [socket]);

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1 onClick={()=>nav('/dashboard')} className={styles.logo_text}>TeamUp</h1>
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
          <a href="/host-game" className={styles.link}>
          <div className={styles.logged_in_texts}>
            {/* Link for Host Game */}
            <Typography className={styles.logged_in_text} variant="body1">
              HOST GAME
            </Typography>
          </div>
          </a>
          <div className={styles.logged_in_buttons}>
            {/* Icon with Badge for Messages */}
            <Link to="/friends-chat">
      <Badge badgeContent={unreadMsgs} color="error"  sx={{ width: "fit-content",cursor:'pointer',transition:'all 0.3s ease-in',marginRight:'10px' }} className={styles.navbar_logos}>
        <TextsmsIcon onClick={()=>nav('/friends-chat')} sx={{ color: "white" }} />
      </Badge>
    </Link>

            {/* Notifications Icon */}
            <Badge 
              badgeContent={pendingInvites.length} 
              color="error" 
              sx={{ width: "fit-content", cursor: 'pointer', marginRight: '10px' }} 
              className={styles.navbar_logos}
            >
              <NotificationsIcon 
                onClick={handleNotificationClick}
                sx={{ color: "white" }} 
              />
            </Badge>

            {/* Notifications Popover */}
            <Popover
              open={Boolean(notificationAnchorEl)}
              anchorEl={notificationAnchorEl}
              onClose={handleNotificationClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{width:300}}
            >
              <Box sx={{ maxHeight: 400, overflow: 'auto', p: 2,display:'flex',flexDirection:'column',gap:2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Friend Requests</Typography>
                {pendingInvites.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No pending requests</Typography>
                ) : (
                  pendingInvites.map((invite) => (
                    <>
                    <div
              key={invite._id}
              onClick={()=>window.location.href=`/profile/${invite.sender.username}`}
              className="flex items-center gap-10 p-1 rounded-lg transition-colors hover:bg-light-blue cursor-pointer"
            >
             <div className="w-fit h-15 bg-muted rounded-full flex items-center justify-center">
          <img src={invite.sender.profilePicture} alt="Profile" className="w-16 h-16 rounded-full" />
        </div>
              <div className="flex-1">
                <h4 className="font-medium">{invite.sender.username}</h4>
              </div>
            </div>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                          size="small" 
                          variant="contained" 
                          color="success"
                          onClick={() => handleAcceptInvite(invite._id)}
                        >
                          Accept
                        </Button>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          color="error"
                          onClick={() => handleRejectInvite(invite._id)}
                        >
                          Decline
                        </Button>
                      </Box>
                    </>
                  ))
                )}
              </Box>
            </Popover>

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

import styles from "./ProfileDetails.module.css";
import padelLogo from "../../../../../assets/padelLogo.png";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Typography } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import MessageIcon from "@mui/icons-material/Message";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { countryCodeMap } from "../../../../../../constants/countryCode";
import { acceptInvite, checkFriendStatus, declineInvite, removeFriendApi, sendFriendInviteApi } from "../services/profileDetails";

function ProfileDetails({profileId,playerData }) {

  const [isFriend, setIsFriend] = useState(false);
  const [invitePending,setInvitePending]=useState(false);
  const [recipient,setIsRecipient]=useState(false)
  const [inviteId,setInviteId]=useState('')
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPersonal, setIsPersonal] = useState(false);
  
  async function handleAddFriend(friendId) {
      const addFriendResponse=await sendFriendInviteApi(friendId);
      if (addFriendResponse)
        setInvitePending(true)
      else 
      console.log(addFriendResponse);
  }
  async function handleAcceptInvite(friendId) {
    try{
       const response=await acceptInvite(friendId)
       console.log(response)
       window.location.reload()
    }catch(e){
      console.error(e)
    }
  }
  async function handleRejectInvite(friendId) {
    try{
      const response=await declineInvite(friendId)
      console.log(response)
      window.location.reload()
   }catch(e){
     console.error(e)
   }
  }
  async function removeFriend(friendUsername) {
    try{
       const response=await removeFriendApi(friendUsername)
       window.location.reload()

       console.log(response) 
    }catch(e){
      console.error(e)
    }
    
  }
  useEffect(() => {
    if (auth.userAuth && auth.userAuth.username === profileId) {
      setIsPersonal(true);
    }
    const checkFriend=async()=>{
     try{
      const friendStatus=await checkFriendStatus(profileId)
      if (friendStatus.status=='pending'){
        if(auth.userAuth.id==friendStatus.recipient)
          setIsRecipient(true)
        setInviteId(friendStatus._id)
      setInvitePending(true)
      
    }
      if (friendStatus.status=='accepted')
        setIsFriend(true)
      
     }catch(e){
      console.error(e)
     }
    }
    checkFriend()
  }, [auth.userAuth, playerData, profileId]);
  return (
    <Box className={styles.profile_details}>
      <Box
        component="img"
        src={playerData?.coverPic}
        className={styles.player_profile_cover}
      />
      <Box className={styles.player_profile_image}>
        <Box
          component="img"
          src={playerData?.profilePic}
          className={styles.player_profile_pic}
        />
        <Box className={styles.player_profile_buttons}>
          <Box className={styles.player_profile_details}>
            <Typography variant="h6">
            {playerData?.username || 'Username not available'}
            <span className={styles.player_profile_country}>
            {playerData?.country && countryCodeMap[playerData.country] && (
              <ReactCountryFlag svg countryCode={countryCodeMap[playerData.country]} />
            )}</span>
            </Typography>
            <Typography variant="caption" sx={{ textAlign: "left" }}>
            {playerData?.bio || 'No bio available'}
            </Typography>
            <br />
            <Typography variant="caption">          {playerData?.joinDate || 'Joining date not available'}
            </Typography>
          </Box>
          <Box sx={{ width: "fit-content", display: "flex" }}>
            {!isPersonal? !isFriend ? (invitePending ? recipient ? (
                 <Box sx={{ width: "fit-content", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                 <Button
                   variant="outlined"
                   color="success"
                   onClick={() => handleAcceptInvite(inviteId)}
                   sx={{ width: "fit-content", textWrap: "nowrap" }}
                 >
                   Accept Invite
                 </Button>
                 <Button
                   variant="outlined"
                   color="error"
                   onClick={() => handleRejectInvite(inviteId)}
                   sx={{ width: "fit-content", textWrap: "nowrap" }}
                 >
                   Reject Invite
                 </Button>
               </Box>
            ) :
            (
              <Box sx={{ width: "fit-content", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                color="success"
                sx={{ width: "fit-content", textWrap: "nowrap" }}
              >
                Invite Pending
              </Button>  
            </Box>
         ): 
            <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            color="success"
            onClick={() => handleAddFriend(playerData?.username)}
            sx={{ width: "fit-content", textWrap: "nowrap" }}
          >
            Add Friend
          </Button>):
          (
              <Box sx={{ width: "fit-content", display: "flex", gap: "10px",flexWrap:'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<PersonRemoveIcon />}
                  color="error"
                  onClick={() => {
                    removeFriend(playerData?.username);
                  }}
                  sx={{ width: "fit-content", textWrap: "nowrap" }}
                >
                  Remove Friend
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MessageIcon />}
                  color="primary"
                  onClick={()=>window.location.href='/friends-chat'}
                  sx={{ width: "fit-content", textWrap: "nowrap" }}
                >
                  Send Message
                </Button>
              </Box>
            ):<Button 
            variant="outlined"
            startIcon={<EditIcon />}
            color="primary"
            onClick={()=>navigate(`/edit-profile/${auth.userAuth.username}`)}
            sx={{ width: "fit-content", textWrap: "nowrap" }}
          >
            Edit Profile
              </Button>}
          </Box>
        </Box>
      </Box>
      </Box>
  )
}

export default ProfileDetails
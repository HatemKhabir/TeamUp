import axiosInstance from "../../../../../../libs/axios"

export const sendFriendInviteApi=async(friendToAdd)=>{
    const loggedinUsername=JSON.parse(localStorage.getItem('userAuth')).username;
    const token=localStorage.getItem('token')
    try{
    const response=await axiosInstance.post('/api/users/addFriend',{loggedinUsername,friendToAdd},{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return response.data;
    }catch(e){
        console.error(e)
         throw e;
    }
}

export const checkFriendStatus = async (friendToAdd) => {
    const loggedinUsername = JSON.parse(localStorage.getItem('userAuth')).username;
    const token = localStorage.getItem('token');
    
    try {
      const response = await axiosInstance.get('/api/users/friendStatus', {
        params: {
          loggedinUsername,
          friendToAdd,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is correctly passed
        },
      });
      return response.data;
    } catch (e) {
      console.error('Error fetching friend status:', e);
      throw e;
    }
  };
  
  export const acceptInvite = async (inviteId) => {
    const token = localStorage.getItem('token'); 
    try {
      const response = await axiosInstance.patch(
        '/api/users/addFriend',
        { inviteId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      alert(response.data.message || "Friendship accepted successfully!");
      return response.data;
    } catch (error) {
      console.error("Error accepting the invite:", error);
      alert(error.response?.data?.message || "Failed to accept the invite.");
      throw error; // Optionally rethrow the error for further handling
    }
  };
  
  // When using axiosInstance.delete, the second parameter is treated as the request body, 
  //not the headers. Since you're not sending a request body in a DELETE call, 
  //you need to structure the call slightly differently.
  export const declineInvite = async (inviteId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axiosInstance.delete('/api/users/addFriend', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          inviteId, // Pass inviteId as a query parameter
        },
      });
  
      alert(response.data.message || "Invite declined successfully!");
      return response.data;
    } catch (error) {
      console.error("Error declining the invite:", error);
      alert(error.response?.data?.message || "Failed to decline the invite.");
      throw error;
    }
  };
  

  export const removeFriendApi = async (friendToRemove) => {
    const loggedInUsername = JSON.parse(localStorage.getItem('userAuth')).username;
    const token = localStorage.getItem('token');
  
    try {
      const response = await axiosInstance.delete('/api/users/removeFriend', {
        params: {
          loggedInUsername,
          friendToRemove,
        },
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (e) {
      console.error('Error removing friend:', e);
      throw e;
    }
  };
  
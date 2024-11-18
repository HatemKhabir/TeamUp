import axiosInstance from "../../../../../../libs/axios"

export const sendFriendInviteApi=async(friendUsername)=>{
    const personalUsername=JSON.parse(localStorage.getItem('userAuth')).username;
    const token=localStorage.getItem('token')
    try{
    const response=await axiosInstance.post('/api/users/addFriend',{personalUsername,friendUsername},{
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
import axiosInstance from "../../../../libs/axios"

export const getLastMessageApi=async(friendshipsChats)=>{
    const token=localStorage.getItem('token')
    try{
      const response=await axiosInstance.get('/api/message/lastMessage',{
        params:{friendshipsChats},
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      return response.data
    }catch(e){
       console.error(e)
       throw e
    }
}

export const getLobbiesMessages=async(userId)=>{
  const token=localStorage.getItem('token')
  try{
    const response=await axiosInstance.get('api/message/lobby-chat',{
      params:{userId},
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    if (!response.data) return [];
    if (!Array.isArray(response.data)) {
      console.log('Response data:', response.data);
      return [];
    }
    return response.data.map(match => match.chat).filter(Boolean);
  }catch(e){
    console.error(e);
    throw e
  }
}
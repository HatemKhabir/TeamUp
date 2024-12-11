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
import axiosInstance from "../../../../libs/axios";

export const fetchLobbyMessagesApi = async (chatId) => {
    
  const token = localStorage.getItem("token");
  try {
    const response = await axiosInstance.get("/api/message", {
      params: { chatId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response.data
  } catch (e) {
    console.error(e)
    throw e
}};

export const sendMessageApi=async(chatId,messageContent)=>{
  const token=localStorage.getItem("token");
  const senderID=JSON.parse(localStorage.getItem('userAuth')).id;
  console.log(chatId,messageContent)
  try{
    const response=await axiosInstance.post('/api/message',{chatId,messageContent,senderID},{headers:{
      Authorization:`Bearer ${token}`
    }})
    console.log(response)
    return response;
  }catch(e){
    console.error(e);
    throw e;
  }
}

export const fetchPrivateMessagesApi=async(friendshipId)=>{
  const token=localStorage.getItem('token')
  try{
    const response=await axiosInstance.get('api/message',{
      params:{chatId:friendshipId},
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(response)
    return response.data
  }catch(e){
    console.error(e)
    throw e
  }

}
import { json } from "react-router-dom"
import axiosInstance from "../../../../libs/axios"

export const getGameDetailsbyId=async(gameId)=>{
const token=localStorage.getItem('token')
const loggedinUsername=JSON.parse(localStorage.getItem('userAuth')).username;
console.log(loggedinUsername)
    try {
   const response=await axiosInstance.get('/api/events/game-lobby',{
    params:{gameId},
    headers: {
        Authorization: `Bearer ${token}`, // Include the auth token here
      },
   })
   console.log(response)
    return response.data
} catch (e) {
    console.error(e)
    throw e;
}
}

export const postWinnersAndLosersApi = async (gameId, selectedWinners, losers) => {
    const token = localStorage.getItem('token');
    const loggedinUsername = JSON.parse(localStorage.getItem('userAuth')).username;
    
    try {
      const response = await axiosInstance.patch(
        '/api/events/post-winners',
        { gameId, selectedWinners, losers,loggedinUsername }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data; 
    } catch (e) {
      return e.response.data;
    }
  };
  
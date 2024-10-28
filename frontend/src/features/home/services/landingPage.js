import axiosInstance from "../../../../libs/axios";

export const getPlayerGamesById=async (userId)=>{
    const response = await axiosInstance.get('/api/users/games', {
        params: { id: userId } 
      });
  console.log(userId)

  console.log(response)
  return response

}
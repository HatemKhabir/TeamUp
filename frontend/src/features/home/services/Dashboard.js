import axiosInstance from "../../../../libs/axios";

export const getPlayerGamesById=async (userId)=>{
  const token = localStorage.getItem('token');
  try {
    const response = await axiosInstance.get('/api/users/games', {
      params: { id: userId },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;

  } catch (error) {
    console.error('Error fetching player games:', error);
    throw error;
  }
}

export const getPublicGames=async()=>{
  try{
    const response=await axiosInstance.get('/api/events')
    return response;
  }catch(e){
    console.error('Error Fetching Public Games :',e);
    throw e;
  }
}

export const joinPrivateGame = async (gameId, playerId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axiosInstance.post('/api/events/join-private', 
      { gameId, playerId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (e) {
    console.error('Error Joining Private Game:', e);
    throw e;
  }
}
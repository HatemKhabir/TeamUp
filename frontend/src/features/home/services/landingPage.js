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
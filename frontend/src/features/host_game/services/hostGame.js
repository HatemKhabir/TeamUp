import axiosInstance from "../../../../libs/axios";

export const hostGame = async (gameDetails) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axiosInstance.post('/api/events/create-event', gameDetails,{
      headers: {
        Authorization: `Bearer ${token}`, // Include the auth token here
      },
    });
    return res.data; 
  } catch (error) {
    console.error("Error hosting game:", error);
    throw error;
  }
};

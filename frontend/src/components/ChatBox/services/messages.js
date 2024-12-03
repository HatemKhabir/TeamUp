import axiosInstance from "../../../../libs/axios";

export const fetchLobbyMessagesApi = async (chatId) => {
    
  const token = localStorage.getItem("token");
  const loggedInUserId = JSON.parse(localStorage.getItem("userAuth")).id;
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

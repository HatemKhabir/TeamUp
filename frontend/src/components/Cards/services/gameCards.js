import axiosInstance from "../../../../libs/axios"

export const joinGameApi=async(userId,gameId)=>{
    const token = localStorage.getItem('token');

    try{
     const response = await axiosInstance.post('/api/events/join-event',{userId,gameId},{
        headers: {
            Authorization: `Bearer ${token}`, // Include the auth token here
          },
     })
     return response;
    }catch(e){
        console.error("Error hosting game:", e);
        throw e;
    }
}

export const leaveGameApi = async (userId, gameId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axiosInstance.post(
            '/api/events/leave-event',
            { userId, gameId },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response;
    } catch (e) {
        console.error("Error leaving game:", e);
        throw e;
    }
};
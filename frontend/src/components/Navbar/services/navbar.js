import axiosInstance from "../../../../libs/axios"

export const searchUsersApi=async(q)=>{
    try{
       const response=await axiosInstance.get('/api/users/search-player',{params:{q}})
       return response.data
    }catch(e){
       console.error(e)
       throw e
    }
}

export const getPendingInvitesApi = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axiosInstance.get('/api/users/pending-invites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch invites');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error in getPendingInvitesApi:', error);
    throw error;
  }
};
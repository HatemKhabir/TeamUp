import axiosInstance from "../../../../libs/axios"


export const getPlayerStats=async(playerUsername)=>{
    
    // eslint-disable-next-line no-useless-catch
    try{
    const response=await axiosInstance.get('/api/users/profile',{
        params:{id:playerUsername}
    })
    console.log("this is the call ",response.data)
    return response.data;
    }catch(e){
        throw(e)
    }
}


// Commend player
export const commendPlayerApi = async (username) => {
    try {
      const loggedinId = JSON.parse(localStorage.getItem('userAuth')).id; 
      const response = await axiosInstance.patch(`/api/users/commend/${username}`, {
        commenderId: loggedinId, 
      });
      return response.data;
    } catch (error) {
      console.error('Error commending player:', error);
      throw error;
    }
  };
  
  // Report player
  export const reportPlayerApi = async (username) => {
    try {
      const loggedinId = JSON.parse(localStorage.getItem('userAuth')).id; 
      const response = await axiosInstance.patch(`/api/users/report/${username}`, {
        commenderId: loggedinId, 
      });
      return response.data;
    } catch (error) {
      console.error('Error reporting player:', error);
      throw error;
    }
  };
  
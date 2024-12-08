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
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
import axiosInstance from "../../../../libs/axios"

export const fetchSportSpecificAPI=async(sportName)=>{
    try{
        const response=await axiosInstance.get('/api/events',{params:{sportName}})
    
        return response.data
    }catch(e){
        console.error(e)
    }
}
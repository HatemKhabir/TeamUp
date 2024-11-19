import axiosInstance from "../../../../libs/axios"

export const fetchSportSpecificAPI=async(sportName)=>{
    try{
        const response=await axiosInstance.get('/api/events',{sportName})
        return response

    }catch(e){
        console.error(e)
    }
}
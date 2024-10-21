import axiosInstance from "../../../../libs/axios"

export const signInApi=async(email,password)=>{
const response=axiosInstance.post('/auth/signin',{
    username:email,
    password:password
});
return response;
}

export const signUp = async (email, username, password) => {
    const response = axiosInstance.post('/auth/signup', {
      email: email,
      username: username,
      password: password,
    });
  
    return response;
  };
  
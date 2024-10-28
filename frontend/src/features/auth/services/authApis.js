import axiosInstance from "../../../../libs/axios"

export const signInApi = async (input, password) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  const response = axiosInstance.post('/auth/signin', {
    [isEmail ? 'email' : 'username']: input, 
    password: password
  });
  return response;
};


export const signUp = async (email, username, password) => {
    const response = axiosInstance.post('/auth/signup', {
      email: email,
      username: username,
      password: password,
    });
  
    return response;
  };
  
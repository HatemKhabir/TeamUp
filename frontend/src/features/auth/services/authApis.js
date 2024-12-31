import axiosInstance from "../../../../libs/axios"
import { toast } from "react-hot-toast"

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

export const verifyEmailApi = async (token) => {
  try {
    const response = await axiosInstance.get(`/auth/verify-email/${token}`);
    if (response?.data?.msg) {
      // If verification successful, show success toast and redirect
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 3000
      });
    }
    return response;
  } catch (error) {
    // If verification fails, show error toast
    toast.error(error.response?.data?.msg || 'Verification failed', {
      position: "bottom-right",
      autoClose: 3000
    });
    throw error;
  }
};
  
import React, { createContext, useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";
import { signInApi } from "../features/auth/services/authApis";

export const AuthContext = createContext({
  userAuth: null,
  isAuth: false,
  signIn: () => {},
  signOut: () => {},
});

// Constants for local storage keys
const ACCESS_TOKEN_LOCAL_STORAGE = "accessToken";
const REFRESH_TOKEN_LOCAL_STORAGE = "refreshToken";

export const AuthProvider = (props) => {
  const queryClient = useQueryClient();
  const [userAuth, setUserAuth] = useState(null);
  const [isAuth, setIsAuth] = useState(true);

  const signIn = async (username, password) => {
    try {
      const { data: backendResponse } = await signInApi(username, password);

      if (!backendResponse?.accessToken || !backendResponse?.refreshToken) {
        return { error: 'Sign-in failed. Please check your credentials and try again.' };
      }

      const backendResponseDecoded = jwtDecode(backendResponse.accessToken);

      // Save tokens to local storage
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE, backendResponse.accessToken);
      localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE, backendResponse.refreshToken);

      // Set auth state
      setUserAuth({
        id: backendResponse.id,
        username: backendResponse.username,
        email: backendResponseDecoded.email,
        games: backendResponse.games,
      });
      setIsAuth(true);
    } catch (error) {
      console.error("Sign-in error:", error);
      return { error: 'Sign-in failed. Please check your credentials and try again.' };
    }
  };

 
  const signOut = () => {
    queryClient.clear();

  
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE);
    localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE);

    setUserAuth(null);
    setIsAuth(false);
  };

  // Load the user authentication status from local storage on component mount
  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);

    if (!accessToken) {
      setIsAuth(false);
      setUserAuth(null);
      return;
    }

    setUserAuth({
      id: backendResponse.id,
      username: backendResponse.username,
      email: backendResponseDecoded.email,
      games: backendResponse.games,
    });
    setIsAuth(true);
  }, []);

  // Define the context value to be provided
  const contextValue = {
    userAuth,
    isAuth,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

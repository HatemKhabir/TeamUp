import React, { createContext, useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { signInApi } from "../features/auth/services/authApis";
import {io} from "socket.io-client"

export const AuthContext = createContext();

// Constants for local storage keys
const ACCESS_TOKEN_LOCAL_STORAGE = "token";


export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [userAuth, setUserAuth] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [userGames,setUserGames]=useState([])
  const [publicGames,setPublicGames]=useState([])
  // Sign in function
  const signIn = async (username, password) => {
    try {
      const { data: backendResponse } = await signInApi(username, password);
  
      if (!backendResponse?.token) {
        return { error: "Sign-in failed. Please check your credentials and try again." };
      }
  
      setUserGames(backendResponse.player.matchJoined)
  
      // Save tokens to local storage
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE, backendResponse.token);
      
      const userData = {
        id: backendResponse.player._id,
        username: backendResponse.player.username,
        email: backendResponse.player.email,
        userChats:backendResponse.userChats
      };
  
      setUserAuth(userData);
  
      // Store the user data in local storage
      localStorage.setItem("userAuth", JSON.stringify(userData));
 
  
      setIsAuth(true);
      return { success: true };
    } catch (error) {
      console.error("Sign-in error:", error);
      return { error: "Sign-in failed. Please check your credentials and try again." };
    }
  };
  
  // Sign out function
  const signOut = () => {
    queryClient.clear();
  
    // Remove tokens from local storage
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE);
    localStorage.removeItem("userAuth");
 
    // Reset auth state
    setUserAuth({
      id: '',
      username: '',
      email: '',
      userChats:[],
      games: [],
    });
    setIsAuth(false);
  };
  
  // Load user authentication status from local storage on component mount
  useEffect(() => {
    const user = localStorage.getItem("userAuth");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
  
        setUserAuth({
          id: parsedUser.id,
          username: parsedUser.username,
          email: parsedUser.email,
          userChats:parsedUser.userChats,
          games: parsedUser.games,
        });
  
        setIsAuth(true);
      } catch (error) {
        console.error("Error parsing user from local storage:", error);
        signOut(); // Clear invalid data if parsing fails
      }
    } else {
      setUserAuth(null);  // Set explicitly to null if no user found
    }
  }, []);

  const updateGameDetails = (updatedGame) => {
    setUserGames((prevUserGames) =>
      prevUserGames.map((game) => (game._id === updatedGame._id ? updatedGame : game))
    );
    setPublicGames((prevPublicGames) =>
      prevPublicGames.map((game) => (game._id === updatedGame._id ? updatedGame : game))
    );
  };
  const updateUserChats = (updatedChats) => {
    setUserAuth((prevAuth) => ({
      ...prevAuth,
      userChats: updatedChats,
    }));

    // Persist to local storage
    const updatedUserAuth = {
      ...userAuth,
      userChats: updatedChats,
    };
    localStorage.setItem("userAuth", JSON.stringify(updatedUserAuth));
  };

const updateChat = useCallback((updatedChat) => {
  setUserAuth((prevAuth) => {
    const updatedChats = prevAuth.userChats.map((chat) =>
      chat._id === updatedChat._id ? updatedChat : chat
    );
    return { ...prevAuth, userChats: updatedChats };
  });
}, []);

  // Define the context value to be provided
  const contextValue = {
    userAuth,
    isAuth,
    signIn,
    signOut,
    userGames,
    setUserGames,
    updateUserChats,
    publicGames,
    updateChat,
    updateGameDetails,
    setPublicGames
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

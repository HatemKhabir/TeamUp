import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthProvider";

export const SocketContext = createContext(null);

export const SocketProvider = ({ token, children }) => {
  const [socket, setSocket] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (token && auth.userAuth?.id) {
      const newSocket = io("http://localhost:8080", {
        query: { token },
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        console.log("User ID:", auth.userAuth.id);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      newSocket.on('updatedChat', (updatedChat) => {
        auth.updateChat(updatedChat);
      });

      newSocket.on('newFriendRequest', (request) => {
        console.log('Received friend request:', request);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token, auth.userAuth?.id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

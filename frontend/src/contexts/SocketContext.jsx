import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthProvider";

export const SocketContext = createContext(null);


export const SocketProvider = ({ token, children }) => {
  const [socket, setSocket] = useState(null);
  const auth=useContext(AuthContext)
  useEffect(() => {
    if (token) {
      // Connect to socket only if user is authenticated (token exists)
      const newSocket=io("http://localhost:8080", {
        query: { token },
      });
        setSocket(newSocket)
        newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      newSocket.on('updatedChat',(updatedChat)=>{
        auth.updateChat(updatedChat);
        console.log(updatedChat)
      })
      
      return () => {
        newSocket.disconnect();
        console.log("Socket disconnected on cleanup");
      };
    } else {
      // If no token, ensure no socket is connected
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

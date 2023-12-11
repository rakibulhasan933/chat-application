"use client";
import React, { useCallback, useContext, useEffect } from 'react'
import { io } from "socket.io-client";

interface ISocketContext {
  sendMessage: (mes: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useStock = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);
  return state;
}

function SocketProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const sendMessage: ISocketContext["sendMessage"] = useCallback((mes) => {
    console.log("Send Message", mes)
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    return () => {
      _socket.disconnect();
    }
  }, [])
  return (
    <SocketContext.Provider value={{ sendMessage }}>{children}</SocketContext.Provider>
  )
}

export default SocketProvider
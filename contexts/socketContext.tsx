import React, { createContext, useEffect, useState } from "react";

export const InitSearchWordContext = {
  
};

export interface SocketProps {
  
}
interface SocketContextProps {
  
}

export const SocketContext = createContext<SocketContextProps>(
  InitSearchWordContext
);

const SearchWordProvider = ({ children }: any) => {
  const [ Socket, setSocket] = useState<SocketProps>();

  return (
    <SocketContext.Provider
      value={{ Socket, setSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SearchWordProvider;

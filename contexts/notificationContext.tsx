import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { pusherClient, pusherEvents } from "../utils/pusher";

const initVal = 0;
const defaultInitVal = {
  roomId: [],
  total: 0,
};

interface NotificationContextProps {}

export const NotificationContext = createContext<any>(initVal);

const NotificationProvider = ({ children }: any) => {
  const [Stt, setStt] = useState<any>(0);
  const { data: session } = useSession();

  useEffect(() => {
    if(session?.user?.email){
      pusherClient.subscribe(String(session?.user?.email));
  
      const newMessage = (stream: any) => {
        setStt(Stt + 1);
      };
  
      pusherClient.bind(pusherEvents.NOTIFICATION, newMessage);
      return () => {
        pusherClient.unsubscribe(String(session?.user?.email));
        pusherClient.unbind(pusherEvents.NOTIFICATION, newMessage);
      };
    }
  }, [session]);
  return (
    <NotificationContext.Provider value={{ Stt, setStt }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

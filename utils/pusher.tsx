import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherEvents = {
  NEW_MESSAGE: "messages:new",
  UPDATE_MESSAGE: "message:update",
  REMOVE_MESSAGE: "message:remove",
  NEW_CONVERSATION: "conversation:new",
  UPDATE_CONVERSATION: "conversation:update",
  DELETE_CONVERSATION: "conversation:remove",
  NOTIFICATION:"message:new"
};

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});
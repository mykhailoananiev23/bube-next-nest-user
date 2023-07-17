import { NextResponse } from "next/server";
import ApiService from "../../../services/ApiService";
import {
  pusherEvents,
  pusherServer,
} from "../../../utils/pusher";

export default async function handler(req: Request) {
  const data: any = req.body;
  const { content, roomId, currentId } = data;
  const res: any = await ApiService.getData({
    url: `/rooms/findAll?roomId=${roomId}`,
  });

  const new_message = await ApiService.postData({
    url: "/messages/create",
    data: {
      content,
      senderId: currentId,
      receiverId: res[0].ownerId === currentId ? res[0].proId : res[0].ownerId,
      roomId,
      type: ""
    },
  });

  if (res[0].ownerId === Number(currentId)) {
    await pusherServer.trigger(
      "channel" + roomId + res[0].proId,
      pusherEvents.NEW_MESSAGE,
      { text: content, senderId: currentId }
    );
    await pusherServer.trigger(
      String(res[0].participant.email),
      pusherEvents.NOTIFICATION,
      { text: content, senderId: currentId }
    );
  } else if (res[0].proId === Number(currentId)) {
    await pusherServer.trigger(
      "channel" + roomId + res[0].ownerId,
      pusherEvents.NEW_MESSAGE,
      { text: content, senderId: currentId }
    );
    await pusherServer.trigger(
      String(res[0].owner.email),
      pusherEvents.NOTIFICATION,
      { text: content, senderId: currentId }
    );
  }
}

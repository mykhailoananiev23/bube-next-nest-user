import ApiService from "../../../services/ApiService";
import { pusherEvents, pusherServer } from "../../../utils/pusher";

export default async function handler(req: any) {
  // const { content, currentId, roomId } = req.body;
  // const res: any = await ApiService.getData({
  //   url: `/rooms/findAll?roomId=${roomId}`,
  // });

  // await ApiService.postData({
  //   url: "/messages/create",
  //   data: {
  //     content,
  //     senderId: Number(currentId),
  //     receiverId: 0,
  //     roomId: roomId,
  //     type: "completedJob",
  //   },
  // });

  // await ApiService.postData({
  //   url: `/requests/updateStt/${res[0].jobId}?stt=4&userId=${res[0].proId}`,
  //   data: {},
  // });

  // await pusherServer.trigger(
  //   "channel" + roomId + res[0].proId,
  //   pusherEvents.NEW_MESSAGE,
  //   { text: content, senderId: currentId, type: "completedJob" }
  // );

  return "success";
}

import { NextResponse } from "next/server";
import ApiService from "../../../services/ApiService";
import { pusherEvents, pusherServer } from "../../../utils/pusher";

export default async function handler(req: Request) {
  const body: any = req.body;
  const {proId, userId, jobId, gigId} = body;
  const roomId = jobId ? "job" + String(userId) + proId + jobId : "gig" + String(userId) + proId + gigId
  const existRooms = await ApiService.getData({url: `/rooms/findAll?roomId=${roomId}`})

  if(existRooms.length !== 0) {
    return NextResponse.json(roomId)
  }
  const res = await ApiService.postData({
    url: "/rooms/create",
    data: {
      type: body.jobId ? "job": "gig",
      userId: Number(body.userId),
      proId: Number(body.proId),
      jobId: Number(body.jobId) || Number(body.gigId),
    },
  });

  try {
    await pusherServer.trigger( "channel" + body.proId, pusherEvents.NEW_CONVERSATION, res.data );
  } catch (error) {
    console.log(error);
  }
  console.log(res.data)
  return NextResponse.json(res.data.roomId)
}

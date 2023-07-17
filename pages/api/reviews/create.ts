import ApiService from "../../../services/ApiService";

export default async function handler(req: any) {
  const {
    userId,
    roomId,
    description,
    Communication,
    Cooperation,
    Availability,
    Skills,
  } = req.body;

  const res: any = await ApiService.getData({
    url: `/rooms/findAll?roomId=${roomId}`,
  });

  const existReviewFlg = await ApiService.getData({
    url: `/reviews/findOne/${roomId}`
  })

  if(existReviewFlg.message === "Record not found"){
    if(res.length === 1 && userId === res[0]?.ownerId){
      await ApiService.postData({
        url: "/reviews/create",
        data: {
          type: "pro",
          description: description,
          roomId: roomId,
          Communication: Communication,
          Cooperation: Cooperation,
          Availability: Availability,
          Skills: Skills,
          jobId: res[0]?.jobId,
          ownerId: res[0]?.ownerId,
          proId: res[0]?.proId,
        },
      });
    } else if(res.length === 1 && userId === res[0]?.proId){
      await ApiService.postData({
        url: "/reviews/create",
        data: {
          type: "owner",
          description: description,
          roomId: roomId,
          Communication: Communication,
          Cooperation: Cooperation,
          Availability: Availability,
          Skills: Skills,
          jobId: res[0]?.jobId,
          ownerId: res[0]?.ownerId,
          proId: res[0]?.proId,
        },
      });
    }
  } else {
    if(res.length === 1 && userId === res[0]?.ownerId){
      await ApiService.patchData({
        url: `reviews/update/${roomId}`,
        data: {
          type: "owner",
          description: description,
          Communication: Communication,
          Cooperation: Cooperation,
          Availability: Availability,
          Skills: Skills,
        },
      });
    } else if(res.length === 1 && userId === res[0]?.proId){
      await ApiService.patchData({
        url: `reviews/update/${roomId}`,
        data: {
          type: "pro",
          description: description,
          Communication: Communication,
          Cooperation: Cooperation,
          Availability: Availability,
          Skills: Skills,
        },
      });
    }
  }


  return "success";
}

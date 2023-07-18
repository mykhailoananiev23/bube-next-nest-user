import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import {
  faVideo,
  faInfoCircle,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pOne from "../../public/images/p-1.png";
import { pusherClient, pusherEvents, pusherServer } from "../../utils/pusher";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import ApiService from "../../services/ApiService";
import GigListModal from "../modal/GigListModal";
import { OrderReqMsg } from "../../modules/sellers/orderRequestMsg";
import { ViewOfferMsg } from "../../modules/sellers/viewOfferMsg";
import Link from "next/link";
import { NotificationContext } from "../../contexts/notificationContext";

export default function ConversationComponent() {
  const {setStt} = useContext(NotificationContext)
  const userId = Number(getCookie("NewUserId"));
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [owner, setOwner] = useState(0);
  const [RoomInfo, setRoomInfo] = useState<any>();

  const getOwnerFlg = async () => {
    const data: any = await ApiService.getData({
      url: `/rooms/findAll?roomId=${router.query.inboxId}`,
    });
    if(data){
      setRoomInfo(data[0]);
      (data[0]?.ownerId === userId) && setOwner(1);
      (data[0]?.ownerId !== userId) && setOwner(0);
    }
  };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const setSeenMessages = async () => {
    const res = await ApiService.postData({
      url:`/messages/seen`,
      data: {
        roomID: router.query.inboxId,
        userId: userId
      }
    })
    res && setStt(0)
  }

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    getOwnerFlg();
    setSeenMessages()
  }, [messages]);

  const fetchMessagesByRoomId = async () => {
    const data = await ApiService.getData({
      url: `/messages/findAll?roomId=${router.query.inboxId}`,
    });
    setMessages(data);
  };

  useEffect(() => {
    pusherClient.subscribe("channel" + userId);

    const updateHandler = (data: any) => {
      console.log(data);
    };

    const newHandler = (data: any) => {
      setMessages((prev: any) => {
        if (prev) {
          return [
            ...prev,
            {
              id: messages.length + 1,
              content: data.text,
              senderId: data.senderId,
              type: data.type,
            },
          ];
        } else {
          return [
            {
              id: messages.length + 1,
              content: data.text,
              senderId: data.senderId,
              type: data.type,
            },
          ];
        }
      });
    };

    pusherClient.bind(pusherEvents.NEW_MESSAGE, newHandler);
    pusherClient.bind(pusherEvents.UPDATE_MESSAGE, updateHandler);

    return () => {
      pusherClient.unsubscribe("channel" + userId);
      pusherClient.unbind(pusherEvents.NEW_MESSAGE, newHandler);
      pusherClient.unbind(pusherEvents.UPDATE_MESSAGE, updateHandler);
    };
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    setMessages((prev: any) => {
      if (prev) {
        return [
          ...prev,
          { id: messages.length + 1, content: message, senderId: userId },
        ];
      } else {
        return [
          { id: messages.length + 1, content: message, senderId: userId },
        ];
      }
    });
    axios.post("/api/messages/create", {
      content: message,
      roomId: router.query.inboxId,
      currentId: userId,
    });
    setMessage("");
  };

  useEffect(() => {
    fetchMessagesByRoomId();
    getOwnerFlg();
  }, [router.query]);

  // modal setting

  const [modal, setModal] = useState(false);

  return (
    <main className="container bg-white border rounded-2xl mx-auto px-4 py-8 h-full">
      <div className="w-[100%]">
        <div className="pb-4 border-b flex flex-row justify-between h-[40px]">
          Amanda
          <div className="space-x-5">
            <FontAwesomeIcon className="text-gray-300" icon={faVideo} />
            <FontAwesomeIcon className="text-gray-300" icon={faPhoneVolume} />
            <FontAwesomeIcon className="text-gray-300" icon={faInfoCircle} />
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg mt-4 py-4 h-[]">
          <div className="flex flex-col border rounded-lg h-[calc(100vh-300px)]">
            <div className="flex flex-col flex-1 overflow-y-auto vertical-scroll mb-4 px-2.5">
              {owner ? (
                <OrderReqMsg onSubmit={(e:any) => setModal(e)} />
              ) : (
                <div className="min-h-[200px] rounded-[20px] bg-gray-700">
                  Job Description
                </div>
              )}
              {messages &&
                messages.map((msg: any, idx: number) => {
                  if (msg.type === "createOffer") {
                    return <ViewOfferMsg owner={owner} viewOfferFlg={RoomInfo} key={idx} />;
                  }
                  return (
                    <div
                      key={idx}
                      className={classNames("my-2 flex", {
                        "self-end": msg.senderId === userId,
                        "self-start": msg.senderId !== userId,
                      })}
                    >
                      {msg.senderId !== userId && (
                        <div className="w-[40px] h-[40px] rounded-full">
                          <span className="w-[10rem]">
                            <Image
                              src={pOne}
                              alt={`Avatar of ${"bot"}`}
                              className="rounded-full"
                            />
                          </span>
                        </div>
                        // <Image
                        //   className="w-[20px] h-[10px] rounded-full"
                        //   alt={"bot"}
                        //   src={pOne}
                        // />
                      )}
                      <span
                        className={classNames(
                          "p-2 rounded-xl max-w-[300px] break-all",
                          {
                            "bg-blue-500 text-white self-end":
                              msg.senderId === userId,
                            "bg-gray-300 self-start": msg.senderId !== userId,
                          }
                        )}
                      >
                        {
                          msg.type === "acceptOffer" ? (
                            <Link href={process.env.FRONTEND_URL + msg.content + "/review"}>
                              <a>View detail</a>
                            </Link>
                          ): msg.content
                        }
                      </span>
                    </div>
                  );
                })}
              <div className="pt-1" ref={bottomRef} />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center py-3">
              <input
                type="text"
                className="flex-1 border-gray-300 rounded-[10px] overflow-hidden py-2 px-4 mr-4 resize-none focus:border-gray-300 focus-visible:border-gray-300"
                placeholder="Type a message..."
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-4"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <GigListModal visible={modal} onClose={() => setModal(false)} />
      {/* <ReviewModal onClose={() => setModal(false)} visible={modal} whom={"freelancer"} /> */}
    </main>
  );
}

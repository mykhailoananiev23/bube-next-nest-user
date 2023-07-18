import ConversationComponent from "../../../components/chat/ConversationComponent";
import { AccountLayout } from "../../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../../_app";
import React, { ReactElement, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import pOne from "../../../public/images/p-1.png";
import classNames from "classnames";
import ApiService from "../../../services/ApiService";
import { getCookie } from "cookies-next";
import { pusherClient, pusherEvents } from "../../../utils/pusher";

const InboxId: NextPageWithLayout = () => {
  const userId = Number(getCookie("NewUserId"))
  const router = useRouter();
  const roomId = router.query.inboxId
  const [RoomId, setRoomId] = useState<any>(roomId);
  const [RoomUsers, setRoomUsers] = useState<any>([]);

  useEffect(() => {
    pusherClient.subscribe("channel"+ RoomId + userId);

    const newConversationHandler = (data: any) => {
      console.log(data);
    };

    const updateConversationHandler = (data: any) => {
      console.log(data);
    };

    const deleteConversationHandler = () => {};

    pusherClient.bind(pusherEvents.NEW_CONVERSATION, newConversationHandler);
    // pusherClient.bind( pusherEvents.UPDATE_CONVERSATION, updateConversationHandler );
    // pusherClient.bind( pusherEvents.DELETE_CONVERSATION, deleteConversationHandler );

    return () => {
      pusherClient.unsubscribe("channel"+ RoomId + userId);
      pusherClient.unbind(pusherEvents.NEW_CONVERSATION, newConversationHandler);
      // pusherClient.unbind( pusherEvents.UPDATE_CONVERSATION, updateConversationHandler );
    };
  }, [router.query, RoomId, userId]);

  const getRoomUsers = async (roomId: any) => {
    const res = await ApiService.getData({
      url: `/rooms/findAll?roomId=${Number(roomId)}`,
    });
    setRoomUsers(res);
  };

  

  useEffect(() => {
    setRoomId(router.query.inboxId)
    getRoomUsers(router.query.inboxId)
  }, [router.query]);

  const [ActiveUser, setActiveUser] = useState(0);

  return (
    <div className="h-[calc(100vh-90px)] w-full bg-[#f8f9fb] container mx-auto mt-[5px]">
      <div className="grid grid-cols-8 h-full gap-3">
        <div className="col-span-12 lg:col-span-2 h-full">
          <div className="w-full border rounded-2xl bg-white border-gray-200">
            <div className="flex items-center justify-between h-16 px-4  border-b border-gray-200">
              <div className="relative w-full px-2">
                <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                  <MagnifyingGlassIcon
                    width={20}
                    className="text-neutral-600"
                  />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-[#F5F6FA] border border-[#F5F6FA] text-gray-900 text-sm rounded-3xl focus:outline-[#0071BC] block w-full pr-10 pl-4 p-2.5"
                  placeholder="Search"
                  required
                />
              </div>
              <button
                type="button"
                className="focus:outline-none"
              >
                <svg
                  className="h-8 w-5 rotate-90 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 7a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto h-full">
              <ul className="divide-y ">
                  {RoomUsers && RoomUsers.map((user:any, idx:number) => (
                  <li
                    key={user.id}
                    className={classNames("px-4 py-3 cursor-pointer bg-white", {
                      "bg-[#F5F6FA]": ActiveUser === user.id,
                      "hover:bg-gray-100": ActiveUser !== user.id,
                    })}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-[40px] h-[40px]">
                        <Image
                          src={pOne}
                          alt={`Avatar of ${user.name}`}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">{(user.ownerId === userId? user.participant.firstName : user.owner.firstName)}</p>
                        <p className="font-medium text-[12px] text-[#bbbaba]">{user.job.title}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 inline-block">
          <ConversationComponent />
        </div>
      </div>
    </div>
  );
};

InboxId.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default InboxId;

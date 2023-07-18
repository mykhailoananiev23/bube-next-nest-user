import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { BellIcon } from "@heroicons/react/24/outline";
import pOne from "../../../public/images/p-1.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { NotificationContext } from "../../../contexts/notificationContext";
import ApiService from "../../../services/ApiService";
import { getCookie } from "cookies-next";

const userInfo = [
  {
    id: 1,
    userName: "John Doe",
    message:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    createdAt: "10min",
  },
];

const NotificationUserList = ({ data }: any) => {
  const router = useRouter();
  const gotoRoom = (path: any) => {
    router.push(`/inbox/${path}`);
  };
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm"
          )}
        >
          <div className="flex flex-row" onClick={() => gotoRoom(data.roomId)}>
            <div className="w-[74px]">
              <Image
                src={pOne}
                alt={`user${data.id}`}
                className="rounded-full"
              />
            </div>
            <div className="text-[15px] font-normal leading-[23px] tracking-[0.15px] flex-1 ms-[12px]">
              <div className="text-[#363636]">
                {data.senderId.firstName + " " + data.senderId.lastName}
              </div>
              <div className="text-[#8B939A] mb-[10px]">{data.content}</div>
              <div className="text-[#8B939A]">{data.createdAt}</div>
            </div>
          </div>
        </div>
      )}
    </Menu.Item>
  );
};

export const Notification = () => {
  const userId = Number(getCookie("NewUserId"));
  const { Stt } = useContext(NotificationContext);
  const router = useRouter();
  const [NewMessage, setNewMessage] = useState<any>([]);
  const getNewMessages = async () => {
    const res = await ApiService.getData({
      url: `/messages/new_message/${userId}`,
    });
    setNewMessage(res);
  };
  useEffect(() => {
    getNewMessages();
  }, [Stt]);

  useEffect(() => {
    getNewMessages();
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex relative items-center p-2">
        <span
          className={`flex font-medium rounded cursor-pointer hover:underline text-base ${
            router.pathname == "/inbox"
              ? "text-[#1e50d7] underline underline-offset-4 decoration-2"
              : "text-[#363636]"
          }`}
        >
          Inbox
        </span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-[384px] origin-top-right divide-y divide-gray-100 rounded-s-[25px] rounded-ee-[25px] bg-white drop-shadow-2xl ring-2 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-row justify-between px-5 py-[20px]">
            <div>Inbox{userInfo.length}</div>
            <Link href="/inbox">
              <a href="">See All Inbox</a>
            </Link>
          </div>
          <div className="py-1 max-h-[523px] block overflow-auto scroll-smooth mb-3">
            {NewMessage.length !== 0 &&
              NewMessage.map((ele: any, idx: number) => (
                <NotificationUserList data={ele} key={idx} />
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

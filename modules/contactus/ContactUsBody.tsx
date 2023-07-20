import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tickets } from "../../types/tickets";
import { TimeAgo } from "../../components/timeago";
import Modal from "../../components/modal/Modal";
import RequestAdd from "./RequestAdd";
import { useRouter } from "next/router";

interface ContactUsBodyProps {
  ticketData: Tickets[];
  userId: number;
  onmodalClose: () => void;
  statusFilter: (event:string) => void;
}
  
export default function ContactUsBody({ ticketData, userId, onmodalClose, statusFilter }: any) {
  const router = useRouter()
  const [showRequestModal, setRequestModal] = useState(false);
  useEffect(() => {
    if (showRequestModal === false) {
      onmodalClose()
    }
  }, [showRequestModal]);

  const addReq = () => {
    setRequestModal(true);
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    statusFilter(event.target.value);
  }

  const gotoInbox = (id: number) => {
    router.push({
      pathname: "/support",
      query: {
        supId: id
      }
    })
  }

  return (
    <div className="px-4 py-8 bg-[#FFFFFF] sm:px-6 lg:px-8 w-3/4 mx-auto">
      <div className="sm:flex sm:items-center justify-end mb-5">
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={addReq}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Request
          </button>
        </div>
      </div>
      <div className="sm:flex sm:items-center justify-between">
        <div className="w-full">
          <div className="relative lg:w-1/3 w-3/4 px-2">
            <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
              <MagnifyingGlassIcon width={20} className="text-neutral-600" />
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-[#F5F6FA] border border-[#F5F6FA] text-gray-900 text-sm rounded-3xl focus:outline-[#0071BC] block w-full pr-10 pl-4 p-2.5 cursor-pointer"
              placeholder="Search Request"
              required
            />
          </div>
        </div>
        <div className="mt-4 items-center w-3/12 sm:mt-0 flex sm:flex-none">
          <div className="m-2">Status:</div>
          <select
            onChange={handleStatusChange}
            id="status"
            className="bg-[#f4f5f9] rounded-full text-gray-600 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected value="">Any</option>
            <option value="in progress">In Progress</option>
            <option value="solved">Solved</option>
          </select>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-[#f4f5f9]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 border-r-2 border-[#eaeaeb] pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 border-r-2 border-[#eaeaeb] text-left text-sm font-semibold text-gray-900"
                    >
                      Subject
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 border-r-2 border-[#eaeaeb] text-left text-sm font-semibold text-gray-900"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                {ticketData?.map((ticket: any) => (
                  <tbody key={ticket.id} className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap border-r-2 border-[#eaeaeb] py-4 pl-4 pr-3 text-sm font-medium text-[#91989f] sm:pl-6">
                        {ticket.id}
                      </td>
                      <td className="whitespace-nowrap border-r-2 border-[#eaeaeb] px-3 py-4 text-sm text-[#91989f]">
                        {ticket.job.title}
                      </td>
                      <td className="whitespace-nowrap border-r-2 border-[#eaeaeb] px-3 py-4 text-sm text-[#91989f]">
                         <TimeAgo datetime={ticket.createdAt} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#91989f]">
                        <div className="flex items-center space-x-2">
                          <div className="rounded-full bg-[#0071bc26] text-base">
                            <p className={`uppercase mx-4 my-2 font-medium ${ticket.status === 'solved' ? 'text-[#66db48]':'text-[#0071BC]'}`}>
                              {ticket.status ? "Solved" : "InProgress"}
                            </p>
                          </div>
                            {
                              ticket.status ? null : (
                          <div className="rounded-full bg-[#0071bc26] text-base">
                              <div className="mx-4 my-2" onClick={() => gotoInbox(ticket.id)}>Chat</div>
                          </div>
                              )
                            }
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal onClose={() => setRequestModal(false)} visible={showRequestModal}>
        <RequestAdd setRequestModal={setRequestModal} userId={userId} />
      </Modal>
    </div>
  );
}

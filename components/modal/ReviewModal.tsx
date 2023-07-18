import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  whom: string;
}

export default function ReviewModal({
  // children,
  visible,
  onClose,
  onSubmit,
  whom,
}: any) {
  const router = useRouter();
  const userId = Number(getCookie("NewUserId"));
  const roomId = router.query.inboxId;
  const [Communication, setCommunication] = useState(0);
  const [Cooperation, setCooperation] = useState(0);
  const [Availability, setAvailability] = useState(0);
  const [Skills, setSkills] = useState(0);

  const [revDescription, setrevDesc] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Calculate average rating whenever ratings change
    const sum = Communication + Cooperation + Availability + Skills;
    const avg = sum / 4;
    setAverageRating(avg);
  }, [Communication, Cooperation, Availability, Skills]);

  const handleOnBackDropClick = (e: any) => {
    if (e.target.id === "backdrop") onClose && onClose();
  };

  const handleSubmit = () => {
    axios.post("/api/reviews/create", {
      roomId: roomId,
      userId: userId,
      description: revDescription,
      Communication: Communication,
      Cooperation: Cooperation,
      Availability: Availability,
      Skills: Skills,
    });
    onClose();
    onSubmit();
  };
  return (
    <div
      id="backdrop"
      onClick={handleOnBackDropClick}
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white p-4 sm:p-8 h-5/6 overflow-auto vertical-scroll rounded-lg flex flex-col gap-8 shadow-md lg:w-2/5 w-1/2 md:w-1/2 m-2">
        <div className="text-gray-900 text-center flex justify-between text-lg font-bold">
          <span className="p-2 pl-0"> Give A Review</span>
          <button
            id="backdrop"
            onClick={handleOnBackDropClick}
            className="p-2 lg:pr-0 lg:px-8 md:mx-2 text-center"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="flex flex-col">
          <span className="p-2 pl-0">Share A Review With {whom}</span>
          <textarea
            className="bg-[#F5F6FA] p-[10px]"
            onBlur={(event) => setrevDesc(event.target.value)}
            name="revDesc"
            cols={5}
            rows={5}
          ></textarea>
        </div>
        <div className="text-gray-900 font-medium">Feedback To {whom}</div>
        <div className="space-y-4">
          <div className="flex md:flex-row flex-col items-center justify-between">
            <p>Communication</p>
            <RatingInput
              value={Communication}
              onChange={(value: number) => setCommunication(value)}
            />
          </div>
          <div className="flex md:flex-row flex-col items-center justify-between">
            <p>Cooperation</p>
            <RatingInput
              value={Cooperation}
              onChange={(value: number) => setCooperation(value)}
            />
          </div>
          <div className="flex md:flex-row flex-col items-center justify-between">
            <p>Availability</p>
            <RatingInput
              value={Availability}
              onChange={(value: number) => setAvailability(value)}
            />
          </div>
          <div className="flex md:flex-row flex-col items-center justify-between">
            <p>Skills</p>
            <RatingInput
              value={Skills}
              onChange={(value: number) => setSkills(value)}
            />
          </div>
        </div>
        <div className="h-5">
          {averageRating > 0 && (
            <p className="text-gray-900 font-medium">
              Total Score: {averageRating}
            </p>
          )}
        </div>
        <div className="flex md:flex-row flex-col sm: space-y-2">
          <button
            onClick={handleSubmit}
            className="p-2 lg:px-8 text-white text-center bg-[#1e50d7] rounded-3xl mt-3 md:mt-0"
          >
            Submit
          </button>
          <button
            id="backdrop"
            onClick={handleOnBackDropClick}
            className="p-2 lg:px-8 md:mx-2 text-[#1e50d7] text-center border border-solid border-[#1e50d7] rounded-3xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import RatingInput from "../ratingStar";

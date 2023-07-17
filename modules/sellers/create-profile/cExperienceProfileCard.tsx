import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import notify from "../../../utils/toast";
import ApiService from "../../../services/ApiService";
import { ToastContainer } from "react-toastify";

interface Data {
  company: string;
  position: string;
  period: string;
  startDate: string;
  endDate: string;
}

function CExperienceProfileCard({ experienceData, profileId }: any): JSX.Element {
  const [data, setData] = useState<Data[]>(
    experienceData
      ? experienceData
      : [{ company: "", position: "", period: "", startDate: "", endDate: "" }]
  );

  const handleClick = () => {
    setData([
      ...data,
      { company: "", position: "", period: "", startDate: "", endDate: "" },
    ]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    const onchangeVal = [...data];
    onchangeVal[i][name as keyof Data] = value;
    setData(onchangeVal);
  };

  async function handleDelete(i: number) {
    const deleteVal = [...data];
    deleteVal.splice(i, 1);
    setData(deleteVal);
    try {
      const url: string = `user-profile/${profileId}`;
      const response = await ApiService.patchData({
        url,
        data: { experience: deleteVal },
      });
      notify.success("Removed Successfully!");
    } catch (err: any) {
      notify.error(err.response.data.message);
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      const url: string = `user-profile/${profileId}`;
      const response = await ApiService.patchData({
        url,
        data: { experience: data },
      });
      notify.success("Successful!");
    } catch (err: any) {
      notify.error(err.response.data.message);
    }
  }

  const baseStyle =
    "w-full py-4 px-8 m-2 rounded-3xl text-sm bg-neutral-100 outline-blue-600 text-neutral-900 font-semibold";

  return (
    <div className="bg-white mb-5 p-6 sm:p-8 rounded-lg flex flex-col gap-8 max-w-5xl shadow-md capitalize mt-5">
      <ToastContainer />
      <section className="flex justify-between">
        <h1 className="text-4xl font-bold">Experience</h1>
      </section>
      {data?.map((val, i) => (
        <div key={i}>
          <div className="flex border-t">
            <div className="mt-5 flex gap-3 text-xl w-full font-medium flex-col md:flex-row md:items-center">
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">Company</label>
                </div>
                <input
                  className={`${baseStyle}`}
                  name="company"
                  value={val.company}
                  onChange={(e) => handleChange(e, i)}
                />
              </div>
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">Position</label>
                </div>
                <input
                  className={`${baseStyle}`}
                  name="position"
                  value={val.position}
                  onChange={(e) => handleChange(e, i)}
                />
              </div>
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">Period</label>
                </div>
                <input
                  className={`${baseStyle}`}
                  name="period"
                  type="date"
                  value={val.period}
                  onChange={(e) => handleChange(e, i)}
                />
              </div>
            </div>
            <button className="flex" onClick={() => handleDelete(i)}>
              <FontAwesomeIcon
                icon={faClose}
                className="fa-brands w-full items-center fa-linkedin-in py-[0.5rem] px-[0.7rem]"
              />
            </button>
          </div>
          <div className="flex mr-8 text-xl font-medium flex-col md:flex-row md:items-center">
            <div className="w-full m-2">
              <div className="flex flex-wrap gap-2 items-center">
                <label className="text-lg font-bold">Start Date</label>
              </div>
              <input
                className={`${baseStyle}`}
                name="startDate"
                type="date"
                value={val.startDate}
                onChange={(e) => handleChange(e, i)}
              />
            </div>
            <div className="w-full m-2">
              <div className="flex flex-wrap gap-2 items-center">
                <label className="text-lg font-bold">End Date</label>
              </div>
              <input
                className={`${baseStyle}`}
                name="endDate"
                type="date"
                value={val.endDate}
                onChange={(e) => handleChange(e, i)}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="text-primary justify-center flex"
      >
        Save
      </button>
      <button onClick={handleClick} className="text-primary items-center flex">
        <FontAwesomeIcon
          icon={faPlus}
          className="fa-brands fa-linkedin-in border border-solid border-[#0071BC] mr-2 py-[0.5rem] px-[0.55rem] rounded-full"
        />
        Add More
      </button>
      {/* <p>{JSON.stringify(data)}</p> */}
    </div>
  );
}

export default CExperienceProfileCard;

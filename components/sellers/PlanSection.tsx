import { PlanCard } from "./PlanCard";

const Plans = [
  {
    gradient: "h-[35px]",
    type: "",
    time: "Amount Of Time",
    Commission: "Return of commission for finished Jobs/Gigs",
    Referral: "Referral Bonuses",
    Feature: "false",
    Profile: "Feature your profile",
  },
  {
    gradient: "from-[#DADEE4] to-[#CAD1DA]",
    type: "N/A",
    time: "0-10",
    Commission: "5%",
    Referral: "50%",
    Feature: false,
    Profile: "0",
  },
  {
    gradient: "from-[#EC8CEB] to-[#F55C77]",
    type: "Bronze",
    time: "10-30",
    Commission: "25%",
    Referral: "60%",
    Feature: false,
    Profile: "20",
  },
  {
    gradient: "from-[#65DDD2] to-[#229EFB]",
    type: "Silver",
    time: "30-60",
    Commission: "50%",
    Referral: "70%",
    Feature: false,
    Profile: "30",
  },
  {
    gradient: "from-[#AA6B1A] to-[#F59418]",
    type: "Gold",
    time: "60-100",
    Commission: "70%",
    Referral: "80%",
    Feature: false,
    Profile: "40",
  },
  {
    gradient: "from-[#6778E2] to-[#764EA8]",
    type: "Platinum",
    time: ">=100",
    Commission: "100%",
    Referral: "90%",
    Feature: false,
    Profile: "60",
  },
];

export const PlanSection = () => {
  return (
    <>
      <div className="text-[#050931] text-[60px] font-[200] leading-[75px] tracking-[0.6px] capitalize text-center py-[30px]">
        Premium  <span className="font-[900]">plans</span> 
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-6 gap-4">
        {Plans.map((ele: any, idx: number) => {
            return <PlanCard data={ele} key={idx} />
        })}
      </div>
    </>
  );
};

import Image from "next/image";
import Img from '../../public/images/s_image3.png'

export const GigListCard = ({onSelect}:any) => {
  return (
    <div className="flex w-full flex-row items-center p-[5px] bg-gray-500 mb-[20px] cursor-pointer" id="test" onClick={(e:any) =>onSelect(e)}>
      <div className="w-[78px] h-[78px] bg-cyan-500 me-[10px] rounded-[10px]">
        
      </div>
      <div className="text-[23px]">
        hello world
      </div>
    </div>
  );
};

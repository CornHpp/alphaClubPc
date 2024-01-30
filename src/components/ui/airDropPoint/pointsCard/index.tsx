import React from "react";
import Image from "next/image";
import radioIcon from "@/assets/airdrop/radioIcon.svg";
interface PointsCardProps {
  // Define the props for the PointsCard component here
  bottomChild?: React.ReactNode;
  titleImage?: React.ReactNode;
  title: string;
  pointNum?: number;
  message?: string;
  showPointNum?: boolean;
}

const PointsCard: React.FC<PointsCardProps> = (props) => {
  const {
    bottomChild,
    titleImage = radioIcon,
    title,
    pointNum,
    message,
    showPointNum = true,
  } = props;
  return (
    <div className="p-[10px] bg-[#fff] border-[#0D0D0D] border-solid border-[2px] rounded-[10px] flex-1  w-full mb-[16px] flex flex-col justify-between">
      <div>
        <div className="flex items-center font-semibold">
          <Image src={titleImage} alt="" width={24} height={24}></Image>
          <div className="mx-[3.5px] text-[16px]">{title}</div>
          {showPointNum && (
            <span className="text-[12px]">
              <span className="text-[#005A0E]">+{pointNum}</span> Points
            </span>
          )}
        </div>
        <div className="mt-[4px] text-[11px]">{message}</div>
      </div>

      <div className="mt-[6px] flex items-center justify-between">
        {bottomChild}
      </div>
    </div>
  );
};

export default PointsCard;

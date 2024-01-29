import React from "react";
import Image from "next/image";
import radioIcon from "@/assets/airdrop/radioIcon.svg";
interface PointsCardProps {
  // Define the props for the PointsCard component here
  bottomChild?: React.ReactNode;
}

const PointsCard: React.FC<PointsCardProps> = (props) => {
  const { bottomChild } = props;
  return (
    <div className="p-[10px] bg-[#fff] border-[#0D0D0D] border-solid border-[2px] rounded-[10px] flex-1  w-full mb-[16px]">
      <div className="flex items-center font-semibold">
        <Image src={radioIcon} alt="" width={24} height={24}></Image>
        <div className="mx-[3.5px]">Card Holding </div>
        <span className="text-[12px]">
          <span className="text-[#005A0E]">+50</span> Points
        </span>
      </div>
      <div className="mt-[4px] text-[11px]">
        A timer checks in every 24 hours, if your total portfolio value is {">"}
        =0.1 ETH, you will be rewarded with 50 points for every 0.1 ETH that you
        are HODLing
      </div>

      <div className="mt-[6px] flex items-center justify-between">
        {bottomChild}
      </div>
    </div>
  );
};

export default PointsCard;

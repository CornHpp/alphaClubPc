import React from "react";
import UserHeader from "@/components/ui/userHeader";
import diamondIcon from "@/assets/airdrop/diamondIcon.svg";
import Image from "next/image";

interface AirDropRankProps {
  // Define the props for the AirDropRank component here
}

const AirDropRank: React.FC<AirDropRankProps> = () => {
  // Implement the component logic here

  return (
    <div className="w-full border-solid border-[2px] border-[#0D0D0D] rounded-[16px] p-[16px] bg-white">
      <div className="text-[20px] font-bold mr-[3px]"> Points Ranking</div>
      <div className="text-[14px] mt-[2px]">
        Get to the top of the leaderboard and increase your points. 24-hour
        rolling rankings of the top 1,221 players will be rewarded with points!
        To learn more about our point earning mechanism please read on
        <span className="text-[14px] font-semibold underline">
          {" "}
          Points Farming
        </span>
      </div>

      <div className="mt-[8px] w-full">
        <div className="flex w-full pl-[64px] pr-[64px] text-[#404140] text-[12px]">
          <div className="w-[15%]">Rank</div>
          <div className="w-[35%]">Club owner</div>
          <div className="w-[35%]">Invited by</div>
          <div className="w-[15%]">Points</div>
        </div>
      </div>

      <div className="mt-[4px] w-full">
        <div className="border-solid border-[2px] border-[#949694] h-[74px] rounded-[8px] flex items-center pl-[64px] pr-[64px] w-full mb-[16px]">
          <div className="w-[15%] flex items-center italic text-[24px] ">
            <div className="">
              29999<span className="text-[12px]">th</span>
            </div>
          </div>

          <div className="w-[35%]">
            <UserHeader></UserHeader>
          </div>
          <div className="w-[35%]">
            <UserHeader></UserHeader>
          </div>

          <div className="w-[15%] flex items-center">
            <Image
              src={diamondIcon}
              alt=""
              width={24}
              height={24}
              className="mr-[2px]"
            ></Image>
            12
          </div>
        </div>

        <div className="border-solid border-[2px] border-[#FFD601] h-[74px] rounded-[8px] flex items-center pl-[64px] pr-[64px] w-full">
          <div className="w-[15%] flex items-center italic text-[24px] ">
            <div
              className="text-[40px]"
              style={{
                background: "linear-gradient(151deg, #F8C30F 0%, #F7A300 100%)",
                WebkitBackgroundClip: "text",
                display: "inline-block",
                color: "transparent",
              }}
            >
              <span style={{}}>1</span>
              <span className="text-[12px]">th</span>
            </div>
          </div>

          <div className="w-[35%]">
            <UserHeader></UserHeader>
          </div>
          <div className="w-[35%]">
            <UserHeader></UserHeader>
          </div>

          <div className="w-[15%] flex items-center">
            <Image
              src={diamondIcon}
              alt=""
              width={24}
              height={24}
              className="mr-[2px]"
            ></Image>
            12111
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirDropRank;

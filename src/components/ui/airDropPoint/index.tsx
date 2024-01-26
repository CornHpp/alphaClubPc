import React, { useEffect } from "react";
import trophyIcon from "@/assets/airdrop/trophyIcon.svg";
import diamondIcon2 from "@/assets/airdrop/diamondIcon2.svg";
import Image from "next/image";
import rightIcon from "@/assets/popup/rightIcon.svg";

import {
  getUserInviteCode,
  inviteCodeResponseType,
} from "@/api/model/userService";
import { copyTextToClipboardSafari } from "@/lib/util";
import PointsCard from "./pointsCard";
import OpenTreasure from "@/components/custom/treasure";
interface AirDropPointProps {
  // Define the props for the AirDropRank component here
}

const AirDropPoint: React.FC<AirDropPointProps> = () => {
  // Implement the component logic here
  const [inviteCodeList, setInviteCodeList] = React.useState<
    inviteCodeResponseType[]
  >([]);
  const getUserInviteCodeFunc = async () => {
    const res = await getUserInviteCode();
    setInviteCodeList(res.result);
    console.log(res);
  };

  const [OpenTreasureShow, setOpenTreasureShow] = React.useState(false);

  useEffect(() => {
    getUserInviteCodeFunc();
  }, []);
  return (
    <div className="flex w-full">
      <div>
        <div className="w-[360px] h-[464px] bg-[#fff] border-[#0D0D0D] border-solid border-[2px] rounded-[10px] p-[14px]">
          <div className="text-[20px] font-bold">Personal Points Info</div>
          <div className="mt-[12px] flex items-center">
            <Image
              src={trophyIcon}
              alt=""
              width={40}
              height={40}
              className="mr-[8px]"
            ></Image>
            <div>
              <div className="font-semibold">My Ranking:</div>
              <div className="flex items-center italic text-[40px] font-bold leading-[36px]">
                <div className="">
                  4<span className="text-[12px] font-medium">th</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[12px] flex items-center">
            <Image
              src={diamondIcon2}
              alt=""
              width={40}
              height={40}
              className="mr-[8px]"
            ></Image>
            <div>
              <div className="font-semibold">Total Points::</div>
              <div className="flex items-center italic text-[40px] font-bold leading-[36px]">
                <div className="">3200</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[360px] h-[158px] bg-[#00FC6E] border-[#0D0D0D] border-solid border-[2px] rounded-[10px] p-[14px] mt-[24px]">
          <div className="font-bold text-[20px] mb-[20px]">my invite code</div>
          {inviteCodeList.map((item, index) => {
            return (
              <div
                className="mb-[12px] flex items-center w-[full] justify-between"
                key={index + "o"}
              >
                <div className="text-[18px]  font-semibold ">
                  {item.inviteCode}
                </div>
                {item.isCopy ? (
                  <div className="flex text-[14px] items-center font-semibold bg-[#E9E9E9] w-[95px] h-[30px] justify-center rounded-[15px] cursor-pointer">
                    <Image
                      src={rightIcon}
                      alt=""
                      width={16}
                      height={16}
                      className="mr-[2px]"
                    ></Image>
                    Copied
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      inviteCodeList[index].isCopy = true;
                      setInviteCodeList([...inviteCodeList]);
                      copyTextToClipboardSafari(item.inviteCode);
                    }}
                    className="ml-[6px] text-[14px]  font-semibold w-[60px] h-[28px] border-[2px] border-[#0D0D0D] cursor-pointer border-solid flex items-center justify-center rounded-[15px]"
                  >
                    Copy
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-[24px] w-[360px] h-[646px] bg-[#D8FCD1] border-[#0D0D0D] border-solid border-[2px] rounded-[10px] p-[14px]">
        <div className="text-[20px] font-bold mb-[12px]">Normal Tasks</div>
        <PointsCard
          bottomChild={
            <div className=" rounded-[13px] bg-[#F4F4EC] w-[162px] h-[25px] flex items-center justify-center">
              Earned Points: <span className="font-bold"> +250</span>
            </div>
          }
        ></PointsCard>
        <PointsCard
          bottomChild={
            <div className=" rounded-[13px] bg-[#D8FCD1] w-[162px] h-[25px] flex items-center justify-center">
              Earned Points: <span className="font-bold"> +250</span>
            </div>
          }
        ></PointsCard>
        <PointsCard></PointsCard>
        <PointsCard></PointsCard>
      </div>

      <div className="w-[360px] h-[646px] bg-[#FFFFB3] border-[#0D0D0D] border-solid border-[2px] rounded-[10px] p-[14px]">
        <div className="text-[20px] font-bold mb-[12px]">Normal Tasks</div>
        <PointsCard
          bottomChild={
            <>
              <div className=" rounded-[13px] bg-[#F4F4EC] w-[119px] h-[25px] flex items-center justify-center">
                Complete:0/1
              </div>

              <div
                className="w-[63px] h-[25px] rounded-[28px] bg-[#E9E9E9] flex items-center justify-center font-semibold text-[#949694] cursor-pointer"
                onClick={() => {
                  setOpenTreasureShow(true);
                }}
              >
                Open
              </div>
            </>
          }
        ></PointsCard>
        <PointsCard
          bottomChild={
            <div className=" rounded-[13px] bg-[#FFFFB3] w-[119px] h-[25px] flex items-center justify-center">
              Complete:0/1
            </div>
          }
        ></PointsCard>
        <PointsCard></PointsCard>
        <PointsCard></PointsCard>
      </div>

      <OpenTreasure
        showPopup={OpenTreasureShow}
        handleCancel={() => {
          setOpenTreasureShow(false);
        }}
      ></OpenTreasure>
    </div>
  );
};

export default AirDropPoint;

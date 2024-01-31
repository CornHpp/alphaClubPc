import React, { useEffect } from "react";
import trophyIcon from "@/assets/airdrop/trophyIcon.svg";
import diamondIcon2 from "@/assets/airdrop/diamondIcon2.svg";
import Image from "next/image";
import rightIcon from "@/assets/popup/rightIcon.svg";
import Rectangle from "@/assets/cards/Rectangle.svg";
import radioIcon from "@/assets/airdrop/radioIcon.svg";
import icon2 from "@/assets/airdrop/icon2.svg";
import icon3 from "@/assets/airdrop/icon3.svg";
import icon4 from "@/assets/airdrop/icon4.svg";
import icon5 from "@/assets/airdrop/icon5.svg";
import icon6 from "@/assets/airdrop/icon6.svg";
import icon7 from "@/assets/airdrop/icon7.svg";
import icon8 from "@/assets/airdrop/icon8.svg";

import {
  getAllTaskInfo,
  openTreasureBox,
  taskInfoType,
} from "@/api/model/airdrop";

import {
  getUserInfoByTwitterId,
  getUserInviteCode,
  inviteCodeResponseType,
} from "@/api/model/userService";
import { copyTextToClipboardSafari } from "@/lib/util";
import PointsCard from "./pointsCard";
import OpenTreasure from "@/components/custom/treasure";
import { useSelector } from "react-redux";
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

  const { userinfo } = useSelector((state: any) => state.user);

  const [OpenTreasureShow, setOpenTreasureShow] = React.useState(false);

  let [pointsHuntList, setPointsHuntList] = React.useState([
    {
      title: "Card Holding",
      pointNum: 50,
      titleImage: radioIcon,
      message:
        "A timer checks in every 24 hours, if your total portfolio value is >=0.1 ETH, you will be rewarded with 50 points for every 0.1 ETH that you are HODLing",

      bottomChild: (
        <div className=" rounded-[13px] bg-[#F4F4EC] w-[119px] h-[25px] flex items-center justify-center"></div>
      ),
      EarnedPoints: 0,
    },
    {
      title: "Cards Purchase",
      pointNum: 250,
      titleImage: icon2,
      message:
        "For every cumulative purchase volume of 0.1 ETH, you are rewarded with 250 points",
      bottomChild: (
        <div className=" rounded-[13px] bg-[#F4F4EC] w-[119px] h-[25px] flex items-center justify-center"></div>
      ),
      EarnedPoints: 250,
    },
    {
      title: "Direct Invitee",
      pointNum: 50,
      message:
        "Direct Invitee: A direct invitee earns you 250 points + 20% of what they earn",
      titleImage: icon3,
      bottomChild: (
        <div className=" rounded-[13px] bg-[#F4F4EC] w-[119px] h-[25px] flex items-center justify-center"></div>
      ),
      EarnedPoints: 0,
    },
    {
      title: "Secondary Invitee",
      pointNum: 50,
      message:
        "Secondary Invitee: An invitee invited by your invitee, earns you 125 points + 10% of what they earn",
      titleImage: icon4,
      bottomChild: (
        <div className=" rounded-[13px] bg-[#F4F4EC] w-[119px] h-[25px] flex items-center justify-center"></div>
      ),
      EarnedPoints: 0,
    },
  ]);

  let [treasureBoxLists, setTreasureBoxLists] = React.useState([
    {
      title: "First Time Card Purchaser",
      unFinished: 0,
      allNum: 1,
      titleImage: icon5,
      showPointNum: false,
      message: "Purchase a card from any of the first clubs to open the box.",
      bottomChild: (
        <div className=" rounded-[13px] bg-[#F4F4EC] w-[119px] h-[25px] flex items-center justify-center"></div>
      ),
      EarnedPoints: 0,
      canOpen: false,
      scoreCount: 0,
      id: 0,
    },
    {
      title: "Third Time Card Purchaser",
      pointNum: 250,
      titleImage: icon6,
      showPointNum: false,
      unFinished: 0,
      allNum: 3,
      message: "Third time buying a card from any of the clubs",
      bottomChild: (
        <div className=" rounded-[13px] bg-[#F4F4EC] w-[119px] h-[25px] flex items-center justify-center"></div>
      ),
      EarnedPoints: 250,
      id: 0,
      scoreCount: 0,
      canOpen: false,
    },
    {
      title: "Weekly Treasure Hunt",
      pointNum: 50,
      showPointNum: false,
      unFinished: 0,
      allNum: 1,
      message:
        "Every 2 card purchases of different clubs each week earn you a treasure box to open(randomised points between 500-999)",
      titleImage: icon7,
      bottomChild: (
        <div className=" rounded-[13px] bg-[#F4F4EC] w-[119px] h-[25px] flex items-center justify-center"></div>
      ),
      EarnedPoints: 0,
      id: 0,
      scoreCount: 0,
      canOpen: false,
    },
    {
      title: "Squad Scheme",
      pointNum: 50,
      showPointNum: false,
      unFinished: 0,
      allNum: 0.25,
      message:
        "Your direct invitee forms you squad, for every 0.25 ETH that your squad trades, earn a treasure box to open ( randomised points between 500-999)",
      titleImage: icon8,
      bottomChild: (
        <div className=" rounded-[13px] bg-[#F4F4EC] w-[119px] h-[25px] flex items-center justify-center"></div>
      ),
      EarnedPoints: 0,
      id: 0,
      canOpen: false,
      scoreCount: 0,
    },
  ]);

  const copyAttriaute = (index: number, item: taskInfoType) => {
    treasureBoxLists[index].unFinished = Number(item.currentMount);
    treasureBoxLists[index].canOpen = item.canOpen;
    treasureBoxLists[index].id = item.scoreType;
    treasureBoxLists[index].scoreCount = item.scoreCount;
  };

  const getAllTaskInfoFunc = async () => {
    getAllTaskInfo().then((res) => {
      console.log(res);
      const { result } = res;
      result.forEach((item, index) => {
        if (item.scoreType == 12) {
          pointsHuntList[0].EarnedPoints = item.scoreCount;
        } else if (item.scoreType == 11) {
          pointsHuntList[1].EarnedPoints = item.scoreCount;
        } else if (item.scoreType == 7) {
          pointsHuntList[2].EarnedPoints = item.scoreCount;
        } else if (item.scoreType == 8) {
          pointsHuntList[3].EarnedPoints = item.scoreCount;
        } else if (item.scoreType == 9) {
          copyAttriaute(0, item);
        } else if (item.scoreType == 10) {
          copyAttriaute(1, item);
        } else if (item.scoreType == 4) {
          copyAttriaute(2, item);
        } else if (item.scoreType == 5) {
          copyAttriaute(3, item);
        }
      });
      setPointsHuntList([...pointsHuntList]);
      setTreasureBoxLists([...treasureBoxLists]);
    });
  };

  const openTreasureBoxFunc = async (id: number) => {
    openTreasureBox(id).then((res) => {
      getAllTaskInfoFunc();
      const item = res.result;
      setOpenTreasureShow(true);
      if (id == 9) {
        copyAttriaute(1, item);
      } else if (item.scoreType == 10) {
        copyAttriaute(2, item);
      } else if (item.scoreType == 4) {
        copyAttriaute(3, item);
      } else if (item.scoreType == 5) {
        copyAttriaute(4, item);
      }
    });
  };

  const [currentScore, setCurrentScore] = React.useState(0);

  const [selfInfo, setSelfInfo] = React.useState<any>({});

  const getUserInfoByTwitterIdFunc = async () => {
    const twitterId = userinfo.twitterUidStr;
    const res = await getUserInfoByTwitterId(twitterId);
    setSelfInfo({
      rank: res.result.rank,
      points: res.result.score,
    });
  };

  useEffect(() => {
    getUserInviteCodeFunc();
    getAllTaskInfoFunc();

    getUserInfoByTwitterIdFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex w-full flex-1">
      <div className="flex-1 flex flex-col">
        <div className=" h-[464px] bg-[#fff] border-[#0D0D0D] border-solid border-[2px] rounded-[10px] p-[14px] relative">
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
              <div className="flex items-center italic text-[40px]flex w-full font-bold leading-[36px]">
                <div className="">
                  {selfInfo.rank}
                  <span className="text-[12px] font-medium">th</span>
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
                <div className="">{selfInfo.points}</div>
              </div>
            </div>
          </div>

          <Image
            src={Rectangle}
            width={359}
            height={464}
            alt=""
            className=" absolute bottom-0 right-0"
          ></Image>
        </div>

        <div className="flex-1 bg-[#00FC6E] border-[#0D0D0D] border-solid border-[2px] rounded-[10px] p-[14px] mt-[24px]">
          <div className="font-bold text-[20px] mb-[20px]">My Invite Code</div>
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

      <div className="mx-[24px] bg-[#D8FCD1] border-[#0D0D0D] border-solid border-[2px] rounded-[10px] p-[14px] flex-1 flex flex-col">
        <div className="text-[20px] font-bold mb-[12px]">Points Hunt</div>
        {pointsHuntList.map((item, index) => {
          return (
            <PointsCard
              key={index + "p"}
              titleImage={item.titleImage}
              message={item.message}
              bottomChild={
                <div
                  className=" rounded-[13px] bg-[#F4F4EC] px-[12px]  h-[25px] flex items-center justify-center"
                  style={{
                    background: item.EarnedPoints > 0 ? "#D8FCD1" : "#E9E9E9",
                  }}
                >
                  earned points: +{" "}
                  <span
                    style={{
                      fontWeight: item.EarnedPoints > 0 ? "bold" : "normal",
                    }}
                  >
                    {item.EarnedPoints}
                  </span>
                </div>
              }
              title={item.title}
              pointNum={item.pointNum}
            ></PointsCard>
          );
        })}
      </div>

      <div className=" bg-[#FFFFB3] border-[#0D0D0D] border-solid border-[2px] rounded-[10px] p-[14px] flex-1 mr-[37px] flex flex-col">
        <div className="text-[20px] font-bold mb-[12px]">Treasure Box</div>
        {treasureBoxLists.map((item, index) => {
          return (
            <PointsCard
              key={index + "p"}
              titleImage={item.titleImage}
              message={item.message}
              showPointNum={item.showPointNum}
              bottomChild={
                <div className=" w-full justify-between flex items-center">
                  <div
                    className=" rounded-[13px] bg-[#F4F4EC] px-[12px]  h-[25px] flex items-center justify-center"
                    style={{
                      background: item.canOpen ? "#FFFFB3" : "#F4F4EC",
                    }}
                  >
                    <div>
                      {index == 3 ? (
                        <div>
                          Squad Trade: {item.unFinished}/{item.allNum}
                        </div>
                      ) : (
                        <div>
                          complete: +{" "}
                          <span
                            style={{
                              fontWeight: item.canOpen ? "bold" : "normal",
                            }}
                          >
                            {item.unFinished}/{item.allNum}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      background: item.canOpen ? "#FFF96D" : "#E9E9E9",
                      color: item.canOpen ? "#000" : "#949694",
                      border: item.canOpen ? "2px solid #000" : "none",
                    }}
                    onClick={() => {
                      if (item.canOpen) {
                        setCurrentScore(item.scoreCount);
                        openTreasureBoxFunc(item.id);
                      }
                    }}
                    className="w-[63px] cursor-pointer h-[25px] rounded-[12px] bg-[#E9E9E9] text-[#949694] text-[14px] font-semibold flex justify-center items-center"
                  >
                    Open
                  </div>
                </div>
              }
              title={item.title}
              pointNum={item.pointNum}
            ></PointsCard>
          );
        })}
      </div>

      <OpenTreasure
        scores={currentScore}
        showPopup={OpenTreasureShow}
        handleCancel={() => {
          setOpenTreasureShow(false);
        }}
      ></OpenTreasure>
    </div>
  );
};

export default AirDropPoint;

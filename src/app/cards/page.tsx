"use client";
import React from "react";

import Button from "@/components/custom/button";
import Roll from "@/components/custom/roll";
import UseProfileView from "@/components/ui/useProfile";
import CreationTabs from "@/components/ui/useProfile/creation/creationTabs";
import UserPrice from "@/components/ui/userPrice";
import Image from "next/image";
import loveWhiteIcon from "@/assets/cards/loveWhiteIcon.svg";
import loveBlackIcon from "@/assets/cards/loveBlackIcon.svg";
import personAddIcon from "@/assets/cards/personAddIcon.svg";
import champion from "@/assets/cards/champion.svg";
import secondPlace from "@/assets/cards/secondplace.svg";
import thirdWinner from "@/assets/cards/thirdWinner.svg";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import personIcon from "@/assets/cards/personIcon.svg";
import handLoveSign from "@/assets/home/handLoveSign.svg";
import ETHIcon from "@/assets/popup/ETH.svg";

import twitterIcon from "@/assets/home/twitterIcon.svg";

interface Props {
  // Define your props here
}

const Page: React.FC<Props> = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [list, setList] = React.useState([1, 2, 3]);
  return (
    <div className="mt-[24px] w-full">
      <div className=" flex w-full justify-between pr-[39px] items-center">
        <div className="text-[32px] font-bold mr-[3px]">cards</div>
      </div>
      <div className="flex items-center mt-[12px] border-[2px] border-[#0D0D0D] border-solid rounded-[12px] w-full h-[58px] bg-white px-[14px]">
        <div className="font-bold text-[18px] w-[65px] leading-[20px]">
          Recent Trade
        </div>
        <div className="ml-[12px] relative overflow-hidden flex-1 h-full flex items-center">
          <Roll isCardsDanmu={true} leftOrRight={true}></Roll>
        </div>
      </div>

      <div className="mt-[24px] flex ">
        <div
          className="mt-[24px] border-[2px] border-[#0D0D0D] border-solid rounded-[12px] h-[596px] w-[563px] mr-[24px]"
          style={{
            background:
              "linear-gradient(128deg, #FDFFF4 0%, #F5FFF2 47%, #FFFEE2 100%)",
          }}
        >
          <div className="p-[14px]">
            <div className="text-[20px] font-bold">Top Clubs</div>

            <div className="flex items-end">
              {list.map((item, index) => {
                return (
                  <div className="mr-[8px] relative">
                    <Image
                      src={
                        index == 0
                          ? secondPlace
                          : index == 1
                          ? champion
                          : thirdWinner
                      }
                      alt=""
                      width={173}
                      height={index == 1 ? 229 : 200}
                    ></Image>
                    <div className="absolute left-0 top-0 w-full h-full">
                      <div className="mt-[32px] ml-[8px] flex items-end">
                        <Image
                          src={defaultHeaderIcon}
                          alt=""
                          width={51}
                          height={51}
                          className="w-[51px] h-[51px]"
                        ></Image>
                        <div className="text-[16px] font-bold">Jim</div>
                      </div>

                      <div className="pt-[6px]  flex items-center ml-[6px]">
                        <div className="">
                          <div className="flex items-center text-[12px] text-[#404140]">
                            <Image
                              src={twitterIcon}
                              className="w-[12px] h-[12px]"
                              alt=""
                              width={12}
                              height={12}
                            ></Image>
                            <div className="ml-[2px] text-[12px] font-medium">
                              @Dekid
                            </div>
                          </div>
                          <div className="text-[14px] font-semibold">
                            @Gooy10
                          </div>
                        </div>
                        <div className="w-[2px] h-[12px] ml-[12px] mr-[8px] bg-[#0D0D0D] rounded-[2px]"></div>

                        <div className="">
                          <div className="flex items-center text-[12px] text-[#404140]">
                            <Image
                              src={personIcon}
                              className="w-[12px] h-[12px]"
                              alt=""
                              width={12}
                              height={12}
                            ></Image>
                            <div className="ml-[2px] text-[11px] font-medium text-[#404140]">
                              Followers
                            </div>
                          </div>
                          <div className="text-[14px] font-semibold">1.5K</div>
                        </div>
                      </div>

                      <div className=" w-full pt-[10px] px-[6px]  ">
                        <div className="border-[#0D0D0D] border-[2px]  h-[50px] border-solid rounded-[8px] flex flex-col items-center justify-center ">
                          <div className="flex font-semibold mb-[-2px] items-center">
                            <Image
                              src={ETHIcon}
                              alt=""
                              width={16}
                              height={16}
                              className="w-[16px] h-[16px] mr-[2px]"
                            ></Image>
                            104 ETH
                          </div>
                          <div className="flex items-center">
                            <Image
                              src={handLoveSign}
                              alt=""
                              className="w-[12px] h-[12px]"
                              width={12}
                              height={12}
                            ></Image>
                            <div className="text-[#404140]  ml-[2px] text-[12px]">
                              Holder:242
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* <div className="mr-[8px]">
                <Image src={champion} alt="" width={173} height={229}></Image>
              </div>
              <div>
                <Image
                  src={thirdWinner}
                  alt=""
                  width={173}
                  height={200}
                ></Image>
              </div> */}
            </div>
          </div>

          <div className="rankOrder p-[12px] bg-[#fff]  rounded-[12px] w-[563px] ml-[-2px] border-[2px] border-[#0D0D0D] border-solid">
            <div className="flex">
              <div className="w-[43px] flex items-center italic text-[20px]">
                <div className="">
                  4<span className="text-[12px]">th</span>
                </div>
              </div>
              <UserPrice></UserPrice>
            </div>
          </div>
        </div>

        <div className="mt-[24px] border-[2px] border-[#0D0D0D] border-solid rounded-[12px] h-[596px] w-[563px] px-[14px] pt-[14px] bg-[#fff]">
          <div className="text-[20px] font-bold">Twitter Friends</div>

          <div className="mt-[12px]">
            <CreationTabs
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              tabList={[
                {
                  name: "Following",
                },
                {
                  name: "Mutual Following",
                },
              ]}
            ></CreationTabs>
          </div>
          <div className="mt-[16px] ">
            <div className="flex items-center mb-[16px]">
              <UserPrice></UserPrice>
              <div className="ml-[32px]">
                <Button
                  hideBottomBackground={true}
                  active={false}
                  width="113px"
                  height="40px"
                  text={"0 Polls"}
                  color={"#fff"}
                  normalBackGround={"#0D0D0D"}
                  borderRadius="27px"
                  border="none"
                  buttonClick={() => {
                    console.log("click");
                  }}
                >
                  <Image
                    src={loveWhiteIcon}
                    alt=""
                    width={20}
                    height={20}
                  ></Image>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

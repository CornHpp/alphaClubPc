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

interface Props {
  // Define your props here
}

const Page: React.FC<Props> = () => {
  const [currentTab, setCurrentTab] = React.useState(0);

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
          <div className="Top Clubs">111</div>

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

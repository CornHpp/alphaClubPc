"use client";

import React from "react";
import Image from "next/image";
import inviteIcon from "@/assets/profile/inviteIcon.svg";

import InviteCodePopup from "@/components/ui/inviteCodePopup";
import Tabs from "@/components/custom/tabs";
import AirDropRank from "@/components/ui/airDropRank";
import AirDropPoint from "@/components/ui/airDropPoint";

interface Props {
  // Define your props here
}
const tabsList = [
  {
    text: "Ranking",
    img: "",
  },
  {
    text: "Points",
    img: "",
  },
];
const Page: React.FC<Props> = () => {
  let [currentTab, setCurrentTab] = React.useState(0);

  const [showPopupInviteCode, setShowPopupInviteCode] = React.useState(false);

  return (
    <div className="mt-[24px] w-full h-full overflow-hidden flex flex-col pb-[16px]">
      <div className=" flex w-full justify-between pr-[39px] items-center">
        <div className="text-[32px] font-bold mr-[3px]">Airdrop</div>
        <div
          className="text-[16px] flex mr-[24px] cursor-pointer"
          onClick={() => {
            setShowPopupInviteCode(true);
          }}
        >
          <Image
            src={inviteIcon}
            alt=""
            width={20}
            height={20}
            className="mr-[2px]"
          ></Image>
          Invite Code
        </div>
      </div>

      <div className="pt-[4px]  pb-[16px]">
        <Tabs
          tabList={tabsList}
          activeIndex={currentTab}
          tabClick={(val) => {
            console.log(val);
            currentTab = val;
            setCurrentTab(val);
          }}
        ></Tabs>
      </div>

      {currentTab == 0 && <AirDropRank></AirDropRank>}
      {currentTab == 1 && <AirDropPoint></AirDropPoint>}

      <InviteCodePopup
        showPopup={showPopupInviteCode}
        setShowPopup={setShowPopupInviteCode}
        onClickSelectCoHost={() => {
          console.log("onClickSelectCoHost");
        }}
        onClickSchedule={() => {
          console.log("onClickSchedule");
        }}
      ></InviteCodePopup>
    </div>
  );
};

export default Page;

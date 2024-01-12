import React from "react";
import PlusCricleIcon from "@/assets/profile/PlusCricleIcon.svg";
import Image from "next/image";
import Tabs from "@/components/custom/tabs";
import CreationTabs from "./creationTabs";
import ProfileCard from "../../profileCard";

interface Props {
  // Add your props here
}

const tabsList = [
  {
    text: "Tab1",
    img: "",
  },
  {
    text: "Tab2",
    img: "",
  },
  {
    text: "Tab3",
    img: "",
  },
];

const CreationvView: React.FC<Props> = () => {
  // Add your component logic here

  const [currentTab, setCurrentTab] = React.useState(0);
  return (
    <div className="border-[2px] min-w-[355px] rounded-[16px]  border-[#0D0D0D] border-solid h-[684px] px-[16px] py-[16px] bg-white">
      <div className="w-full flex items-center text-[#0D0D0D] justify-between font-semibold">
        <div className="text-[20px] ">Creation</div>
        <div className=" w-[117px] h-[30px] border-[#0D0D0D] border-solid border-[2px] bg-[#00FC6E] items-center flex justify-center text-[12px] rounded-[17px]">
          <Image src={PlusCricleIcon} alt="" width={18} height={18}></Image>
          Create Event
        </div>
      </div>

      <div className="mt-[14px]">
        <CreationTabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        ></CreationTabs>
      </div>

      <div className="mt-[12px]">
        {currentTab === 0 && (
          <ProfileCard currentTab={currentTab}></ProfileCard>
        )}
        {currentTab === 1 && (
          <ProfileCard currentTab={currentTab}></ProfileCard>
        )}
        {currentTab === 2 && (
          <ProfileCard currentTab={currentTab}></ProfileCard>
        )}
      </div>
    </div>
  );
};

export default CreationvView;

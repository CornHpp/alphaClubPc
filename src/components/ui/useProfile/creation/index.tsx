import React from "react";
import PlusCricleIcon from "@/assets/profile/PlusCricleIcon.svg";
import Image from "next/image";
import Tabs from "@/components/custom/tabs";
import CreationTabs from "./creationTabs";
import ProfileCard from "../../profileCard";
import CreateEventPopupView from "../../createEventPopup";
import ChooseSpeakerPopup from "../../chooseSpeakerPopup";
import ChooseTimePopup from "../../chooseTimePopup";
import AcceptCoHostPopup from "../../coHostPopup";

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
  const [showPopupCreateEvent, setShowPopupCreateEvent] = React.useState(false);
  const [showPopupChooseSpeaker, setShowPopupChooseSpeaker] =
    React.useState(false);
  const [showPopupChooseTime, setShowPopupChooseTime] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);
  const [showPopupAcceptCoHost, setShowPopupAcceptCoHost] =
    React.useState(false);
  return (
    <div className="border-[2px] min-w-[355px] rounded-[16px]  border-[#0D0D0D] border-solid h-[684px] px-[16px] py-[16px] bg-white">
      <div className="w-full flex items-center text-[#0D0D0D] justify-between font-semibold">
        <div className="text-[20px] ">Creation</div>
        <div
          className=" w-[117px] h-[30px] border-[#0D0D0D] border-solid border-[2px] bg-[#00FC6E] items-center flex justify-center text-[12px] rounded-[17px]
          cursor-pointer
          "
          onClick={() => {
            setShowPopupCreateEvent(true);
          }}
        >
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

      <div className="mt-[12px] w-full">
        {currentTab === 0 && (
          <ProfileCard
            onClickEdit={() => {
              setShowPopupCreateEvent(true);
            }}
            currentTab={currentTab}
          ></ProfileCard>
        )}
        {currentTab === 1 && (
          <ProfileCard currentTab={currentTab}></ProfileCard>
        )}
        {currentTab === 2 && (
          <ProfileCard
            onClickAccept={() => {
              setShowPopupAcceptCoHost(true);
            }}
            currentTab={currentTab}
          ></ProfileCard>
        )}
      </div>

      <CreateEventPopupView
        showPopupBuy={showPopupCreateEvent}
        setShowPopupBuy={setShowPopupCreateEvent}
        onClickSchedule={() => {
          setShowPopupCreateEvent(false);
        }}
        onClickSelectCoHost={() => {
          setShowPopupCreateEvent(false);
        }}
        isEdit={true}
      ></CreateEventPopupView>

      <ChooseSpeakerPopup
        onClickBack={() => {
          setShowPopupChooseSpeaker(false);
          setShowPopupCreateEvent(true);
        }}
        showPopupBuy={showPopupChooseSpeaker}
        setShowPopupBuy={setShowPopupChooseSpeaker}
      ></ChooseSpeakerPopup>

      <ChooseTimePopup
        onClickConfirm={() => {
          setShowPopupChooseTime(false);
        }}
        showPopupBuy={showPopupChooseTime}
        setShowPopupBuy={setShowPopupChooseTime}
        onClickBack={() => {
          console.log("back");
        }}
      ></ChooseTimePopup>

      <AcceptCoHostPopup
        showPopup={showPopupAcceptCoHost}
        setShowPopup={setShowPopupAcceptCoHost}
        onClickSelectCoHost={() => {
          console.log("onClickSelectCoHost");
        }}
        onClickSchedule={() => {
          console.log("onClickSchedule");
        }}
      ></AcceptCoHostPopup>
    </div>
  );
};

export default CreationvView;

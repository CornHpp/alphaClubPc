"use client";
import React from "react";
import Image from "next/image";
import starIcon from "@/assets/home/star.svg";
import Tabs from "@/components/custom/tabs";
import Card from "@/components/ui/card";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import plusIcon from "@/assets/home/plusIcon.svg";
import BuyPopupView from "@/components/ui/buyPopup";
import SellPopipView from "@/components/ui/sellPopup";
import CreateEventPopupView from "@/components/ui/createEventPopup";
import ChooseSpeakerPopup from "@/components/ui/chooseSpeakerPopup";
import ChooseTimePopup from "@/components/ui/chooseTimePopup";
import SuccessPopup from "@/components/ui/successPopup";
import UseProfileView from "@/components/ui/useProfile";
import Button from "@/components/custom/button";
import createIcon from "@/assets/home/create.svg";
import microphoneIcon from "@/assets/home/microphoneIcon.svg";
import cloudUploadIcon from "@/assets/home/cloudUploadIcon.svg";
import EventPopup from "@/components/ui/eventPopup";
import OpenIngEvent from "@/components/ui/openIngEvent";
import InviteSpeakPopup from "@/components/ui/inviteSpeakerPopup";
import ChooseVoiceNotePopup from "@/components/ui/createVoiceNotePopup";
import UploadAudioPopup from "@/components/ui/uploadAudioPopup";

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
const Home: React.FC = () => {
  const [tabsActive, setTabsActive] = React.useState(0);

  const [showPopupBuy, setShowPopupBuy] = React.useState(false);
  const [showPopupSell, setShowPopupSell] = React.useState(false);

  const [showPopupCreateEvent, setShowPopupCreateEvent] = React.useState(false);
  const [showPopupChooseSpeaker, setShowPopupChooseSpeaker] =
    React.useState(false);
  const [showPopupChooseTime, setShowPopupChooseTime] = React.useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = React.useState(false);
  const [showOpenIngEvent, setShowOpenIngEvent] = React.useState(false);
  const [showPopupInviteSpeak, setShowPopupInviteSpeak] = React.useState(false);

  const [showCreatVoiceNote, setShowCreatVoiceNote] = React.useState(false);
  const [showCreatVoiceNotePopup, setShowCreatVoiceNotePopup] =
    React.useState(false);
  const [showUploadAudioPopup, setShowUploadAudioPopup] = React.useState(false);
  const [cardList, setCardList] = React.useState([
    {
      userInfo: {
        username: "username",
        avatar: defaultHeaderIcon,
        followers: 100,
      },
    },
  ]);

  const clickBuy = () => {
    console.log("buy");
    setShowPopupBuy(true);
  };

  const clickSell = () => {
    console.log("sell");
    setShowPopupSell(true);
  };
  return (
    <div className="relative">
      <div className=" flex pt-[18px] h-[76px]">
        <div className="flex items-center">
          <div className="text-[32px] font-bold mr-[3px]">
            Pick Clubs To Join In!
          </div>
          <Image
            src={starIcon}
            alt=""
            width={29}
            height={26}
            className="w-[29px] h-[26px]"
          ></Image>
        </div>
      </div>

      <div className="pt-[4px]  pb-[16px]">
        <Tabs
          tabList={tabsList}
          activeIndex={tabsActive}
          tabClick={(val) => {
            setTabsActive(val);
          }}
        ></Tabs>
      </div>

      <div className="flex flex-wrap flex-1 overflow-y-scroll">
        {cardList.map((item, index) => {
          return (
            <div key={index + "r"}>
              <Card
                onOpeningEvent={() => {
                  setShowOpenIngEvent(true);
                }}
                onClickBuy={clickBuy}
                onClickSell={() => {
                  clickSell();
                }}
                item={item}
              ></Card>
            </div>
          );
        })}
      </div>

      <div className="flex fixed bottom-[40px] right-[55px] ">
        <Button
          active={false}
          width="123px"
          height="58px"
          text={"Create"}
          normalBackGround="#0D0D0D"
          color="#fff"
          borderRadius="28px"
          border="2px solid #0D0D0D"
          buttonClick={() => {
            setShowCreatVoiceNote(true);
          }}
        >
          <Image
            src={plusIcon}
            alt=""
            width={24}
            height={24}
            className="w-[24px] h-[24px]"
          ></Image>
        </Button>

        {showCreatVoiceNote && (
          <div className="absolute right-0 bottom-[70px] w-[178px] h-[108px] border-[2px] border-solid border-[#0D0D0D] rounded-[12px] p-[10px] bg-[#fff] cursor-pointer">
            <div
              className="w-[154px] h-[40px] rounded-[8px] bg-[#00FC6E] flex items-center justify-center text-[#0D0D0D] font-semibold"
              onClick={() => {
                setShowCreatVoiceNote(false);
                setShowCreatVoiceNotePopup(true);
              }}
            >
              <Image
                src={microphoneIcon}
                alt=""
                width={24}
                height={24}
                className="w-[24px] h-[24px] mr-[4px]"
              ></Image>
              Voice Note
            </div>
            <div
              className="mt-[4px] w-[154px] h-[40px] rounded-[8px]  flex items-center justify-center text-[#0D0D0D] font-semibold"
              onClick={() => {
                setShowCreatVoiceNote(false);
                setShowUploadAudioPopup(true);
              }}
            >
              <Image
                src={cloudUploadIcon}
                alt=""
                width={24}
                height={24}
                className="w-[24px] h-[24px] mr-[4px]"
              ></Image>
              Upload Audio
            </div>
          </div>
        )}
      </div>

      <BuyPopupView
        showPopupBuy={showPopupBuy}
        setShowPopupBuy={setShowPopupBuy}
      ></BuyPopupView>

      <SellPopipView
        showPopupBuy={showPopupSell}
        setShowPopupBuy={setShowPopupSell}
      ></SellPopipView>

      <CreateEventPopupView
        showPopupBuy={showPopupCreateEvent}
        setShowPopupBuy={setShowPopupCreateEvent}
        onClickSchedule={() => {
          setShowPopupCreateEvent(false);
          setShowPopupChooseTime(true);
        }}
        onClickSelectCoHost={() => {
          setShowPopupCreateEvent(false);
          setShowPopupChooseSpeaker(true);
        }}
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
          setShowPopupSuccess(true);
        }}
        showPopupBuy={showPopupChooseTime}
        setShowPopupBuy={setShowPopupChooseTime}
        onClickBack={() => {
          console.log("back");
          setShowPopupChooseTime(false);
          setShowPopupCreateEvent(true);
        }}
      ></ChooseTimePopup>

      <SuccessPopup
        onClickConfirm={() => {
          console.log("confirm");
        }}
        showPopupBuy={showPopupSuccess}
        setShowPopupBuy={setShowPopupSuccess}
        onClickBack={() => {
          console.log("back");
        }}
      ></SuccessPopup>

      <OpenIngEvent
        onClickEvent={() => {
          setShowPopupInviteSpeak(true);
        }}
        showOpenIngEvent={showOpenIngEvent}
      ></OpenIngEvent>

      <InviteSpeakPopup
        showPopup={showPopupInviteSpeak}
        setShowPopup={setShowPopupInviteSpeak}
        onClickBack={() => {
          setShowPopupInviteSpeak(false);
        }}
        onClickConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></InviteSpeakPopup>

      <ChooseVoiceNotePopup
        showPopup={showCreatVoiceNotePopup}
        setShowPopup={setShowCreatVoiceNotePopup}
        onClickBack={() => {
          setShowPopupInviteSpeak(false);
        }}
        onClickConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></ChooseVoiceNotePopup>
      <UploadAudioPopup
        showPopup={showUploadAudioPopup}
        setShowPopup={setShowUploadAudioPopup}
        onClickSchedule={() => {
          setShowPopupCreateEvent(false);
          setShowPopupChooseTime(true);
        }}
        onClickSelectCoHost={() => {
          setShowPopupCreateEvent(false);
          setShowPopupChooseSpeaker(true);
        }}
      ></UploadAudioPopup>
    </div>
  );
};

export default Home;

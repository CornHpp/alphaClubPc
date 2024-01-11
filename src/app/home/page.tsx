"use client";
import React from "react";
import Image from "next/image";
import LeftNav from "@/components/ui/leftNav";
import Header from "@/components/ui/header";
import starIcon from "@/assets/home/star.svg";
import Tabs from "@/components/custom/tabs";
import Card from "@/components/ui/card";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import Button from "@/components/custom/button";
import createIcon from "@/assets/home/create.svg";
import BuyPopupView from "@/components/ui/buyPopup";
import SellPopipView from "@/components/ui/sellPopup";
import CreateEventPopupView from "@/components/ui/createEventPopup";
import ChooseSpeakerPopup from "@/components/ui/chooseSpeakerPopup";
import ChooseTimePopup from "@/components/ui/chooseTimePopup";

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
    <div className="flex px-[16px]  relative pb-[16px]">
      <LeftNav></LeftNav>

      <div className="flex-1 flex flex-col " style={{}}>
        <Header></Header>
        <div
          className="flex flex-col border-[2px] border-[#0D0D0D] border-solid "
          style={{
            borderLeft: "none",
            borderRadius: "0 16px 16px 0",
            height: "calc(100vh - 106px)",
            background: "linear-gradient(180deg, #F0EBE8 0%, #ECECEC 100%)",
          }}
        >
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
        </div>
      </div>
      <div className="flex fixed bottom-[40px] right-[55px]">
        <Button
          active={false}
          width="146px"
          height="58px"
          text={"Create Event"}
          normalBackGround="#00FC6E"
          borderRadius="28px"
          border="2px solid #0D0D0D"
          buttonClick={() => {
            setShowPopupCreateEvent(true);
          }}
        >
          <Image
            src={createIcon}
            alt=""
            width={24}
            height={24}
            className="w-[24px] h-[24px]"
          ></Image>
        </Button>
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
        showPopupBuy={showPopupChooseTime}
        setShowPopupBuy={setShowPopupChooseTime}
        onClickBack={() => {
          console.log("back");
        }}
      ></ChooseTimePopup>
    </div>
  );
};

export default Home;

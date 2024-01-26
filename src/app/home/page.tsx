"use client";
import React, { useEffect } from "react";
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
import AudioPlayer from "@/components/custom/audioPlayer";
import { InfiniteScroll } from "antd-mobile";
import { getHolderAll, getHouseAll, infoType } from "@/api/model/home";
import InfiniteScrollContent from "@/components/custom/infiniteScrollContent";
import Emitter from "@/lib/emitter";
import { useSelector } from "react-redux";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "@/lib/animation/loadingfinal.json";
import nothingIcon from "@/assets/home/nothingIcon.svg";

const tabsList = [
  {
    text: "Holdings",
    img: "",
  },
  {
    text: "All",
    img: "",
  },
];
const Home: React.FC = () => {
  let [tabsActive, setTabsActive] = React.useState(0);

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

  const [hasMore, setHasMore] = React.useState(true);

  let [paramsData, setParamsData] = React.useState({
    pageNum: 1,
    pageSize: 50,
    queryKey: "",
  });

  const [cardList, setCardList] = React.useState<PartialGetAllHomeType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    Emitter.on("clickSearchIcon", (value: string) => {
      console.log(value);
      paramsData.queryKey = value;
      loadMore(true);
    });

    loadMore(true);
    return () => {
      Emitter.off("clickSearchIcon", () => {
        console.log("off");
      });
    };
  }, []);

  const loadMore = (refresh?: boolean) => {
    const parmas: infoType = {
      pageNum: paramsData.pageNum,
      pageSize: paramsData.pageSize,
      queryKey: paramsData.queryKey,
    };
    if (refresh) {
      parmas.pageNum = 1;
      setIsLoading(true);
      setCardList([]);
    }

    console.log(tabsActive);
    const getHomeList = tabsActive == 1 ? getHouseAll : getHolderAll;
    if (tabsActive == 1) {
      parmas.queryKey = paramsData.queryKey;
    }

    return getHomeList(parmas).then((res) => {
      console.log(res);
      setIsLoading(false);
      let { pageList = [], count = 0 } = res.result;
      if (!pageList) pageList = [];

      const newCardList = [
        ...(refresh ? [] : cardList),
        ...(pageList ? pageList : []),
      ];
      setCardList(newCardList);
      if (newCardList.length >= count) {
        setHasMore(false);
      }
      paramsData.pageNum = paramsData.pageNum + 1;
    });
  };

  const clickBuy = () => {
    console.log("buy");
    setShowPopupBuy(true);
  };

  const clickSell = () => {
    console.log("sell");
    setShowPopupSell(true);
  };
  return (
    <div className="relative flex-col flex h-[794px]">
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
            console.log(val);
            tabsActive = val;
            setTabsActive(val);
            loadMore(true);
          }}
        ></Tabs>
      </div>
      {isLoading && loadingAnimation && (
        <div
          className="w-[120px] h-[120px] bg-[#fff] flex items-center justify-center broder-solid border-[2px] border-[#0d0d0d] rounded-[16px]
          fixed top-[45%] left-[50%] transform [-translate-x-1/2] [-translate-y-1/2]
        "
        >
          <Player
            autoplay
            loop
            src={loadingAnimation}
            style={{ height: "100px", width: "100px" }}
          ></Player>
        </div>
      )}

      {!isLoading && cardList.length > 0 && (
        <div className="flex-1 pb-[10px] overflow-y-scroll">
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
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            <InfiniteScrollContent></InfiniteScrollContent>
          </InfiniteScroll>
        </div>
      )}
      {!isLoading && cardList.length == 0 && (
        <div className="flex flex-col items-center font-semibold  fixed top-[45%] left-[50%] transform [-translate-x-1/2] [-translate-y-1/2]">
          <Image
            src={nothingIcon}
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px]"
          ></Image>
          Un，there is nothing here
        </div>
      )}

      <div className="flex fixed bottom-[40px] right-[55px]">
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
          <div
            onMouseLeave={() => {
              setShowCreatVoiceNote(false);
            }}
            className="absolute right-0 bottom-[70px] w-[178px] h-[108px] border-[2px] border-solid border-[#0D0D0D] rounded-[12px] p-[10px] bg-[#fff] cursor-pointer"
          >
            <div
              className="w-[154px] h-[40px] rounded-[8px]  flex items-center justify-center text-[#0D0D0D] font-semibold hover:bg-[#00FC6E]"
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
              className="mt-[4px] w-[154px] hover:bg-[#00FC6E] h-[40px] rounded-[8px]  flex items-center justify-center text-[#0D0D0D] font-semibold"
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

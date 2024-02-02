"use client";

import React, { useCallback, useEffect } from "react";
import PlusCricleIcon from "@/assets/profile/PlusCricleIcon.svg";
import Image from "next/image";
import Tabs from "@/components/custom/tabs";
import CreationTabs from "./creationTabs";
import ProfileCard from "../../profileCard";
import CreateEventPopupView from "../../createEventPopup";
import ChooseSpeakerPopup from "../../chooseSpeakerPopup";
import ChooseTimePopup from "../../chooseTimePopup";
import AcceptCoHostPopup from "../../coHostPopup";
import { getAudioPersonList } from "@/api/model/profile";
import microphoneIcon from "@/assets/home/microphoneIcon.svg";
import microphoneIconWhite from "@/assets/profile/microphoneIconWhite.svg";
import InfinietScrollbar from "@/components/custom/scrollInfiniteScroll";
import nocreationIcon from "@/assets/home/nocreationIcon.svg";
import AudioCard from "../../Carousel/audioCard";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import ChooseVoiceNotePopup from "../../createVoiceNotePopup";
import tipCloseIcon from "@/assets/profile/tipCloseIcon.svg";
import Button from "@/components/custom/button";
import { getQueryParams } from "@/lib/util";

interface Props {
  // Add your props here
}

const CreationvView: React.FC<Props> = () => {
  const { userinfo } = useSelector((state: any) => state.user);

  const [showPopupCreateEvent, setShowPopupCreateEvent] = React.useState(false);
  const [showPopupChooseSpeaker, setShowPopupChooseSpeaker] =
    React.useState(false);
  const [showPopupChooseTime, setShowPopupChooseTime] = React.useState(false);
  let [currentTab, setCurrentTab] = React.useState(0);
  const [showPopupAcceptCoHost, setShowPopupAcceptCoHost] =
    React.useState(false);

  const [audioPersonList, setAudioPersonList] = React.useState<
    creatAudioType[]
  >([]);

  const [showCreatVoiceNotePopup, setShowCreatVoiceNotePopup] =
    React.useState(false);

  const [orderHasMore, setOrderHasMore] = React.useState<boolean>(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryParams = {
    pageNum: 1,
    pageSize: 50,
  };

  const urlParams = useParams();

  const houseId = urlParams.id ? urlParams.id : userinfo.twitterUidStr;

  useEffect(() => {
    const windowUrl = getQueryParams();
    if (windowUrl?.type == "AudioDem") {
      setCurrentTab(1);
    }
  }, []);

  const getAudioPersonListFunc = async (isReset?: boolean) => {
    if (isReset) {
      queryParams.pageNum = 1;
      setAudioPersonList([]);
    }
    const params = {
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize,
      source: currentTab,
      houseId: houseId as string,
    };
    console.log("params", params);
    const res = await getAudioPersonList(params);

    let { pageList = [], count = 0 } = res.result;
    if (!pageList) pageList = [];

    const newCardList = [
      ...(isReset ? [] : audioPersonList),
      ...(pageList ? pageList : []),
    ];
    setAudioPersonList(newCardList);

    if (newCardList.length >= count) {
      setOrderHasMore(false);
    }
    queryParams.pageNum++;
  };

  React.useEffect(() => {
    getAudioPersonListFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openVoicePopup = () => {
    setShowCreatVoiceNotePopup(true);
  };
  const [showVoiceTntro, setShowVoiceTntro] = React.useState(true);

  return (
    <div className="h-full flex flex-col">
      {showVoiceTntro && (
        <div
          className="border-[2px] min-w-[355px] rounded-[16px] h-[150px] border-[#0D0D0D]
     justify-between
       border-solid px-[16px] py-[10px] bg-[#00FC6E] flex flex-col mb-[24px] relative"
        >
          <div className="pl-[32px] text-[18px] font-bold w-full flex justify-between">
            <div>Post Your Voice Intro</div>
            <Image
              src={tipCloseIcon}
              className="cursor-pointer"
              onClick={() => {
                setShowVoiceTntro(false);
              }}
              alt=""
              width={16}
              height={16}
            ></Image>
          </div>
          <div className="mt-[4px] text-[12px]">
            Record a voice intro now for more publicity on Alpha Club and
            attract fans to listen.
          </div>
          <Button
            hideBottomBackground={true}
            active={false}
            width="100%"
            height="50px"
            text={"Click To Record"}
            color={"#fff"}
            normalBackGround={"#0D0D0D"}
            borderRadius="27px"
            border="none"
            buttonClick={() => {
              openVoicePopup();
            }}
          >
            <Image
              src={microphoneIconWhite}
              alt=""
              width={24}
              height={24}
            ></Image>
          </Button>
        </div>
      )}

      <div className="border-[2px] min-w-[355px] rounded-[16px]  border-[#0D0D0D] border-solid py-[16px] bg-white flex-1 flex flex-col overflow-hidden">
        <div className="w-full flex items-center text-[#0D0D0D] justify-between font-semibold px-[14px]">
          <div className="text-[20px] ">Creation</div>
          <div
            className=" w-[108px] h-[34px] border-[#0D0D0D] border-solid border-[2px] bg-[#FFF96D] items-center flex justify-center text-[12px] rounded-[17px]
          cursor-pointer
          "
            onClick={() => {
              setShowCreatVoiceNotePopup(true);
            }}
          >
            <Image
              src={microphoneIcon}
              alt=""
              width={18}
              height={18}
              className="w-[18px] h-[18px]"
            ></Image>
            Voice Note
          </div>
        </div>

        <div className="mt-[14px] px-[14px]">
          <CreationTabs
            currentTab={currentTab}
            setCurrentTab={(val) => {
              setCurrentTab(val);
              currentTab = val;
              getAudioPersonListFunc(true);
            }}
          ></CreationTabs>
        </div>

        <div className="mt-[12px] w-full flex-1 overflow-y-scroll">
          {audioPersonList.length > 0 && (
            <InfinietScrollbar
              hasMore={orderHasMore}
              onLoadMore={getAudioPersonListFunc}
              // distanceClientHeight={showVoiceTntro ? "464px" : "639px"}
            >
              <div>
                <div className="mx-[14px]">
                  {audioPersonList.map((item, index) => {
                    return (
                      <div
                        className="mt-[12px] border-solid border-[#0d0d0d] border-[1px] p-[10px] rounded-[10px]"
                        key={index + "1"}
                      >
                        <AudioCard
                          id={item.id}
                          time={item.showTime}
                          audioUrl={item.fileUrl}
                          audioSource={item.source}
                          title={item.title}
                          audioDuration={item.audioDuration}
                        ></AudioCard>
                      </div>
                    );
                  })}
                </div>
              </div>
            </InfinietScrollbar>
          )}

          {audioPersonList.length == 0 && (
            <div className="flex flex-col items-center font-semibold mt-[100px]">
              <Image
                src={nocreationIcon}
                alt=""
                width={120}
                height={120}
                className="w-[120px] h-[120px]"
              ></Image>
              Un，there is nothing here
            </div>
          )}

          {/* {currentTab === 2 && (
          <ProfileCard
            onClickAccept={() => {
              setShowPopupAcceptCoHost(true);
            }}
            currentTab={currentTab}
          ></ProfileCard>
        )} */}
        </div>

        <ChooseVoiceNotePopup
          showPopup={showCreatVoiceNotePopup}
          setShowPopup={setShowCreatVoiceNotePopup}
          onSuccess={() => {
            setShowCreatVoiceNotePopup(false);
            setTimeout(() => {
              // setShowHomeToast(true);
              // setTotastMessage("Create Voice Note Success");
              getAudioPersonListFunc(true);
            }, 1000);
          }}
        ></ChooseVoiceNotePopup>

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
    </div>
  );
};

export default CreationvView;

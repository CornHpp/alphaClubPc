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
import DeletePopupView from "@/components/ui/deletePopup";
import { getQueryParams, utcToLocal } from "@/lib/util";
import { audioDelete } from "@/api/model/audio";
import Toast from "@/components/custom/Toast";
import cloudUploadIcon from "@/assets/home/cloudUploadIcon.svg";
import UploadAudioPopup from "../../uploadAudioPopup";
import EventEmitter from "@/lib/emitter";

interface Props {
  // Add your props here
  showVoiceTntro: boolean;
  setIsShowVoiceIntro: (val: boolean) => void;
}

const CreationvView: React.FC<Props> = (props) => {
  const { showVoiceTntro, setIsShowVoiceIntro } = props;
  const { userinfo } = useSelector((state: any) => state.user);

  const [showUploadAudioPopup, setShowUploadAudioPopup] = React.useState(false);

  const [cacheCurrentAudioData, setCacheCurrentAudioData] =
    React.useState<creatAudioType>();

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

  const [currentDeletId, setCurrentDeletId] = React.useState<any>();

  const [isIntroSelf, setIsIntroSelf] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryParams = {
    pageNum: 1,
    pageSize: 50,
  };

  const urlParams = useParams();
  const isSelf = userinfo?.twitterUidStr === urlParams.id || !urlParams.id;

  const houseId = urlParams.id ? urlParams.id : userinfo?.twitterUidStr;

  useEffect(() => {
    const windowUrl = getQueryParams();
    if (windowUrl?.type == "AudioDem") {
      setCurrentTab(1);
    }
  }, []);
  const [showDeletePopup, setShowDeletePopup] = React.useState(false);

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
    setIsIntroSelf(true);
  };

  const handleClickDelete = () => {
    audioDelete(currentDeletId).then((res) => {
      console.log("res", res);
      getAudioPersonListFunc(true);
      Toast.success("Delete Success");
      setShowDeletePopup(false);
    });
  };

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
                setIsShowVoiceIntro(false);
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

          {isSelf && (
            <div
              className=" min-w-[108px] h-[34px] px-[14px] border-[#0D0D0D] border-solid border-[2px] bg-[#FFF96D] items-center flex justify-center text-[12px] rounded-[17px]
      cursor-pointer
      "
              style={{
                background: currentTab == 0 ? "#FFF96D" : "#00FC6E",
              }}
              onClick={() => {
                if (currentTab == 0) {
                  setShowCreatVoiceNotePopup(true);
                } else {
                  setShowUploadAudioPopup(true);
                }
              }}
            >
              <Image
                src={currentTab == 0 ? microphoneIcon : cloudUploadIcon}
                alt=""
                width={18}
                height={18}
                className="w-[18px] h-[18px]"
              ></Image>
              {currentTab == 0 ? "Voice Note" : "Upload Audio"}
            </div>
          )}
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
                          handleClickDelete={(id) => {
                            setCurrentDeletId(id);
                            setShowDeletePopup(true);
                          }}
                          showDeleteIcon={isSelf}
                          isProfile={true}
                          id={item.id}
                          time={utcToLocal(item.showTime)}
                          audioUrl={item.fileUrl}
                          audioSource={item.source}
                          title={item.title}
                          audioDuration={item.audioDuration}
                          readedUserCount={item.readedUserCount}
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
              {"It's time to record something!"}
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
          isProfile
          showPopup={showCreatVoiceNotePopup}
          setShowPopup={setShowCreatVoiceNotePopup}
          onSuccess={() => {
            setShowCreatVoiceNotePopup(false);
            getAudioPersonListFunc(true);
            EventEmitter.emit("updateUserInfo");
          }}
          isIntroSelf={isIntroSelf}
        ></ChooseVoiceNotePopup>

        <UploadAudioPopup
          isProfileView
          showPopup={showUploadAudioPopup}
          setShowPopup={setShowUploadAudioPopup}
          onClickSchedule={(val) => {
            setCacheCurrentAudioData(val);
            setShowUploadAudioPopup(false);
            setShowPopupChooseTime(true);
          }}
          onClickSelectCoHost={() => {
            setShowPopupCreateEvent(false);
            setShowPopupChooseSpeaker(true);
          }}
          onSuccess={() => {
            setShowUploadAudioPopup(false);
            getAudioPersonListFunc(true);
          }}
        ></UploadAudioPopup>

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
          audioData={cacheCurrentAudioData}
          showPopupBuy={showPopupChooseTime}
          setShowPopupBuy={setShowPopupChooseTime}
          onClickBack={() => {
            console.log("back");
            setShowUploadAudioPopup(true);
            setShowPopupChooseTime(false);
          }}
          onSuccess={() => {
            getAudioPersonListFunc(true);
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

      <DeletePopupView
        showPopup={showDeletePopup}
        setShowPopup={setShowDeletePopup}
        clickDelete={handleClickDelete}
      ></DeletePopupView>
    </div>
  );
};

export default CreationvView;

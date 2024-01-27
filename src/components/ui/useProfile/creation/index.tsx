"use client"

import React, { useCallback } from "react"
import PlusCricleIcon from "@/assets/profile/PlusCricleIcon.svg"
import Image from "next/image"
import Tabs from "@/components/custom/tabs"
import CreationTabs from "./creationTabs"
import ProfileCard from "../../profileCard"
import CreateEventPopupView from "../../createEventPopup"
import ChooseSpeakerPopup from "../../chooseSpeakerPopup"
import ChooseTimePopup from "../../chooseTimePopup"
import AcceptCoHostPopup from "../../coHostPopup"
import { getAudioPersonList } from "@/api/model/profile"
import microphoneIcon from "@/assets/home/microphoneIcon.svg"
import InfinietScrollbar from "@/components/custom/scrollInfiniteScroll"
import nocreationIcon from "@/assets/home/nocreationIcon.svg"
import AudioCard from "../../Carousel/audioCard"
import { useParams } from "next/navigation"

interface Props {
  // Add your props here
}

const CreationvView: React.FC<Props> = () => {
  // Add your component logic here
  const [showPopupCreateEvent, setShowPopupCreateEvent] = React.useState(false)
  const [showPopupChooseSpeaker, setShowPopupChooseSpeaker] =
    React.useState(false)
  const [showPopupChooseTime, setShowPopupChooseTime] = React.useState(false)
  let [currentTab, setCurrentTab] = React.useState(0)
  const [showPopupAcceptCoHost, setShowPopupAcceptCoHost] =
    React.useState(false)

  const [audioPersonList, setAudioPersonList] = React.useState<
    creatAudioType[]
  >([])

  const [orderHasMore, setOrderHasMore] = React.useState<boolean>(true)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryParams = {
    pageNum: 1,
    pageSize: 50,
  }

  const urlParams = useParams()

  const houseId = urlParams.id ? urlParams.id : "1128532098262765568"

  const getAudioPersonListFunc = useCallback(
    async (isReset?: boolean) => {
      const params = {
        pageNum: queryParams.pageNum,
        pageSize: queryParams.pageSize,
        source: currentTab,
        houseId: houseId as string,
      }
      if (isReset) {
        queryParams.pageNum = 1
        setAudioPersonList([])
      }
      const res = await getAudioPersonList(params)

      let { pageList = [], count = 0 } = res.result
      if (!pageList) pageList = []

      const newCardList = [
        ...(isReset ? [] : audioPersonList),
        ...(pageList ? pageList : []),
      ]
      setAudioPersonList(newCardList)

      if (newCardList.length >= count) {
        setOrderHasMore(false)
      }
      queryParams.pageNum++
    },
    [audioPersonList, currentTab, houseId, queryParams]
  )

  React.useEffect(() => {
    getAudioPersonListFunc()
  }, [getAudioPersonListFunc])

  return (
    <div className="border-[2px] min-w-[355px] rounded-[16px]  border-[#0D0D0D] border-solid h-[684px]  py-[16px] bg-white">
      <div className="w-full flex items-center text-[#0D0D0D] justify-between font-semibold px-[14px]">
        <div className="text-[20px] ">Creation</div>
        <div
          className=" w-[108px] h-[34px] border-[#0D0D0D] border-solid border-[2px] bg-[#FFF96D] items-center flex justify-center text-[12px] rounded-[17px]
          cursor-pointer
          "
          onClick={() => {
            setShowPopupCreateEvent(true)
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
            setCurrentTab(val)
            currentTab = val
            getAudioPersonListFunc(true)
          }}
        ></CreationTabs>
      </div>

      <div className="mt-[12px] w-full">
        {audioPersonList.length > 0 && (
          <InfinietScrollbar
            hasMore={orderHasMore}
            onLoadMore={getAudioPersonListFunc}
            distanceClientHeight={554}
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
                        time={item.showTime}
                        audioUrl={item.fileUrl}
                        audioSource={item.source}
                        title={item.title}
                      ></AudioCard>
                    </div>
                  )
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

      <CreateEventPopupView
        showPopupBuy={showPopupCreateEvent}
        setShowPopupBuy={setShowPopupCreateEvent}
        onClickSchedule={() => {
          setShowPopupCreateEvent(false)
        }}
        onClickSelectCoHost={() => {
          setShowPopupCreateEvent(false)
        }}
        isEdit={true}
      ></CreateEventPopupView>

      <ChooseSpeakerPopup
        onClickBack={() => {
          setShowPopupChooseSpeaker(false)
          setShowPopupCreateEvent(true)
        }}
        showPopupBuy={showPopupChooseSpeaker}
        setShowPopupBuy={setShowPopupChooseSpeaker}
      ></ChooseSpeakerPopup>

      <ChooseTimePopup
        onClickConfirm={() => {
          setShowPopupChooseTime(false)
        }}
        showPopupBuy={showPopupChooseTime}
        setShowPopupBuy={setShowPopupChooseTime}
        onClickBack={() => {
          console.log("back")
        }}
      ></ChooseTimePopup>

      <AcceptCoHostPopup
        showPopup={showPopupAcceptCoHost}
        setShowPopup={setShowPopupAcceptCoHost}
        onClickSelectCoHost={() => {
          console.log("onClickSelectCoHost")
        }}
        onClickSchedule={() => {
          console.log("onClickSchedule")
        }}
      ></AcceptCoHostPopup>
    </div>
  )
}

export default CreationvView

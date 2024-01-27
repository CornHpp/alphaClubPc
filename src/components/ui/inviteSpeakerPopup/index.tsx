import React, { useState } from "react"
import PopupView from "../popup"
import Image from "next/image"
import type { DatePickerProps } from "antd"
import PlusCricleIcon from "@/assets/profile/PlusCricleIcon.svg"

import HoldTabs from "../useProfile/holdings/holdTabs"
import Search from "@/components/custom/search"
import searchPopupIcon from "@/assets/popup/searchPopupIcon.svg"
import UserHeader from "../userHeader"
import circleRightIcon from "@/assets/popup/circleRightIcon.svg"
import circleWrongIcon from "@/assets/popup/circleWrongIcon.svg"
import circleDisableIcon from "@/assets/popup/circleDisableIcon.svg"
interface Props {
  // Define your component props here
  showPopup: boolean
  setShowPopup: (showPopup: boolean) => void
  onClickBack: () => void
  onClickConfirm: () => void
}

const InviteSpeakPopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickBack,
  onClickConfirm,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0)

  const [list, setList] = useState([{}, {}])

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString)
  }
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <PopupView
      width={512}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false)
        setSelectedPrice(0)
      }}
      titleText={
        <HoldTabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        ></HoldTabs>
      }
    >
      <div className="text-[14px]">1 speaker，10 seats</div>

      <div className="w-full mt-[12px]">
        <Search
          width={480}
          height={54}
          placeholder="Search for holder in the room to become speaker"
          paddingLeft="40px"
          leftNode={
            <div className="ml-[9px]">
              <Image
                src={searchPopupIcon}
                alt=""
                width={20}
                height={20}
              ></Image>
            </div>
          }
          rightNode={<></>}
          onChange={() => {}}
        ></Search>
      </div>

      <div className="">
        {list.map((item, index) => {
          return (
            <div
              className="w-full flex items-center mt-[16px]"
              key={index + "g"}
            >
              <div className="flex-1 flex items-center justify-between">
                <UserHeader headerWidth={40} titleSize={"16px"}></UserHeader>
                <div className=" text-right text-[12px]">
                  Cards
                  <div className="text-[18px] font-semibold">32</div>
                </div>
              </div>
              {currentTab === 0 ? (
                <div>
                  {index === 0 ? (
                    <div className="w-[116px]  flex items-center justify-end">
                      <Image
                        src={circleWrongIcon}
                        className="mr-[8px]"
                        alt=""
                        width={40}
                        height={40}
                      ></Image>

                      <Image
                        src={circleRightIcon}
                        alt=""
                        width={40}
                        height={40}
                      ></Image>
                    </div>
                  ) : (
                    <div className="w-[116px]  flex items-center justify-end">
                      <Image
                        src={circleDisableIcon}
                        className=""
                        alt=""
                        width={40}
                        height={40}
                      ></Image>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-[116px]  flex items-center justify-end">
                  <div className=" cursor-pointer w-[82px] h-[40px] border-[#0D0D0D] border-solid border-[2px] bg-[#00FC6E] items-center flex justify-center text-[12px] rounded-[20px]">
                    <Image
                      src={PlusCricleIcon}
                      alt=""
                      className="mr-[2px]"
                      width={16}
                      height={16}
                    ></Image>
                    Invite
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </PopupView>
  )
}

export default InviteSpeakPopup

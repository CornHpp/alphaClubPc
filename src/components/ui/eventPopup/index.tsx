import React, { useState } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import BackIcon from "@/assets/popup/back.svg";
import type { DatePickerProps } from "antd";
import audioIcon from "@/assets/home/audio.svg";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import headPhoneIcon from "@/assets/popup/headPhoneIcon.svg";

import CalendarView from "@/components/custom/calendar";
import { SmallButton } from "../Carousel";
interface Props {
  // Define your component props here
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
  onClickBack: () => void;
  onClickConfirm: () => void;
}

const EventPopup: React.FC<Props> = ({
  setShowPopupBuy,
  showPopupBuy,
  onClickBack,
  onClickConfirm,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [coHostList, setCoHostList] = React.useState([
    {
      name: "username",
    },
    {
      name: "username",
    },
    {
      name: "username",
    },
    {
      name: "username",
    },
    {
      name: "username",
    },
  ]);

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  const [searchPeopleList, setSearchPeopleList] = React.useState([
    {},
    {},
    {},
    {},
    {},
  ]);

  const [selectedPersons, setSelectedPerson] = useState<number[]>([1]);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <PopupView
      width={512}
      showPopup={showPopupBuy}
      handleCancel={() => {
        setShowPopupBuy(false);
        setSelectedPrice(0);
      }}
      titleText={"Event"}
    >
      <div className="flex items-center">
        <SmallButton text="LIVE" background="#00FC6E">
          <Image
            src={audioIcon}
            alt=""
            width={13.5}
            height={10}
            className="w-[13.5px] h-[10px] mr-[3px]"
          ></Image>
        </SmallButton>
        <div className="text-[20px] ml-[4px] mt-[-3px]">
          Space To Come In And Make Friends.
        </div>
      </div>

      <div className="mt-[8px]  ml-[-16px]">
        <div className="flex flex-wrap">
          {coHostList.map((item, index) => {
            return (
              <div className="w-[25%] flex flex-col justify-center items-center h-[122px]">
                <Image
                  src={defaultHeaderIcon}
                  alt=""
                  width={56}
                  height={56}
                ></Image>
                <div className="mt-[2px] font-semibold">Dekid</div>
                <div className="text-[11px] mt-[2px] border-[1px] px-[8px] py-[1px] border-[#0D0D0D] border-solid rounded-[10px] bg-[#B4FFB3]">
                  Host
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full h-[40px] border-[1px] border-[#0D0D0D] rounded-[8px] flex items-center px-[10px]">
        <Image src={headPhoneIcon} alt="" width={16} height={16}></Image>
        <span className="text-[14px] font-semibold ml-[4px] mr-[4px]">
          32{" "}
        </span>{" "}
        Users are listening
      </div>
      <div className="mt-[32px] w-full">
        <Button
          hideBottomBackground={true}
          active={false}
          width="100%"
          height="54px"
          text={"Enter"}
          color={selectedPersons.length ? "#fff" : "#949694"}
          normalBackGround={selectedPersons.length ? "#0D0D0D" : "#E9E9E9"}
          borderRadius="27px"
          border="none"
          buttonClick={onClickConfirm}
        ></Button>
      </div>
    </PopupView>
  );
};

export default EventPopup;

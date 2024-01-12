import React, { useState } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import BackIcon from "@/assets/popup/back.svg";
import type { DatePickerProps } from "antd";
import celebrateIcon from "@/assets/popup/celebrate.svg";

import "./index.css";
import CalendarView from "@/components/custom/calendar";
import twitterIcon from "@/assets/popup/twitterIcon.svg";
interface Props {
  // Define your component props here
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
  onClickBack: () => void;
  onClickConfirm: () => void;
}

const SuccessPopup: React.FC<Props> = ({
  setShowPopupBuy,
  showPopupBuy,
  onClickBack,
  onClickConfirm,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [selectedPersons, setSelectedPerson] = useState<number[]>([1]);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <PopupView
      width={400}
      showPopup={showPopupBuy}
      handleCancel={() => {
        setShowPopupBuy(false);
        setSelectedPrice(0);
      }}
      titleText={
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            onClickBack();
          }}
        >
          <Image
            src={celebrateIcon}
            alt=""
            width={32}
            height={32}
            className="mr-[4px]"
          ></Image>
          Successful
        </div>
      }
    >
      <div className="">
        The event has been created, notify more people so they know about it and
        participate!
      </div>

      <div className="mt-[16px]">
        <Button
          active={false}
          width="362px"
          height={"50px"}
          text={"Twitter"}
          background="#fff"
          borderRadius="24px"
          border="2px solid #0D0D0D"
          onMouseEnter={() => {}}
          buttonClick={() => {}}
          onMouseLeave={() => {}}
        >
          <Image src={twitterIcon} alt="" width={20} height={20}></Image>
        </Button>
      </div>
    </PopupView>
  );
};

export default SuccessPopup;

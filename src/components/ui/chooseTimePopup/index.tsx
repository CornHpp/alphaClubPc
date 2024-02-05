import React, { useState } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import BackIcon from "@/assets/popup/back.svg";
import type { DatePickerProps } from "antd";
import Emitter from "@/lib/emitter";

import "./index.css";
import CalendarView from "@/components/custom/calendar";
import { audioCreate } from "@/api/model/audio";
import { formatDate, localToUtc } from "@/lib/util";
interface Props {
  // Define your component props here
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
  onClickBack: () => void;
  onClickConfirm: () => void;
  audioData?: creatAudioType;
  onSuccess?: () => void;
}

const ChooseTimePopup: React.FC<Props> = ({
  setShowPopupBuy,
  showPopupBuy,
  onClickBack,
  onClickConfirm,
  audioData,
  onSuccess,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  const [searchPeopleList, setSearchPeopleList] = React.useState([
    {},
    {},
    {},
    {},
    {},
  ]);

  const [selectedPersons, setSelectedPerson] = useState<number[]>([1]);

  const [selectedTime, setSelectedTime] = useState<string>(
    formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
  );

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    // setSelectedTime(dateString);
  };

  const onClickConfirmFunc = () => {
    const params = {
      ...(audioData as creatAudioType),
      showTime: localToUtc(selectedTime),
    };
    console.log("params", params);
    audioCreate(params)
      .then((res) => {
        console.log("res", res);
        Emitter.emit("createAudioSuccess");
        setShowPopupBuy(false);
        onSuccess && onSuccess();
      })
      .catch((err) => {});
  };

  return (
    <PopupView
      width={400}
      showCloseImage={false}
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
            src={BackIcon}
            alt=""
            width={20}
            height={20}
            className="mr-[6px]"
          ></Image>
          Event Schedule
        </div>
      }
    >
      <div className="flex justify-center mt-[2px]">
        <CalendarView
          setMergeedTime={(val) => {
            setSelectedTime(val);
          }}
        ></CalendarView>
      </div>

      <div className="mt-[32px]">
        <Button
          hideBottomBackground={true}
          active={false}
          width="368px"
          height="50px"
          text={"Confirm"}
          color={selectedPersons.length ? "#fff" : "#949694"}
          normalBackGround={selectedPersons.length ? "#0D0D0D" : "#E9E9E9"}
          borderRadius="27px"
          border="none"
          buttonClick={onClickConfirmFunc}
        ></Button>
      </div>
    </PopupView>
  );
};

export default ChooseTimePopup;

import React, { useState } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import BackIcon from "@/assets/popup/back.svg";
import type { DatePickerProps } from "antd";
import CalendarView from "@/components/custom/calendar";
import Search from "@/components/custom/search";
import { audioCreate, audioUpload } from "@/api/model/audio";
import PressRecord from "./pressRecord";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onClickBack: () => void;
}

const ChooseVoiceNotePopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickBack,
}) => {
  const [formData, setFormData] = useState<FormData>();

  const [value, setValue] = React.useState("");

  const onClickConfirm = () => {
    if (value && formData) {
      audioUpload(formData).then((res) => {
        console.log("res", res);
        const params = {
          title: value,
          fileUrl: res.result,
          source: 1,
        };
        audioCreate(params).then((res) => {
          console.log("res", res);
        });
      });
    }
  };

  return (
    <PopupView
      width={400}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
      }}
      titleText={"Short Recording"}
    >
      <div className="">
        <div className="font-bold text-[14px]">Recording Title</div>
        <Search
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
          width={368}
          height={54}
          placeholder="2024-01-16 short recording"
          rightNode={<></>}
        ></Search>
      </div>

      <PressRecord
        toFatherAudioFile={(formData) => {
          console.log("audioVal", formData);
          setFormData(formData);
        }}
      ></PressRecord>

      <div className="mt-[32px]">
        <Button
          hideBottomBackground={true}
          active={false}
          width="368px"
          height="50px"
          text={"Post Now"}
          color={value && formData ? "#fff" : "#949694"}
          normalBackGround={value && formData ? "#0D0D0D" : "#E9E9E9"}
          borderRadius="27px"
          border="none"
          buttonClick={onClickConfirm}
        ></Button>
      </div>
    </PopupView>
  );
};

export default ChooseVoiceNotePopup;

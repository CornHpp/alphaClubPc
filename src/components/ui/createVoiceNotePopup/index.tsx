import React, { useState } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import BackIcon from "@/assets/popup/back.svg";
import type { DatePickerProps } from "antd";
import CalendarView from "@/components/custom/calendar";
import Search from "@/components/custom/search";
import AudioEdit from "./audioEdit";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onClickBack: () => void;
  onClickConfirm: () => void;
}

const ChooseVoiceNotePopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickBack,
  onClickConfirm,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [value, setValue] = React.useState("");
  const [record, setRecord] = useState(false);

  const [selectedPersons, setSelectedPerson] = useState<number[]>([]);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onStop = (recordedBlob: any) => {
    console.log("recordedBlob is: ", recordedBlob);
    // setTempFile(recordedBlob);
  };

  const onData = (recordedBlob: any) => {
    // console.log("chunk of real-time data is: ", recordedBlob);
  };

  const [files, setFiles] = useState([null]);

  return (
    <PopupView
      width={400}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setSelectedPrice(0);
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

      <AudioEdit></AudioEdit>

      <div className="mt-[32px]">
        <Button
          hideBottomBackground={true}
          active={false}
          width="368px"
          height="50px"
          text={"Post Now"}
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

export default ChooseVoiceNotePopup;

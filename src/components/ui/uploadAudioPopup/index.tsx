import React from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import "./index.css";
import redDelete from "@/assets/popup/redDelete.svg";
import { Input } from "antd";
import { audioCreate, audioUpload } from "@/api/model/audio";

import DragUpload from "./dragUpload";

const { TextArea } = Input;
interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onClickSelectCoHost: () => void;
  isEdit?: boolean;
  onClickSchedule: () => void;
}

const UploadAudioPopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickSelectCoHost,
  onClickSchedule,
  isEdit = false,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [saveAudioUrl, setSaveAudioUrl] = React.useState("");

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  const clickStartingNow = () => {
    const data: creatAudioType = {
      title: value,
      descr: "",
      fileUrl: saveAudioUrl,
      showTime: "2024-01-22 10:00:00",
      source: 0,
    };

    const test = {
      title: "test",
      source: 0,
      fileUrl:
        "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
      showTime: "2024-01-22 10:00:00",
    };

    audioCreate(test).then((res) => {
      console.log(res);
      setShowPopup(false);
      setSelectedPrice(0);
    });
  };

  return (
    <PopupView
      width={400}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setSelectedPrice(0);
      }}
      titleText="Upload Audio"
    >
      <div className="">
        <div className="font-medium text-[14px]">Audio Title</div>

        <div className="mt-[4px]">
          <Search
            value={value}
            onChange={(val) => {
              setValue(val);
            }}
            rightNode={true}
            width={364}
            height={50}
            placeholder="What do you want to talk about?"
          ></Search>
        </div>
      </div>

      <div className="mt-[32px]">
        <div className="text-[14px]">Audio Description</div>
        <div className="mt-[4px]">
          <TextArea
            showCount
            maxLength={120}
            style={{ height: 120, resize: "none" }}
            className="border-[#0D0D0D] border-[2px] :hover:border-[#0D0D0D] :focus:border-[#0D0D0D] rounded-[12px]"
            placeholder="Please enter an audio description"
          />
        </div>
      </div>

      <div className="mt-[32px]">
        <div>Upload Audio</div>
        <div className=" w-full flex items-center ">
          <div className="mt-[4px] flex  h-[100px] ">
            <DragUpload setUrltoParent={setSaveAudioUrl}></DragUpload>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-[32px] w-full justify-between h-[54px]">
        <Button
          active={false}
          width="174px"
          height={hideButtonBg ? "54px" : "52px"}
          text={isEdit ? "Delete" : "Schedule"}
          background="#fff"
          borderRadius="26px"
          border="2px solid #0D0D0D"
          color={isEdit ? "#E42222" : "#0D0D0D"}
          hideBottomBackground={hideButtonBg}
          onMouseEnter={() => {
            setHideButtonBg(true);
          }}
          buttonClick={() => {
            onClickSchedule();
          }}
          onMouseLeave={() => {
            setHideButtonBg(false);
          }}
        >
          {isEdit && (
            <Image src={redDelete} alt="" width={16} height={16}></Image>
          )}
        </Button>
        <Button
          active={false}
          width="176px"
          height="54px"
          text={"Starting now"}
          background="#0D0D0D"
          borderRadius="26px"
          border="2px solid #0D0D0D"
          normalBackGround="#0D0D0D"
          color="#fff"
          buttonClick={clickStartingNow}
        ></Button>
      </div>
    </PopupView>
  );
};

export default UploadAudioPopup;

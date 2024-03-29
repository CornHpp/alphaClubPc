import React, { useEffect, useState } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import "./index.css";
import redDelete from "@/assets/popup/redDelete.svg";
import { Input } from "antd";
import { audioCreate, audioUpload } from "@/api/model/audio";
import Emitter from "@/lib/emitter";
import errorIcon from "@/assets/home/errorIcon.svg";

import DragUpload from "./dragUpload";
import { formatDate, localToUtc } from "@/lib/util";
import Toaster from "@/components/custom/Toast";
import { useRouter } from "next/navigation";

const { TextArea } = Input;
interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onClickSelectCoHost: () => void;
  isEdit?: boolean;
  onClickSchedule: (data: creatAudioType) => void;
  onSuccess: () => void;
  isProfileView?: boolean;
}

const UploadAudioPopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickSchedule,
  isEdit = false,
  onSuccess,
  isProfileView = false,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);
  const [describe, setDescribe] = React.useState("");
  const [value, setValue] = React.useState("");
  const [saveAudioUrl, setSaveAudioUrl] = React.useState("");
  const [saveAudioDuration, setSaveAudioDuration] = React.useState(0);

  const [hideButtonBg, setHideButtonBg] = React.useState(false);
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    Emitter.on("createAudioSuccess", (url: string) => {
      setValue("");
      setDescribe("");
      setSaveAudioUrl("");
      Toaster.success("Upload voice note successfully");
      setTimeout(() => {
        router.push("/profile?type=" + "AudioDem");
      }, 1000);
      // onSuccess();
    });
    return () => {
      Emitter.off("createAudioSuccess");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, onSuccess]);

  const onClickScheduleFunc = () => {
    if (!value) {
      Toaster.error("Please enter an audio title");
      return;
    }
    if (!saveAudioUrl) {
      Toaster.error("Please upload an audio");
      return;
    }

    const data: creatAudioType = {
      title: value,
      descr: describe,
      fileUrl: saveAudioUrl,
      showTime: "",
      source: 1,
      audioDuration: saveAudioDuration,
    };
    onClickSchedule(data);
  };

  const clickStartingNow = () => {
    const currentTime = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");

    if (!value) {
      return;
    }
    if (!saveAudioUrl) {
      Toaster.error("Please upload an audio");
      return;
    }
    const data: creatAudioType = {
      title: value,
      descr: describe,
      fileUrl: saveAudioUrl,
      showTime: localToUtc(currentTime),
      source: 1,
      audioDuration: saveAudioDuration,
    };

    audioCreate(data).then((res) => {
      console.log(res);
      setShowPopup(false);
      setSelectedPrice(0);
      setDescribe("");
      setValue("");
      Toaster.success("Upload voice note successfully");
      if (isProfileView) {
        onSuccess();
      } else {
        setTimeout(() => {
          router.push("/profile?type=" + "AudioDem");
        }, 1000);
      }
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
              if (val.length > 100) {
                setShowError(true);
                return;
              } else {
                setShowError(false);
              }
              setValue(val);
            }}
            boxShadow={showError}
            rightNode={true}
            width={364}
            height={50}
            placeholder="What do you want to talk about?"
          ></Search>
        </div>
        {showError && (
          <div className="mt-[12px] flex items-center w-full h-[32px] border-solid border-[2px] border-[#0D0D0D] bg-[#FFC6C6] rounded-[8px] px-[10px]">
            <Image
              className="mr-[2px]"
              src={errorIcon}
              alt=""
              width={16}
              height={16}
            ></Image>
            <span className="font-bold mr-[2px]">Error:</span> Only 100
            characters can be entered
          </div>
        )}
      </div>

      <div className="mt-[32px]">
        <div className="text-[14px]">Audio Description</div>
        <div className="mt-[4px]">
          <TextArea
            showCount
            value={describe}
            onChange={(e) => {
              setDescribe(e.target.value);
            }}
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
            <DragUpload
              setAudioDuration={(val) => {
                setSaveAudioDuration(val);
              }}
              setUrltoParent={setSaveAudioUrl}
            ></DragUpload>
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
            onClickScheduleFunc();
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
          text={"Post now"}
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

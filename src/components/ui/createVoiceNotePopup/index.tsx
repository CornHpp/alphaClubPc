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
import { formatDate } from "@/lib/util";
import Toaster from "@/components/custom/Toast";
import { useRouter } from "next/navigation";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onSuccess: () => void;
}

const ChooseVoiceNotePopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>();
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const [value, setValue] = React.useState("");

  const router = useRouter();

  const onClickConfirm = () => {
    const currentTime = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
    console.log("currentTime", currentTime);
    if (value && formData) {
      audioUpload(formData).then((res) => {
        console.log("res", res);
        const params = {
          title: value,
          fileUrl: res.result,
          source: 0,
          showTime: currentTime,
          audioDuration: audioDuration,
        };
        audioCreate(params)
          .then((res) => {
            console.log("res", res);
            setShowPopup(false);
            setValue("");
            setFormData(undefined);
            Toaster.success("Create voice note successfully");
            setTimeout(() => {
              router.push("/profile");
            }, 1000);
          })
          .catch((err) => {
            setFormData(undefined);
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
        toFatherAudioFile={(formData, audioDuration) => {
          setFormData(formData);
          setAudioDuration(audioDuration);
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

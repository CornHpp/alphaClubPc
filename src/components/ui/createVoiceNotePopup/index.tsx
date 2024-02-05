import React, { useMemo, useState } from "react";
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
import { creatSelfInfroAudio } from "@/api/model/userService";
import errorIcon from "@/assets/home/errorIcon.svg";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onSuccess: () => void;
  isIntroSelf?: boolean;
  isProfile?: boolean;
}

const ChooseVoiceNotePopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onSuccess,
  isIntroSelf = false,
  isProfile = false,
}) => {
  const [formData, setFormData] = useState<FormData>();
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const [value, setValue] = React.useState("");

  const [showError, setShowError] = useState(false);

  const router = useRouter();

  const onClickConfirm = () => {
    console.log("value", isIntroSelf);
    if (isIntroSelf) {
      introSelf();
    } else {
      shortRecording();
    }
  };

  const shortRecording = async () => {
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
            if (isProfile) {
              onSuccess();
            } else {
              setTimeout(() => {
                router.push("/profile");
              }, 1000);
            }
          })
          .catch((err) => {
            setFormData(undefined);
          });
      });
    }
  };

  const introSelf = async () => {
    const currentTime = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
    console.log("currentTime", currentTime);
    audioUpload(formData).then((res) => {
      console.log("res", res);
      const params = {
        selfIntr: res.result,
        selfIntrFlag: true,
      };
      creatSelfInfroAudio(params)
        .then((res) => {
          console.log("res", res);
          setShowPopup(false);
          setValue("");
          setFormData(undefined);
          Toaster.success("Voice Intro Recording successfully");
          onSuccess();
        })
        .catch((err) => {
          setFormData(undefined);
        });
    });
  };
  const buttonDisabled = useMemo(() => {
    if (isIntroSelf) {
      return formData; // Return true if formData is falsy
    } else {
      return value && formData; // Return true if either value or formData is falsy
    }
  }, [isIntroSelf, value, formData]);

  // const buttonDisabled = () =>
  //   useMemo(() => {
  //     if (isIntroSelf) {
  //       return formData;
  //     } else {
  //       return value && formData;
  //     }
  //   }, [value, formData]);

  return (
    <PopupView
      width={400}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setFormData(undefined);
        setValue("");
      }}
      titleText={isIntroSelf ? "Voice Intro Recording" : "Short Recording"}
    >
      {isIntroSelf ? (
        <div>
          Introduce yourself with confidence, and let the world listen!{" "}
        </div>
      ) : (
        <div className="">
          <div className="font-bold text-[14px]">Recording Title</div>
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
            width={368}
            boxShadow={showError}
            height={54}
            placeholder="2024-01-16 short recording"
            rightNode={<></>}
          ></Search>

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
      )}

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
          color={buttonDisabled ? "#fff" : "#949694"}
          normalBackGround={buttonDisabled ? "#0D0D0D" : "#E9E9E9"}
          borderRadius="27px"
          border="none"
          buttonClick={onClickConfirm}
        ></Button>
      </div>
    </PopupView>
  );
};

export default ChooseVoiceNotePopup;

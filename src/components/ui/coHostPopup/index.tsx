import React from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onClickSelectCoHost: () => void;
  onClickSchedule: () => void;
}

const AcceptCoHostPopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickSelectCoHost,
  onClickSchedule,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  return (
    <PopupView
      width={396}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setSelectedPrice(0);
      }}
      titleText="Accept To Be Co-host"
    >
      <div className="font-medium ">
        Are you going to become co-host of the event{" "}
        <span className="font-bold">[Bull is back, wen lambo? ]</span>?
      </div>
      <div className="mt-[16px] flex items-center">
        <Button
          active={false}
          width="178px"
          height={hideButtonBg ? "54px" : "52px"}
          text={"NO"}
          background="#fff"
          borderRadius="24px"
          border="2px solid #0D0D0D"
          hideBottomBackground={hideButtonBg}
          onMouseEnter={() => {
            setHideButtonBg(true);
          }}
          buttonClick={() => {}}
          onMouseLeave={() => {
            setHideButtonBg(false);
          }}
        ></Button>
        <div className="ml-[8px]">
          <Button
            active={false}
            width="180px"
            height="54px"
            text={"YES"}
            background="#0D0D0D"
            borderRadius="24px"
            border="2px solid #0D0D0D"
            normalBackGround="#0D0D0D"
            color="#fff"
            buttonClick={() => {}}
          ></Button>
        </div>
      </div>
    </PopupView>
  );
};

export default AcceptCoHostPopup;

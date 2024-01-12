import React from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import plusIcon from "@/assets/popup/plus.svg";
import Switch from "@/components/custom/switch";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onClickSelectCoHost: () => void;
  onClickSchedule: () => void;
}

const SettingPopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickSelectCoHost,
  onClickSchedule,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  return (
    <PopupView
      width={355}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setSelectedPrice(0);
      }}
      titleText="Setting"
    >
      <div className="text-[14px] font-medium">
        Thresholds For Joining The Club
      </div>

      <div className="mt-[4px] flex items-center">
        <Switch></Switch>
        <div className="ml-[12px]">
          <Search
            width={247}
            height={32}
            placeholder="min 0.001"
            rightNode={<div className="text-[16px] font-medium">Key</div>}
          ></Search>
        </div>
      </div>
      <div className="mt-[24px]">
        <Button
          hideBottomBackground={true}
          active={false}
          width="327px"
          height="54px"
          text={"Save"}
          color={"#fff"}
          normalBackGround={"#0D0D0D"}
          borderRadius="27px"
          border="none"
          buttonClick={() => {
            console.log("click");
            setShowPopup(false);
          }}
        ></Button>
      </div>
    </PopupView>
  );
};

export default SettingPopup;

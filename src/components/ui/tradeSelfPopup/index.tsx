import React, { useEffect } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import { useParams } from "next/navigation";
import { getUserInfoByTwitterId } from "@/api/model/userService";
import { useSelector } from "react-redux";
import { sendEth } from "@/api/model/userService";
import Toast from "@/components/custom/Toast";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  buySelfcard: () => void;
  sellSelfcard: () => void;
}

const TradeSelfPopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  buySelfcard,
  sellSelfcard,
}) => {
  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  return (
    <PopupView
      width={396}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
      }}
      titleText="Trade My Cards"
    >
      <div className="w-full flex flex-col items-center">
        <div className="text-[14px] font-medium text-center">
          How do you want to trade your cards?
        </div>

        <div className="mt-[16px] flex items-center">
          <Button
            active={false}
            width="178px"
            height={hideButtonBg ? "54px" : "52px"}
            text={"Sell"}
            background="#fff"
            borderRadius="24px"
            border="2px solid #0D0D0D"
            hideBottomBackground={hideButtonBg}
            onMouseEnter={() => {
              setHideButtonBg(true);
            }}
            buttonClick={() => {
              sellSelfcard();
            }}
            onMouseLeave={() => {
              setHideButtonBg(false);
            }}
          ></Button>
          <div className="ml-[8px]">
            <Button
              active={false}
              width="180px"
              height="54px"
              text={"Buy"}
              background="#0D0D0D"
              borderRadius="24px"
              border="2px solid #0D0D0D"
              normalBackGround="#0D0D0D"
              color="#fff"
              buttonClick={() => {
                buySelfcard();
              }}
            ></Button>
          </div>
        </div>
      </div>
    </PopupView>
  );
};

export default TradeSelfPopup;

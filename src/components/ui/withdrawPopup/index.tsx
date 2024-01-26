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

const WithdrawPopup: React.FC<Props> = ({
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
      titleText="Withdraw ETH"
    >
      <div className="w-full flex flex-col items-center">
        <div className="text-[14px] font-medium text-center">
          You need some ETH in your wallet to get started
        </div>

        <div className="mt-[12px] flex items-center">
          <Search
            width={364}
            height={50}
            placeholder="min 0.001"
            rightNode={<></>}
          ></Search>
        </div>
        <div className="mt-[12px] flex items-center">
          <Search
            width={364}
            height={50}
            placeholder="min 0.001"
            rightNode={
              <div
                className="text-[16px] font-medium
            rounded-[20px]
            bg-[#0D0D0D]
            text-[#fff]
            w-[65px]
              h-[40px]
              flex items-center justify-center
              mr-[-5px]
            "
              >
                Max
              </div>
            }
          ></Search>
        </div>

        <div className="mt-[16px]">
          Balance: <span className="font-semibold">$3138(0.074 eTH)</span>
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
              text={"buy"}
              background="#0D0D0D"
              borderRadius="24px"
              border="2px solid #0D0D0D"
              normalBackGround="#0D0D0D"
              color="#fff"
              buttonClick={() => {}}
            ></Button>
          </div>
        </div>
      </div>
    </PopupView>
  );
};

export default WithdrawPopup;
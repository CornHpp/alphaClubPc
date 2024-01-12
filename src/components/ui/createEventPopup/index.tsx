import React from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import plusIcon from "@/assets/popup/plus.svg";
import Switch from "@/components/custom/switch";
interface Props {
  // Define your component props here
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
  onClickSelectCoHost: () => void;
  onClickSchedule: () => void;
}

const CreateEventPopupView: React.FC<Props> = ({
  setShowPopupBuy,
  showPopupBuy,
  onClickSelectCoHost,
  onClickSchedule,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  return (
    <PopupView
      width={400}
      showPopup={showPopupBuy}
      handleCancel={() => {
        setShowPopupBuy(false);
        setSelectedPrice(0);
      }}
      titleText="Create Your Event"
    >
      <div className="">
        <div className="font-medium text-[14px]">Room Price</div>

        <div className="mt-[12px]">
          <Search
            rightNode={true}
            width={364}
            height={50}
            placeholder="min 0.001"
          ></Search>
        </div>
      </div>

      <div className="my-[16px] w-full text-[14px] font-medium">
        <div className="w-full flex justify-between">
          <div>Co Host</div>
          <div>0/10</div>
        </div>
        <div className="mt-[4px]">
          <div className="w-[44px] h-[44px] rounded-[50%] bg-[#00FC6E] items-center justify-center flex border-[2px] border-[#0D0D0D] border-solid">
            <Image
              className=" cursor-pointer"
              src={plusIcon}
              alt=""
              width={24}
              height={24}
              onClick={() => {
                onClickSelectCoHost();
              }}
            ></Image>
          </div>
        </div>
      </div>

      <div className="my-[32px]">
        <div className="font-medium text-[14px]">Record Event</div>
        <div className="mt-[4px]">
          <Switch></Switch>
        </div>
      </div>

      <div className="flex items-center mt-[32px] w-full justify-between h-[54px]">
        <Button
          active={false}
          width="174px"
          height={hideButtonBg ? "54px" : "52px"}
          text={"Schedule"}
          background="#fff"
          borderRadius="26px"
          border="2px solid #0D0D0D"
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
        ></Button>
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
          buttonClick={() => {
            console.log("click");
          }}
        ></Button>
      </div>
    </PopupView>
  );
};

export default CreateEventPopupView;

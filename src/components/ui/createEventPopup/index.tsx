import React from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import plusIcon from "@/assets/popup/plus.svg";
import Switch from "@/components/custom/switch";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import trashIcon from "@/assets/popup/trashIcon.svg";
import PersonHeadImg from "./personHeadImg";
import dateIcon from "@/assets/popup/date.svg";
import arrowRight from "@/assets/popup/arrowRight.svg";
import redDelete from "@/assets/popup/redDelete.svg";

interface Props {
  // Define your component props here
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
  onClickSelectCoHost: () => void;
  onClickSchedule: () => void;
  isEdit?: boolean;
}

const CreateEventPopupView: React.FC<Props> = ({
  setShowPopupBuy,
  showPopupBuy,
  onClickSelectCoHost,
  onClickSchedule,
  isEdit = false,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [selectedCoHost, setSelectedCoHost] = React.useState([
    {
      isShowDelete: false,
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

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

      <div className="my-[16px] mt-[32px] w-full text-[14px] font-medium">
        <div className="w-full flex justify-between">
          <div>Co Host</div>
          <div>0/10</div>
        </div>
        <div className="mt-[4px] flex flex-wrap">
          <div className="w-[44px] h-[44px] flex-shrink-0 rounded-[50%] bg-[#00FC6E] mr-[8px] mb-[16px] items-center justify-center flex border-[2px] border-[#0D0D0D] border-solid">
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
          {selectedCoHost.map((item, index) => {
            return (
              <PersonHeadImg
                onClickDelete={() => {
                  setSelectedCoHost((prev) => {
                    const newSelectedCoHost = [...prev];
                    newSelectedCoHost.splice(index, 1);
                    return newSelectedCoHost;
                  });
                }}
              ></PersonHeadImg>
            );
          })}
        </div>
      </div>

      <div className="my-[32px]">
        <div className="font-medium text-[14px]">Record Event</div>
        <div className="mt-[4px]">
          <Switch></Switch>
        </div>
      </div>

      {isEdit && (
        <div className="mt-[16px]">
          <div className="text-[14px] font-medium">Event Time</div>
          <div className="mt-[4px] flex border-[2px] border-[#0D0D0D] border-solid w-[364px] h-[50px] items-center rounded-[27px] px-[14px] justify-between">
            <div className="flex">
              <Image
                src={dateIcon}
                alt=""
                width={16}
                height={15}
                className="mr-[4px]"
              ></Image>
              <div className="font-medium">2024/01/23 6:00 AM </div>
            </div>
            <Image src={arrowRight} alt="" width={16} height={16}></Image>
          </div>
        </div>
      )}

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
          buttonClick={() => {
            console.log("click");
          }}
        ></Button>
      </div>
    </PopupView>
  );
};

export default CreateEventPopupView;

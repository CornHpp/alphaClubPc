import React, { useState } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import plusIcon from "@/assets/popup/plus.svg";
import BackIcon from "@/assets/popup/back.svg";
import { Switch } from "antd";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import rightIcon from "@/assets/popup/right.svg";
import searchPopupIcon from "@/assets/popup/searchPopupIcon.svg";
import "./index.css";
import PersonHeadImg from "../createEventPopup/personHeadImg";
interface Props {
  // Define your component props here
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
  onClickBack: () => void;
}

const ChooseSpeakerPopup: React.FC<Props> = ({
  setShowPopupBuy,
  showPopupBuy,
  onClickBack,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  const [value, setValue] = React.useState("");

  const [searchPeopleList, setSearchPeopleList] = React.useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  const [selectedPersons, setSelectedPerson] = useState<number[]>([1]);

  return (
    <PopupView
      width={400}
      showPopup={showPopupBuy}
      handleCancel={() => {
        setShowPopupBuy(false);
        setSelectedPrice(0);
      }}
      titleText={
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            onClickBack();
          }}
        >
          <Image
            src={BackIcon}
            alt=""
            width={20}
            height={20}
            className="mr-[6px]"
          ></Image>
          Choose Speaker
        </div>
      }
    >
      <div className="mb-[16px]">
        <Search
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
          rightNode={true}
          paddingLeft={"38px"}
          leftNode={
            <>
              <Image
                className="ml-[9px] w-[20px] h-[20px]"
                src={searchPopupIcon}
                alt=""
                width={20}
                height={20}
              ></Image>
            </>
          }
          width={364}
          height={50}
          placeholder="Search Users"
        ></Search>
      </div>
      <div className="text-[14px] font-medium">Twitter related users</div>

      <div className="h-[224px] w-[396px] overflow-y-scroll ml-[-16px] relative openScroll">
        {searchPeopleList.map((item, index) => {
          const isSelectIndex = selectedPersons.indexOf(index);
          return (
            <div
              key={index + "1"}
              className="w-[397px] flex justify-between  pl-[16px] pr-[18px] items-center h-[56px] cursor-pointer hover:bg-[#F3F3F3]"
              style={{
                background: isSelectIndex != -1 ? "#D8FCD1" : "",
              }}
              onClick={() => {
                if (isSelectIndex != -1) {
                  selectedPersons.splice(isSelectIndex, 1);
                  setSelectedPerson([...selectedPersons]);
                  return;
                }
                setSelectedPerson([...selectedPersons, index]);
              }}
            >
              <div className="flex items-center">
                <Image
                  src={defaultHeaderIcon}
                  alt=""
                  className="w-[32px] h-[32px]"
                  width={32}
                  height={32}
                ></Image>
                <div className="text-[16px] font-medium  ml-[4px]">Gooy</div>
              </div>
              {isSelectIndex != -1 && (
                <Image
                  src={rightIcon}
                  width={20}
                  height={20}
                  alt=""
                  className="w-[20px] h-[20px]"
                ></Image>
              )}
            </div>
          );
        })}
      </div>

      <div className="my-[16px]">
        <div className="text-[14px] font-medium w-full flex items-center justify-between">
          <div>Selected Users</div>
          <div>3/10</div>
        </div>

        <div className="mt-[4px] flex items-center w-full flex-wrap">
          {selectedPersons.map((item, index) => {
            return (
              <div key={index + "a"} className="mt-[8px]">
                <PersonHeadImg
                  onClickDelete={() => {
                    setSelectedPerson((prev) => {
                      const newSelectedCoHost = [...prev];
                      newSelectedCoHost.splice(index, 1);
                      return newSelectedCoHost;
                    });
                  }}
                ></PersonHeadImg>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-[24px]">
        <Button
          hideBottomBackground={true}
          active={false}
          width="368px"
          height="50px"
          text={"Confirm"}
          color={selectedPersons.length ? "#fff" : "#949694"}
          normalBackGround={selectedPersons.length ? "#0D0D0D" : "#E9E9E9"}
          borderRadius="27px"
          border="none"
          buttonClick={() => {
            console.log("click");
          }}
        ></Button>
      </div>
    </PopupView>
  );
};

export default ChooseSpeakerPopup;

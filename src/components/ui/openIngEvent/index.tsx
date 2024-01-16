import React from "react";
import arrowDownIcon from "@/assets/home/arrowDownIcon.svg";
import leaveIcon from "@/assets/home/leaveIcon.svg";
import Image from "next/image";
import { SmallButton } from "../Carousel";
import audioIcon from "@/assets/home/audio.svg";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import personAdd from "@/assets/home/personAdd.svg";
import emoIcon from "@/assets/home/emoIcon.svg";
import voiceLightIcon from "@/assets/home/voiceLightIcon.svg";
import musicIcon from "@/assets/home/musicIcon.svg";
import voiceStopIcon from "@/assets/home/voiceStopIcon.svg";
import Button from "@/components/custom/button";

interface OpenIngEventProps {
  // Add props here
  showOpenIngEvent: boolean;
  onClickEvent: () => void;
}

const OpenIngEvent: React.FC<OpenIngEventProps> = (props) => {
  const { showOpenIngEvent, onClickEvent } = props;
  const [showPeople, setShowPeople] = React.useState(false);

  const [isCanSpeak, setIsCanSpeak] = React.useState(false);
  const [coHostList, setCoHostList] = React.useState([
    {
      name: "username",
    },
    {
      name: "username",
    },
    {
      name: "username",
    },
    {
      name: "username",
    },
    {
      name: "username",
    },
  ]);

  return (
    <>
      {showOpenIngEvent && (
        <div className="flex flex-col fixed right-[39px] bottom-[110px] w-[400px]  bg-[#fff] rounded-[16px] border-[2px] border-solid border-[#0D0D0D] mt-[-2px]">
          <div className="h-[58px] border-b-[2px] border-solid border-[#0D0D0D] flex px-[14px] items-center justify-between">
            <Image
              src={arrowDownIcon}
              alt=""
              width={20}
              height={20}
              style={{
                transform: showPeople ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
              onClick={() => {
                console.log("leave");
                setShowPeople(!showPeople);
              }}
            ></Image>
            <div className="flex items-center">
              <Image
                src={leaveIcon}
                className="mr-[4px]"
                alt=""
                width={16}
                height={16}
              ></Image>
              End Event
            </div>
          </div>
          <div
            style={{
              height: showPeople ? "564px" : 0,
              transition: "height 0.3s",
              overflow: showPeople ? "auto" : "hidden",
            }}
          >
            <div className="flex items-center px-[14px] pt-[14px] pb-[8px] relative">
              <div className="absolute top-[16px] left-[18px]">
                <SmallButton text="LIVE" background="#00FC6E">
                  <Image
                    src={audioIcon}
                    alt=""
                    width={13.5}
                    height={10}
                    className="w-[13.5px] h-[10px] mr-[3px]"
                  ></Image>
                </SmallButton>
              </div>

              <div className="text-[20px] ml-[4px] mt-[-3px] indent-[60px] leading-[24px]">
                Space To Come In And Make Friends.
              </div>
            </div>
            <div className="mt-[8px] w-full ">
              <div className="flex flex-wrap">
                {coHostList.map((item, index) => {
                  return (
                    <div className="w-[25%] flex flex-col justify-center items-center h-[122px]">
                      <Image
                        src={defaultHeaderIcon}
                        alt=""
                        width={56}
                        height={56}
                      ></Image>
                      <div className="mt-[2px] font-semibold">Dekid</div>
                      <div className="text-[11px] mt-[2px] border-[1px] px-[8px] py-[1px] border-[#0D0D0D] border-solid rounded-[10px] bg-[#B4FFB3]">
                        Host
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className="h-[80px] border-t-[2px] border-solid border-[#0D0D0D] flex px-[14px] items-center justify-between relative"
            style={{
              height: showPeople ? "80px" : "100px",
              borderTop: showPeople ? "2px solid #0D0D0D" : "none",
              transition: "all 0.3s",
            }}
          >
            {showPeople && (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div
                    className="flex items-center w-[82px] h-[36px] border-[2px] border-solid border-[#0D0D0D] rounded-[18px] justify-center"
                    onClick={() => {
                      onClickEvent();
                    }}
                  >
                    <Image
                      className="mr-[2px]"
                      src={personAdd}
                      alt=""
                      width={16}
                      height={16}
                    ></Image>
                    Invite
                  </div>
                  <div className="ml-[8px] flex items-center w-[82px] h-[36px] border-[2px] border-solid border-[#0D0D0D] rounded-[18px] justify-center">
                    <Image
                      className="mr-[2px]"
                      src={emoIcon}
                      alt=""
                      width={16}
                      height={16}
                    ></Image>
                    Emoji
                  </div>
                </div>
                <div className="ml-[8px] flex items-center w-[91px] h-[48px] border-[2px] border-solid border-[#0D0D0D] cursor-pointer rounded-[24px] justify-center hover:bg-[#E9E9E9]">
                  <Image
                    className="mr-[2px]"
                    src={isCanSpeak ? voiceLightIcon : voiceStopIcon}
                    alt=""
                    width={24}
                    height={24}
                  ></Image>
                  Mic
                </div>

                {/* <div className="">
                  <Button
                    hideBottomBackground={true}
                    active={false}
                    width="133px"
                    height="48px"
                    text={"Request"}
                    color={"#0D0D0D"}
                    normalBackGround={"#fff"}
                    borderRadius="24px"
                    border="2px solid #0D0D0D"
                    buttonClick={() => {
                      console.log("click");
                    }}
                  ></Button>
                </div> */}

                <div className="absolute left-[20px] bottom-[2px] flex items-center text-[11px]">
                  <div className="w-[6px] h-[6px] rounded-[50%] bg-[#00FC6E] mr-[2px]"></div>
                  1237 online
                </div>
              </div>
            )}

            {!showPeople && (
              <div>
                <div className="flex items-center">
                  <Image
                    src={defaultHeaderIcon}
                    alt=""
                    width={40}
                    height={40}
                  ></Image>
                  <div className="ml-[5px] ">
                    <div className="font-semibold">Dekid</div>
                    <div className="text-[11px] mt-[2px] border-[1px] h-[16px] w-[58px] flex items-center justify-center border-[#0D0D0D] border-solid rounded-[10px] bg-[#B4FFB3]">
                      <Image
                        src={musicIcon}
                        alt=""
                        width={14}
                        height={10}
                        className="mr-[4px]"
                      ></Image>
                      Host
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-[14px] mt-[9px]">
                  <div className="w-[6px] h-[6px] rounded-[50%] bg-[#00FC6E] mr-[2px]"></div>
                  1237 online{" "}
                  <span className=" inline-block w-[3px] h-[3px] rounded-[50%] bg-[#0D0D0D] mx-[4px]"></span>{" "}
                  <span className=" inline-block ">
                    space to come in and make friend...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OpenIngEvent;

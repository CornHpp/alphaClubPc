"use client";
import React from "react";
import Image from "next/image";
import twitterIcon from "@/assets/home/twitterIcon.svg";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import signalIcon from "@/assets/home/signalIcon.svg";
import playIconWhite from "@/assets/home/playIconWhite.svg";
import morePointsIcon from "@/assets/home/morePointsIcon.svg";
import microphoneIcon from "@/assets/home/microphoneIcon.svg";
import deleteIcon from "@/assets/home/deleteIcon.svg";
import playingIcon from "@/assets/home/playingIcon.svg";
export interface userInfoType {
  username?: string;
  avatar?: string;
  followers?: number;
  twitterScreenName?: string;
}

interface UserHeaderProps {
  userInfo?: userInfoType;
  nameMarginLeft?: string;
  headerWidth?: number;
  titleSize?: string;
  twitterScreenName?: string;
  showAudioTrumper?: boolean;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  userInfo,
  nameMarginLeft,
  headerWidth = 44,
  titleSize = "20px",
}) => {
  const [headerHover, setHeaderHover] = React.useState(false);
  const [showAudioTrumper, setShowAudioTrumper] = React.useState(true);
  const [showPlayingIcon, setShowPlayingIcon] = React.useState(false);
  const [showDelteButton, setShowDelteButton] = React.useState(false);
  return (
    <div className="flex items-center">
      <div
        className=" relative"
        onMouseLeave={() => {
          if (showPlayingIcon || showDelteButton) return;
          setHeaderHover(false);
          setShowAudioTrumper(true);
        }}
      >
        <Image
          src={userInfo?.avatar || defaultHeaderIcon}
          alt=""
          style={{
            width: headerWidth + "px",
            height: headerWidth + "px",
          }}
          width={headerWidth}
          height={headerWidth}
          className="rounded-full border-[2px] border-solid border-[#0d0d0d] relative z-[100]"
          onMouseOver={() => {
            setHeaderHover(true);
            setShowAudioTrumper(false);
          }}
        ></Image>

        {headerHover && (
          <div
            className=" absolute left-0 top-0 rounded-full z-[101] flex items-center justify-center"
            style={{
              background: "rgba(13, 13, 13, 0.60)",
              width: headerWidth + "px",
              height: headerWidth + "px",
            }}
            onClick={() => {
              setShowPlayingIcon(!showPlayingIcon);
            }}
          >
            {showPlayingIcon ? (
              <Image
                src={playingIcon}
                className="w-[12px] h-[12px]"
                alt=""
                width={12}
                height={12}
              ></Image>
            ) : (
              <Image
                src={playIconWhite}
                className="w-[12px] h-[12px]"
                alt=""
                width={12}
                height={12}
              ></Image>
            )}
          </div>
        )}

        <div
          className=" absolute left-[-4px] top-[-4px] bg-[#fff] rounded-full z-[99]"
          style={{
            width: headerWidth + 8 + "px",
            height: headerWidth + 8 + "px",
            borderRadius: "50%",
            border: "none",
            backgroundImage:
              "linear-gradient(#fff, #fff),linear-gradient(to bottom right, rgba(158, 255, 99, 1),rgba(255, 255, 89, 1),rgba(0, 252, 110, 1))",
            padding: "4px",
            backgroundClip: "content-box,padding-box",
            textAlign: "center",
          }}
        ></div>
        <div className=" w-[20px] h-[20px]  rounded-full flex items-center justify-center absolute bottom-[-4px] right-[-4px] z-[102]">
          {showAudioTrumper ? (
            <Image
              src={signalIcon}
              className="w-[20px] h-[20px]"
              alt=""
              width={20}
              height={20}
            ></Image>
          ) : (
            <Image
              src={morePointsIcon}
              className="w-[20px] h-[20px]"
              alt=""
              width={20}
              height={20}
              onClick={() => {
                setShowDelteButton(!showDelteButton);
              }}
            ></Image>
          )}
        </div>

        {showDelteButton && (
          <div className="w-[145px] h-[154px] border-solid border-[#0D0D0D] border-[2px] rounded-[12px] bg-[#fff] absolute top-[50px] left-[30px]">
            <div className="h-[48px] w-full border-solid border-[#0D0D0D] border-b-[2px] flex items-center justify-center font-semibold text-[16px]">
              Edit Voice Intro
            </div>
            <div className="p-[10px] text-[16px]">
              <div className="w-[full] h-[40px] rounded-[8px]  flex items-center  text-[#0D0D0D] font-semibold hover:bg-[#00FC6E] pl-[8px]">
                <Image
                  src={microphoneIcon}
                  alt=""
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px] mr-[4px]"
                ></Image>
                New Intro
              </div>
              <div className="mt-[4px] w-full hover:bg-[#00FC6E] h-[40px] rounded-[8px]  flex items-center  text-[#0D0D0D] font-semibold pl-[8px]">
                <Image
                  src={deleteIcon}
                  alt=""
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px] mr-[4px]"
                ></Image>
                Delete
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className="ml-[6px]"
        style={{
          marginLeft: nameMarginLeft ? nameMarginLeft : "6px",
        }}
      >
        <div
          className=" font-semibold text-[20px]"
          style={{
            fontSize: titleSize,
          }}
        >
          {userInfo?.username} Club
        </div>
        <div className="flex items-center text-[12px] text-[#404140]">
          <Image
            src={twitterIcon}
            className="w-[16px] h-[16px]"
            alt=""
            width={16}
            height={16}
          ></Image>
          <div className="ml-[2px] ">
            @{userInfo?.twitterScreenName} • {userInfo?.followers} followers
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;

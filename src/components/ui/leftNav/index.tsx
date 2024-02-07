"use client";

import React, { use, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/home/logo.svg";
import Button from "@/components/custom/button";
import smallHouse from "@/assets/home/smallHouse.svg";
import key from "@/assets/home/key.svg";
import leftIcon from "@/assets/cards/leftIcon.svg";
import airdropIcon from "@/assets/home/airdropIcon.svg";
import leftBg from "@/assets/home/leftBG.svg";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import twitterIcon from "@/assets/home/twitterIcon.svg";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import closeHover from "@/assets/popup/closeHover.svg";
import showOpenTreasure from "@/assets/home/showOpenTreasure.svg";
import closeIcon from "@/assets/popup/close.svg";
import Loading from "@/components/custom/Loading";

interface LeftNavProps {
  // Add any props you need for your component here
}

const buttonLists = [
  {
    img: smallHouse,
    text: "Clubs",
    router: "/home",
  },
  {
    img: leftIcon,
    text: "Cards",
    router: "/cards",
  },
  {
    img: airdropIcon,
    text: "Airdrop",
    router: "/airdrop",
  },
];

const LeftNav: React.FC<LeftNavProps> = () => {
  const [buttonActive, setButtonActive] = React.useState(0);
  const [showLoading, setShowLoading] = React.useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const { userinfo } = useSelector((state: any) => state.user);

  const [hoverCloseImage, setHoverCloseImage] = React.useState(true);

  const [showTreasureTip, setShowTreasureTip] = React.useState(false);

  useEffect(() => {
    const closeTreasureTip = localStorage.getItem("closeTreasureTip");
    console.log(closeTreasureTip);
    if (closeTreasureTip === "false") {
      setShowTreasureTip(false);
    } else {
      setShowTreasureTip(true);
    }
  }, []);

  useEffect(() => {
    const index = buttonLists.findIndex((item) => {
      return item.router === pathName;
    });
    setButtonActive(index);
    setShowLoading(false);
  }, [pathName]);

  const closeTreasureTip = () => {
    localStorage.setItem("closeTreasureTip", "false");
    setShowTreasureTip(false);
  };
  return (
    <div
      className=" mt-[16px]  relative"
      style={{
        height: "calc(100vh - 32px)",
      }}
    >
      <Image
        src={leftBg}
        alt=""
        priority={true}
        className="w-[244px] h-[76px] absolute top-[-1px] left-[-2px] z-[110]"
        width={244}
        height={76}
        style={{
          left: "0px",
          top: "0",
        }}
      ></Image>

      <Image
        src={logo}
        alt=""
        width={180}
        height={64}
        className="w-[180px] h-[64px]  absolute left-[22px] top-[22px] z-[120] cursor-pointer"
        onClick={() => {
          router.push("/home");
        }}
      ></Image>

      <div className="absolute top-0 right-0 w-[120px] h-[76px] bg-[#fbf5f2]"></div>

      <div
        className="h-full flex flex-col pb-[16px]
        pl-[24px]
        border-[2px] border-[#0D0D0D] border-solid 
        pt-[98px]
        z-[120]
        "
        style={{
          height: "calc(100vh - 32px)",
          width: "244px",
          borderTop: "none",
          borderRight: "none",
          borderRadius: "16px 0 0 16px",
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #F0EBE8 0%, #ECECEC 100%)",
        }}
      >
        <div className="flex-1 border-[2px] border-[#0D0D0D] border-solid w-[180px]  rounded-[12px] flex flex-col items-center py-[24px] bg-[white]">
          <div className="flex-1">
            {buttonLists.map((item, index) => {
              return (
                <div key={index + "11"} className="mb-[24px]">
                  <Button
                    active={buttonActive === index ? true : false}
                    width="146px"
                    fontSize="20px"
                    height="58px"
                    text={item.text}
                    background="linear-gradient(180deg, #DFDFDF 0%, #F5F5F5 100%)"
                    borderRadius="16px"
                    border="2px solid #0D0D0D"
                    buttonClick={() => {
                      setButtonActive(index);
                      if (pathName === item.router) {
                        return;
                      }
                      router.push(item.router);
                      setShowLoading(true);
                    }}
                  >
                    <Image
                      src={item.img}
                      alt=""
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px]"
                    ></Image>
                  </Button>
                </div>
              );
            })}
          </div>

          {showTreasureTip && (
            <div className="mb-[24px] relative">
              <Image
                src={showOpenTreasure}
                onClick={() => {
                  router.push("/airdrop");
                  if (pathName === "/airdrop") {
                    return;
                  }
                  setShowLoading(true);
                }}
                alt=""
                width={148}
                height={201}
                className="cursor-pointer"
              ></Image>

              <div className=" absolute top-[-32px] right-0">
                {hoverCloseImage ? (
                  <Image
                    src={closeHover}
                    alt=""
                    width={22}
                    height={22}
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      setHoverCloseImage(true);
                    }}
                    onClick={closeTreasureTip}
                    onMouseLeave={() => {
                      setHoverCloseImage(false);
                    }}
                  ></Image>
                ) : (
                  <Image
                    src={closeIcon}
                    alt=""
                    width={22}
                    height={22}
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      setHoverCloseImage(true);
                    }}
                    onMouseLeave={() => {
                      setHoverCloseImage(false);
                    }}
                  ></Image>
                )}
              </div>
            </div>
          )}

          <div
            className="h-[56px] flex items-center cursor-pointer"
            onClick={() => {
              router.push("/profile");
              if (pathName === "/profile") {
                return;
              }
              setShowLoading(true);
            }}
          >
            <Image
              src={userinfo?.imageUrl || defaultHeaderIcon}
              alt=""
              width={56}
              className="w-[56px] h-[56px] rounded-full border-solid border-[#0D0D0D] border-[2px]"
              height={56}
            ></Image>
            <div className="ml-[8px]">
              <div className="text-[20px] font-bold overflow-hidden text-ellipsis whitespace-nowrap  w-[70px]  h-[30px]">
                {userinfo?.twitterName}
              </div>
              <div className="flex items-center text-[12px] text-[#404140]">
                <Image
                  src={twitterIcon}
                  className="w-[16px] h-[16px]"
                  alt=""
                  width={16}
                  height={16}
                ></Image>
                <div className="ml-[2px] font-medium overflow-hidden text-ellipsis whitespace-nowrap  w-[70px]">
                  @{userinfo?.twitterScreenName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoading && <Loading />}
    </div>
  );
};

export default LeftNav;

import React from "react";
import Image from "next/image";
import twitterIcon from "@/assets/home/twitterIcon.svg";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";

export interface userInfoType {
  username?: string;
  avatar?: string;
  followers?: number;
  twitterScreenName?: string;
}

const userInfoDefault = {
  username: "username",
  avatar: defaultHeaderIcon,
  twitterScreenName: "twitterScreenName",
  followers: 100,
};
interface UserHeaderProps {
  userInfo?: userInfoType;
  nameMarginLeft?: string;
  headerWidth?: number;
  titleSize?: string;
  twitterScreenName?: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  userInfo = userInfoDefault,
  nameMarginLeft,
  headerWidth = 44,
  titleSize = "20px",
}) => {
  return (
    <div className="flex items-center">
      <Image
        src={userInfo?.avatar}
        alt=""
        style={{
          width: headerWidth + "px",
          height: headerWidth + "px",
        }}
        width={headerWidth}
        height={headerWidth}
        className="rounded-full border-[2px] border-solid border-[#0d0d0d]"
      ></Image>
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
          {userInfo?.username}&apos; Club
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

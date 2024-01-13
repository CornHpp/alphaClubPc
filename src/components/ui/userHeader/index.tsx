import React from "react";
import Image from "next/image";
import twitterIcon from "@/assets/home/twitterIcon.svg";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";

export interface userInfoType {
  username: string;
  avatar: string;
  followers: number;
}

const userInfo = {
  username: "username",
  avatar: defaultHeaderIcon,
  followers: 100,
};
interface UserHeaderProps {
  userInfo1?: userInfoType;
  nameMarginLeft?: string;
  headerWidth?: number;
  titleSize?: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  userInfo1,
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
            @{userInfo?.username} • {userInfo?.followers} followers
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;

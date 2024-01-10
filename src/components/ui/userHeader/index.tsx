import React from "react"
import Image from "next/image"
import twitterIcon from "@/assets/home/twitterIcon.svg"
export interface userInfoType {
  username: string
  avatar: string
  followers: number
}

interface UserHeaderProps {
  userInfo: userInfoType
}

const UserHeader: React.FC<UserHeaderProps> = ({ userInfo }) => {
  return (
    <div className="flex items-center">
      <Image
        src={userInfo?.avatar}
        alt=""
        className="w-[44px] h-[44px]"
        width={44}
        height={44}
      ></Image>
      <div className="ml-[6px]">
        <div className=" font-semibold text-[20px]">
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
  )
}

export default UserHeader

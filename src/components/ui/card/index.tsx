import React from "react"
import UserHeader from "@/components/ui/userHeader"
import { userInfoType } from "@/components/ui/userHeader"
type CardType = {
  userInfo: userInfoType
}

interface CardProps {
  item: CardType
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="rounded-[16px] border-[2px] border-[#0D0D0D] border-solid w-[355px] h-[355px] mr-[24px] mb-[24px]">
      <div
        className="h-[80px] flex items-center pl-[16px]"
        style={{
          borderBottom: "2px solid #0D0D0D",
        }}
      >
        <UserHeader userInfo={item?.userInfo}></UserHeader>
      </div>
    </div>
  )
}

export default Card

import React from "react"
import Image from "next/image"
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg"

interface DanmuButtonProps {
  text?: string
  onClick?: () => void
}
const userInfo = {
  username: "username",
  avatar: defaultHeaderIcon,
  followers: 100,
}

const DanmuButton: React.FC<DanmuButtonProps> = ({ text, onClick }) => {
  return (
    <div
      className="flex items-center h-[32px] pl-[4px] pr-[12px] rounded-[18px] border-[1px] border-solid border-[#0D0D0D] 
      bg-[#C0FFD2]
     flex-shrink-0
     min-w-min
 
      "
      style={{
        flexBasis: "auto",
        flexGrow: 0,
      }}
    >
      <Image
        src={userInfo.avatar}
        alt=""
        width={26}
        height={26}
        className="w-[26px] h-[26px]"
      ></Image>
      <div className="ml-[4px] leading-[14px] flex-shrink-0">
        <div className="font-medium text-[11px] text-[#004D22]">
          Kent Sold <span className="text-[#0D0D0D]">0.01</span> Key
        </div>
        <div className="text-[14px] font-semibold text-[#005A0E]">0.42ETH</div>
      </div>
    </div>
  )
}

export default DanmuButton

import React from "react";
import Image from "next/image";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import clockIcon from "@/assets/cards/clockIcon.svg";

interface DanmuButtonProps {
  text?: string;
  onClick?: () => void;
}
const userInfo = {
  username: "username",
  avatar: defaultHeaderIcon,
  followers: 100,
};

interface DanmuButtonProps {
  item?: PartialGetTradeListType;
  onClick?: () => void;
}

const DanmuButtonCards: React.FC<DanmuButtonProps> = (props) => {
  const { item } = props;
  return (
    <div
      className="flex items-center h-[40px] pl-[4px] pr-[12px] rounded-[22px] border-[1px] border-solid border-[#0D0D0D] 
      bg-[#C0FFD2]
     flex-shrink-0
     min-w-min
    w-[223px]
      "
      style={{
        flexBasis: "auto",
        flexGrow: 0,
      }}
    >
      <Image
        src={item?.imageUrl || userInfo.avatar}
        alt=""
        width={32}
        height={32}
        className="w-[32px] h-[32px] rounded-full border-[1px] border-solid border-[#0D0D0D]"
      ></Image>
      <div className="ml-[4px] leading-[14px] flex-shrink-0">
        <div className="font-medium text-[12px] text-[#004D22] flex items-center">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap  max-w-[70px] inline-block h-[14px] mr-[3px]">
            {item?.twitterName}{" "}
          </span>
          {item?.tradeType == 1 ? "bought" : "sold"}{" "}
          <span className="text-[#0D0D0D] ml-[3px] mr-[3px]">{item?.keys}</span>{" "}
          Card
        </div>
        <div className="text-[16px] font-semibold text-[#005A0E] flex items-center mt-[3px]">
          {item?.priceStr?.toString().slice(0, 6)}ETH
          {/* <div className="text-[12px] flex items-center ml-[12px] font-medium">
            <Image src={clockIcon} alt="" width={12} height={12}></Image>
            <span className="ml-[2px]">32 mins ago</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DanmuButtonCards;

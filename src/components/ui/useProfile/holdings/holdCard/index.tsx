import UserHeader from "@/components/ui/userHeader";
import Image from "next/image";
import React from "react";
import keyIcon from "@/assets/home/key.svg";
import ethIcon from "@/assets/profile/ethIcon.svg";
import Button from "@/components/custom/button";
interface HoldCardProps {}

const HoldCard: React.FC<HoldCardProps> = () => {
  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  return (
    <div className="border-[#0D0D0D] border-solid border-[2px] rounded-[10px] p-[10px]">
      <UserHeader></UserHeader>

      <div className="flex items-center mt-[12px]">
        <div className="">
          <div className="flex text-[14px] font-medium text-[#404140]">
            Keys
          </div>
          <div className="font-semibold text-[18px] flex items-center">
            <Image
              src={keyIcon}
              width={18}
              height={18}
              alt=""
              className="mr-[2px]"
            ></Image>
            242
          </div>
        </div>
        <div className="mx-[16px] w-[2px] h-[12px] rounded-[1px] bg-[#0D0D0D]"></div>
        <div className="">
          <div className="flex text-[14px] font-medium text-[#404140]">
            Card Price
          </div>
          <div className="font-semibold text-[18px] flex items-center">
            <Image
              src={ethIcon}
              width={18}
              height={18}
              alt=""
              className="mr-[2px] w-[18px] h-[18px]"
            ></Image>
            7.22 ETH ($3138)
          </div>
        </div>
      </div>

      <div className="flex items-center  w-full justify-between h-[36px]  mt-[12px]">
        <Button
          active={false}
          width="140px"
          height={hideButtonBg ? "36px" : "34px"}
          text={"Sell"}
          background="#fff"
          borderRadius="24px"
          border="2px solid #0D0D0D"
          hideBottomBackground={hideButtonBg}
          onMouseEnter={() => {
            setHideButtonBg(true);
          }}
          buttonClick={() => {
            // onClickSell()
          }}
          onMouseLeave={() => {
            setHideButtonBg(false);
          }}
        ></Button>
        <Button
          active={false}
          width="140px"
          height="36px"
          text={"buy"}
          background="#0D0D0D"
          borderRadius="24px"
          border="2px solid #0D0D0D"
          normalBackGround="#0D0D0D"
          color="#fff"
          buttonClick={() => {
            // onClickBuy()
          }}
        ></Button>
      </div>
    </div>
  );
};

export default HoldCard;

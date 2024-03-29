import React from "react";
import UserHeader from "@/components/ui/userHeader";
import Image from "next/image";
import handLoveSign from "@/assets/home/handLoveSign.svg";
import ethereum from "@/assets/home/ethereum.svg";
import Button from "@/components/custom/button";
import Carousel from "@/components/ui/Carousel";
import rightArrow from "@/assets/home/rightArrow.svg";
import { useRouter } from "next/navigation";
import EventPopup from "../eventPopup";
import nothingIcon from "@/assets/home/nothingIcon.svg";
import OpenIngEvent from "../openIngEvent";
import { formatBalanceNumber } from "@/lib/util/index";
import Loading from "@/components/custom/Loading";

interface CardProps {
  item: PartialGetAllHomeType;
  onClickBuy: (price: string, holderId: string) => void;
  onClickSell: (price: string, holderId: string) => void;
  onOpeningEvent: () => void;
}

const Card: React.FC<CardProps> = ({
  item,
  onClickBuy,
  onClickSell,
  onOpeningEvent,
}) => {
  const [hideButtonBg, setHideButtonBg] = React.useState(false);
  const [showEventPopup, setShowEventPopup] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);

  const router = useRouter();

  return (
    <div className="rounded-[16px] border-[2px] border-[#0D0D0D] border-solid w-[359px] h-[391px] mr-[24px] mb-[24px] bg-[#fff]">
      <div
        className="h-[80px] flex items-center pl-[16px] w-full justify-between cursor-pointer"
        style={{
          borderBottom: "2px solid #0D0D0D",
        }}
      >
        <UserHeader
          showPlayingAudioIcon={item.selfIntrFlag}
          userInfo={{
            username: item.twitterName,
            avatar: item.imageUrl,
            twitterScreenName: item.twitterScreenName,
            followers: item.followersCount,
            selfAudioUrl: item.selfIntr,
          }}
        ></UserHeader>
        <Image
          src={rightArrow}
          alt=""
          width={16}
          height={16}
          className="mr-[16px]"
          onClick={() => {
            setShowLoading(true);
            router.push(`/profile/${item.houseId}`);
          }}
        ></Image>
      </div>
      <Carousel
        onOpenEventPopup={() => {
          // setShowEventPopup(true);
        }}
        item={item}
        houseId={item.houseId}
      ></Carousel>

      <div className="mb-[14px] mx-[16px] flex items-center">
        <div className="">
          <div className="text-[14px] text-[#404140] font-medium">Holders</div>
          <div className="flex items-center mt-[6px]">
            <Image
              src={handLoveSign}
              alt=""
              className="w-[24px] h-[24px]"
              width={24}
              height={24}
            ></Image>
            <div className="text-[#0D0D0D] font-semibold ml-[2px] text-[24px]">
              {item.holders}
            </div>
          </div>
        </div>
        <div className="w-[2px] h-[12px] mx-[16px] bg-[#0D0D0D] rounded-[2px]"></div>

        <div className="">
          <div className="text-[14px] text-[#404140] font-medium">
            card price
          </div>
          <div className="flex items-center mt-[6px]">
            <Image
              src={ethereum}
              alt=""
              className="w-[24px] h-[24px]"
              width={24}
              height={24}
            ></Image>
            <div className="text-[#0D0D0D] font-semibold ml-[2px] text-[24px]">
              {formatBalanceNumber(item.priceStr)} ETH
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center px-[16px] w-full justify-between h-[44px]">
        <Button
          active={false}
          width="154px"
          height={hideButtonBg ? "46px" : "44px"}
          text={"Sell"}
          background="#fff"
          borderRadius="24px"
          border="2px solid #0D0D0D"
          hideBottomBackground={hideButtonBg}
          onMouseEnter={() => {
            setHideButtonBg(true);
          }}
          buttonClick={() => {
            console.log(item);
            onClickSell(item.price as string, item.houseId as string);
          }}
          onMouseLeave={() => {
            setHideButtonBg(false);
          }}
        ></Button>
        <Button
          active={false}
          width="154px"
          height="44px"
          text={"Buy"}
          background="#0D0D0D"
          borderRadius="24px"
          border="2px solid #0D0D0D"
          normalBackGround="#0D0D0D"
          color="#fff"
          buttonClick={() => {
            onClickBuy(item.price as string, item.houseId as string);
          }}
        ></Button>
      </div>

      <EventPopup
        onClickConfirm={() => {
          console.log("confirm");
          // onOpeningEvent();
          setShowEventPopup(false);
        }}
        showPopupBuy={showEventPopup}
        setShowPopupBuy={setShowEventPopup}
        onClickBack={() => {
          console.log("back");
        }}
      ></EventPopup>

      {showLoading && <Loading />}
    </div>
  );
};

export default Card;

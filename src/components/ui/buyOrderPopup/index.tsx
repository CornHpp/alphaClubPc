import React from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import redDelete from "@/assets/popup/redDelete.svg";
import { Input } from "antd";
import { audioCreate, audioUpload } from "@/api/model/audio";
import audioIcon from "@/assets/popup/audioIcon.svg";
import ethIcon from "@/assets/popup/ETH.svg";
import { eventPriceBykeysTypeAndKeys } from "../buyPopup";
import { filterString } from "@/lib/util";
import { buyKey } from "@/api/model/home";
interface Props {
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onClickOrderBack: () => void;
  orderMap?: eventPriceBykeysTypeAndKeys;
}

const BuyOrderPopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickOrderBack,
  orderMap,
}) => {
  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  const onClickOrderConfirm = () => {
    const params = {
      houseId: orderMap?.holderId,
      keys: orderMap?.keys,
      buyPrice: orderMap?.orderPrice,
    };

    buyKey(params).then((res) => {
      console.log(res);
      if (res.code == "200") {
        setShowPopup(false);
      }
    });
  };

  return (
    <PopupView
      width={400}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
      }}
      titleText="Order Confirmation "
    >
      <div className="text-[24px] font-semibold">
        <span className="text-[#005A0E]">Buy</span> Gooy {orderMap?.keys} card
      </div>

      <div className="mt-[8px] text-[#404140]">Card Share</div>

      <div className="mt-[4px] flex items-center">
        <Image src={audioIcon} alt="" width={24} height={24}></Image>
        <div className="text-[24px] font-semibold ml-[2px]">
          {orderMap?.keys}
        </div>
      </div>

      <div className="mt-[8px] text-[#404140]">Share Price</div>

      <div className="mt-[4px] flex items-center">
        <Image src={ethIcon} alt="" width={24} height={24}></Image>
        <div className="text-[24px] font-semibold ml-[2px]">
          {orderMap?.orderPrice} ETH
        </div>
      </div>

      <div className="mt-[8px] text-[#404140]">Action</div>

      <div className="mt-[4px] flex items-center w-[55px] h-[24px] rounded-[12px] bg-[#C0FFD2] justify-center text-[#005A0E] font-semibold text-[16px]">
        {orderMap?.action == 1 ? "Buy" : "Sell"}
      </div>

      <div className="mt-[16px] text-[#404140]">From:</div>

      <div className="mt-[4px] flex items-center">
        <div className="text-[24px] font-semibold ml-[2px]">
          {filterString(orderMap?.walletFrom)}
        </div>
      </div>

      <div className="mt-[8px] text-[#404140]">To:</div>

      <div className="mt-[4px] flex items-center">
        <div className="text-[24px] font-semibold ml-[2px]">
          {filterString(orderMap?.walletTo)}
        </div>
      </div>

      <div className="mt-[7px] text-[#949694]">
        5% fee goes to the content creator.
      </div>

      <div className="mt-[16px] bg-[#D8FCD1] text-[#0D0D0D] border-[2px] border-solid border-[#0D0D0D] rounded-[10px] h-[68px] flex flex-col justify-center px-[10px]">
        <div className="font-semibold text-[16px]">
          wallet: <span>{filterString(orderMap?.walletFrom)}</span>
        </div>
        <div className="mt-[4px] text-[#005A0E] text-[16px] font-semibold">
          {orderMap?.walletFromBalance} ETH available
        </div>
      </div>

      <div className="flex items-center mt-[32px] w-full justify-between h-[54px]">
        <Button
          active={false}
          width="174px"
          height={hideButtonBg ? "54px" : "52px"}
          text={"Back"}
          background="#fff"
          borderRadius="26px"
          border="2px solid #0D0D0D"
          color={"#0D0D0D"}
          hideBottomBackground={hideButtonBg}
          onMouseEnter={() => {
            setHideButtonBg(true);
          }}
          buttonClick={() => {
            onClickOrderBack();
          }}
          onMouseLeave={() => {
            setHideButtonBg(false);
          }}
        ></Button>
        <Button
          active={false}
          width="176px"
          height="54px"
          text={"Comfirm"}
          background="#0D0D0D"
          borderRadius="26px"
          border="2px solid #0D0D0D"
          normalBackGround="#0D0D0D"
          color="#fff"
          buttonClick={onClickOrderConfirm}
        ></Button>
      </div>
    </PopupView>
  );
};

export default BuyOrderPopup;

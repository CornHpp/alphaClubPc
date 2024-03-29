import React, { useEffect } from "react";
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
import { buyKey, sellKey } from "@/api/model/home";
import Toast from "@/components/custom/Toast";
import { buySelfcard } from "@/api/model/userService";
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

  const buySelfThreeCardsFunc = () => {
    buySelfcard().then((res) => {
      console.log(res);
      setShowPopup(false);
      Toast.success("Buy Success");
    });
  };

  const onClickOrderConfirm = () => {
    if (orderMap?.action == 1) {
      buyKeyFunc();
    } else if (orderMap?.action == 3) {
      buySelfThreeCardsFunc();
    } else {
      sellKeyFunc();
    }
  };

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const buyKeyFunc = () => {
    const params = {
      houseId: orderMap?.holderId,
      keys: orderMap?.keys,
      buyPrice: orderMap?.orderPrice,
    };

    buyKey(params).then((res) => {
      console.log(res);
      if (res.code == "200") {
        setShowPopup(false);
        Toast.success("Buy Success");
      }
    });
  };

  const sellKeyFunc = () => {
    const params = {
      houseId: orderMap?.holderId,
      keys: orderMap?.keys,
    };

    sellKey(params).then((res) => {
      console.log(res);
      if (res.code == "200") {
        setShowPopup(false);
        Toast.success("Sell Success");
      }
    });
  };

  useEffect(() => {
    if (Number(orderMap?.orderPrice) > Number(orderMap?.walletFromBalance)) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [orderMap?.orderPrice, orderMap?.walletFromBalance]);

  return (
    <PopupView
      width={400}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setButtonDisabled(false);
      }}
      titleText="Order Confirmation"
    >
      <div className="text-[24px] font-semibold">
        <span
          className="text-[#005A0E]"
          style={{
            color:
              orderMap?.action == 1 || orderMap?.action == 3
                ? "#005A0E"
                : "#E42222",
          }}
        >
          {orderMap?.action == 1 || orderMap?.action == 3 ? "Buy" : "Sell"}
        </span>{" "}
        Gooy {orderMap?.keys} card
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
          {orderMap?.orderPrice.slice(0, 10)} ETH
        </div>
      </div>

      <div className="mt-[8px] text-[#404140]">Action</div>

      <div
        style={{
          color:
            orderMap?.action == 1 || orderMap?.action == 3
              ? "#005A0E"
              : "#E42222",
          background:
            orderMap?.action == 1 || orderMap?.action == 3
              ? "#C0FFD2"
              : "#FFC6C6",
        }}
        className="mt-[4px] flex items-center w-[55px] h-[24px] rounded-[12px] bg-[#C0FFD2] justify-center text-[#005A0E] font-semibold text-[16px]"
      >
        {orderMap?.action == 1 || orderMap?.action == 3 ? "Buy" : "Sell"}
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

      <div className="mt-[7px] text-[#949694]">Pay 5% fee to creator.</div>

      <div
        style={{
          background:
            Number(orderMap?.orderPrice || 0) >
            Number(orderMap?.walletFromBalance)
              ? "#FFC6C6"
              : "#D8FCD1",
        }}
        className="mt-[16px] bg-[#D8FCD1] text-[#0D0D0D] border-[2px] border-solid border-[#0D0D0D] rounded-[10px] h-[68px] flex flex-col justify-center px-[10px]"
      >
        <div className="font-semibold text-[16px]">
          wallet: <span>{filterString(orderMap?.walletFrom)}</span>
        </div>
        <div
          className="mt-[4px] text-[#005A0E] text-[16px] font-semibold"
          style={{
            color:
              Number(orderMap?.orderPrice || 0) >
              Number(orderMap?.walletFromBalance)
                ? "#E42222"
                : "#005A0E",
          }}
        >
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
            setButtonDisabled(false);
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
          disabled={buttonDisabled}
          buttonClick={onClickOrderConfirm}
        ></Button>
      </div>
    </PopupView>
  );
};

export default BuyOrderPopup;

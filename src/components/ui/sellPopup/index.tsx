import React, { useCallback } from "react";
import PopupView from "../popup";
import ETHIcon from "@/assets/popup/ETH.svg";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import TimeLine from "@/components/custom/timeLine";
import { formatBalanceNumber } from "@/lib/util";
import { getCurrentEventKeys } from "@/api/model/home";

interface Props {
  // Define your component props here
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
  price: string;
  holderId: string;
}

const SellPopupView: React.FC<Props> = ({
  setShowPopupBuy,
  showPopupBuy,
  price,
  holderId,
}) => {
  const [balance, setBalance] = React.useState<string>("");

  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [value, setValue] = React.useState("");

  const getCurrentEventKeysFunc = useCallback(async () => {
    const res = await getCurrentEventKeys(holderId);
    console.log(res);
    setBalance(res.result ? res.result : "0");
  }, [holderId]);

  React.useEffect(() => {
    if (showPopupBuy) {
      getCurrentEventKeysFunc();
    }
  }, [getCurrentEventKeysFunc, showPopupBuy]);

  return (
    <PopupView
      showPopup={showPopupBuy}
      handleCancel={() => {
        setShowPopupBuy(false);
      }}
    >
      <div className="">
        <div className="font-medium text-[14px]">Card Price</div>
        <div className="flex mt-[4px] font-semibold text-[24px]">
          <Image src={ETHIcon} alt="" width={24} height={24}></Image>
          {formatBalanceNumber(price)}ETH
        </div>

        <div className="mt-[16px]">
          <TimeLine
            onSelectPrice={(val) => {
              setValue(val * Number(balance) + "");
            }}
          ></TimeLine>
        </div>

        <div className="mt-[12px]">
          <Search
            width={323}
            height={54}
            placeholder="Card amount"
            value={value}
            onChange={(val) => {
              console.log(val);
              setValue(val);
            }}
            rightNode={
              <div
                className="text-[16px] font-medium
            rounded-[20px]
            bg-[#0D0D0D]
            text-[#fff]
            w-[65px]
              h-[40px]
              flex items-center justify-center
              mr-[-5px]
            "
                onClick={() => {
                  setValue(balance.toString());
                }}
              >
                Max
              </div>
            }
          ></Search>
        </div>

        <div className="mt-[8px] text-[#404140] text-[16px] w-full text-center">
          My Balance:{" "}
          <span className="font-medium text-[#0D0D0D]">{balance} card</span>
        </div>

        <div className="mt-[24px]">
          <Button
            hideBottomBackground={true}
            active={false}
            width="323px"
            height="50px"
            text={
              <div className="flex flex-col items-center">
                <div className="text-[18px] text-[#949694] leading-[24px]">
                  Sell
                </div>
                {totalPrice ? (
                  <div className="text-[12px] text-[#00FC6E] leading-[16px]">
                    2.51 ETH ($2800.3)
                  </div>
                ) : (
                  <div className={`text-[12px] text-[#949694] leading-[16px]`}>
                    0.00 card
                  </div>
                )}
              </div>
            }
            normalBackGround={totalPrice ? "#0D0D0D" : "#E9E9E9"}
            borderRadius="27px"
            border="none"
            buttonClick={() => {
              console.log("click");
            }}
          ></Button>
        </div>
      </div>
    </PopupView>
  );
};

export default SellPopupView;

import React from "react";
import PopupView from "../popup";
import ETHIcon from "@/assets/popup/ETH.svg";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import TimeLine from "@/components/custom/timeLine";

interface Props {
  // Define your component props here
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
}

const SellPopupView: React.FC<Props> = ({ setShowPopupBuy, showPopupBuy }) => {
  const [balance, setBalance] = React.useState(1.23);

  const [value, setValue] = React.useState("");
  return (
    <PopupView
      showPopup={showPopupBuy}
      handleCancel={() => {
        setShowPopupBuy(false);
      }}
    >
      <div className="">
        <div className="font-medium text-[14px]">Room Price</div>
        <div className="flex mt-[4px] font-semibold text-[24px]">
          <Image src={ETHIcon} alt="" width={24} height={24}></Image>
          0.074ETH
        </div>

        <div className="mt-[16px]">
          <TimeLine
            onSelectPrice={(val) => {
              setValue(val * balance + "");
            }}
          ></TimeLine>
        </div>

        <div className="mt-[12px]">
          <Search
            width={323}
            height={54}
            placeholder="Key Number"
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
          <span className="font-medium text-[#0D0D0D]">{balance} Key</span>
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
                  Buy
                </div>
                {value ? (
                  <div className="text-[12px] text-[#00FC6E] leading-[16px]">
                    2.51 ETH ($2800.3)
                  </div>
                ) : (
                  <div className={`text-[12px] text-[#949694] leading-[16px]`}>
                    0.00 ETH
                  </div>
                )}
              </div>
            }
            normalBackGround={value ? "#0D0D0D" : "#E9E9E9"}
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

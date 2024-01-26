import React from "react";
import PopupView from "../popup";
import ETHIcon from "@/assets/popup/ETH.svg";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import { formatBalanceNumber } from "@/lib/util";

interface Props {
  // Define your component props here
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
}

const BuyPopupView: React.FC<Props> = ({ setShowPopupBuy, showPopupBuy }) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [buttonList, setButtonList] = React.useState([
    {
      price: 0.001,
    },
    {
      price: 0.002,
    },
    {
      price: 0.003,
    },
  ]);

  const [value, setValue] = React.useState("");
  return (
    <PopupView
      showPopup={showPopupBuy}
      handleCancel={() => {
        setShowPopupBuy(false);
        setSelectedPrice(0);
      }}
    >
      <div className="">
        <div className="font-medium text-[14px]">Room Price</div>
        <div className="flex mt-[4px] font-semibold text-[24px]">
          <Image src={ETHIcon} alt="" width={24} height={24}></Image>
          0.074ETH
        </div>
        <div className="mt-[16px]">Price Formula</div>

        {buttonList.map((item, index) => {
          return (
            <div className="mb-[12px] mt-[4px]" key={index + "o"}>
              <Button
                hideBottomBackground={true}
                active={false}
                width="323px"
                height="50px"
                text={formatBalanceNumber(item.price)}
                normalBackGround={selectedPrice === index ? "#00FC6E" : "#fff"}
                borderRadius="27px"
                border="2px solid #0D0D0D"
                buttonClick={() => {
                  if (selectedPrice === index) {
                    setSelectedPrice(-1);
                    setValue("");
                    return;
                  }
                  setSelectedPrice(index);
                  setValue(item.price.toString());
                }}
              ></Button>
            </div>
          );
        })}
        <div className="mt-[12px]">
          <Search
            value={value}
            onChange={(val) => {
              setValue(val);
            }}
            width={323}
            height={50}
            placeholder="min 0.001"
            rightNode={<div className="text-[16px] font-medium">Key</div>}
          ></Search>
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

export default BuyPopupView;

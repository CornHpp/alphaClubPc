import React from "react";
import PopupView from "../popup";
import ETHIcon from "@/assets/popup/ETH.svg";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import { formatBalanceNumber } from "@/lib/util";
import {
  eventPriceBykeysType,
  getCurrentEventPriceByKeyNumber,
} from "@/api/model/home";
import BigNumber from "bignumber.js";
import UserHeader from "../userHeader";
import lodash from "lodash";
import questionIcon from "@/assets/popup/questionIcon.svg";
import { Tooltip } from "antd";

export interface eventPriceBykeysTypeAndKeys extends eventPriceBykeysType {
  keys: string;
  holderId: string;
  action: number; //1:buy 2:sell
}

interface Props {
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
  price: string;
  holderId: string;
  openOrderPopup: (orderMap: any) => void;
  item: PartialGetAllHomeType | undefined;
}

const BuyPopupView: React.FC<Props> = ({
  setShowPopupBuy,
  showPopupBuy,
  price = "0",
  holderId,
  openOrderPopup,
  item,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(-1);

  const [buttonList, setButtonList] = React.useState([
    {
      price: 0.001,
    },
    {
      price: 0.01,
    },
    {
      price: 0.1,
    },
  ]);
  const [getOrderMap, setGetOrderMap] = React.useState<eventPriceBykeysType>();
  let [value, setValue] = React.useState("");
  const [needPayPrice, setNeedPayPrice] = React.useState<string>("");
  const getCurrentEventPriceByKeyNumberFunc = React.useCallback(
    async (val: string) => {
      const res = await getCurrentEventPriceByKeyNumber(holderId, val);
      setGetOrderMap(res.result);
      setNeedPayPrice(res.result.orderPrice);
    },
    [holderId]
  );

  const clickBuy = (price: number, index: number) => {
    if (selectedPrice === index) {
      setSelectedPrice(-1);
      setValue("");
      setNeedPayPrice("");
      return;
    }
    const selectPrice = price.toString();
    getCurrentEventPriceByKeyNumberFunc(selectPrice);
    setSelectedPrice(index);
    setValue(price.toString());
  };
  const clickBuyButton = () => {
    const orderMap = {
      keys: value,
      holderId: holderId,
      action: 1,
      ...getOrderMap,
    };
    openOrderPopup(orderMap);
    reInit();
  };

  const reInit = () => {
    setValue("");
    setNeedPayPrice("");
    setSelectedPrice(-1);
  };

  const debouncedFunction = lodash.debounce((val) => {
    setSelectedPrice(-1);
    buttonList.findIndex((item) => {
      if (val == item.price) {
        setSelectedPrice(buttonList.indexOf(item));
      }
    });
    getCurrentEventPriceByKeyNumberFunc(val);
  }, 500);

  return (
    <PopupView
      showPopup={showPopupBuy}
      handleCancel={() => {
        setShowPopupBuy(false);
        reInit();
      }}
      titleText={
        <div>
          <UserHeader
            userInfo={{
              username: item?.twitterName,
              avatar: item?.imageUrl,
              twitterScreenName: item?.twitterScreenName,
              followers: item?.followersCount,
            }}
          ></UserHeader>
        </div>
      }
    >
      <div className="">
        <div className="font-medium text-[14px]">Card Price</div>
        <div className="flex mt-[4px] font-semibold text-[24px]">
          <Image src={ETHIcon} alt="" width={24} height={24}></Image>
          {formatBalanceNumber(price)}ETH
        </div>
        <div className="mt-[16px] flex">
          Price Formula
          <Tooltip
            placement="top"
            title={"price=supply^2/14285"}
            className=" cursor-pointer"
          >
            <Image
              src={questionIcon}
              alt=""
              width={16}
              height={16}
              className="ml-[2px]"
            ></Image>
          </Tooltip>
        </div>

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
                  clickBuy(item.price, index);
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
              debouncedFunction(val);
            }}
            type="number"
            width={323}
            height={50}
            placeholder="min 0.001"
            rightNode={<div className="text-[16px] font-medium">Card</div>}
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
                <div
                  className="text-[18px] text-[#949694] leading-[24px]"
                  style={{
                    color: needPayPrice ? "#fff" : "#949694",
                  }}
                >
                  Buy
                </div>
                {needPayPrice ? (
                  <div className="text-[12px] text-[#00FC6E] leading-[16px]">
                    {needPayPrice} ETH
                  </div>
                ) : (
                  <div className={`text-[12px] text-[#949694] leading-[16px]`}>
                    0.00 ETH
                  </div>
                )}
              </div>
            }
            normalBackGround={needPayPrice ? "#0D0D0D" : "#E9E9E9"}
            borderRadius="27px"
            border="none"
            buttonClick={() => {
              if (!needPayPrice) {
                return;
              }
              clickBuyButton();
            }}
          ></Button>
        </div>
      </div>
    </PopupView>
  );
};

export default BuyPopupView;

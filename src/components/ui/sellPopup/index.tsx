import React, { useCallback } from "react";
import PopupView from "../popup";
import ETHIcon from "@/assets/popup/ETH.svg";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import TimeLine from "@/components/custom/timeLine";
import { formatBalanceNumber } from "@/lib/util";
import { getCurrentEventKeys, getSellPrice } from "@/api/model/home";
import { eventPriceBykeysTypeAndKeys } from "../buyPopup";
import UserHeader from "../userHeader";

interface Props {
  showPopupBuy: boolean;
  setShowPopupBuy: (showPopupBuy: boolean) => void;
  price: string;
  holderId: string;
  openOrderPopup: (orderMap: any) => void;
  item: PartialGetAllHomeType | undefined;
}

const SellPopupView: React.FC<Props> = ({
  setShowPopupBuy,
  showPopupBuy,
  price,
  holderId,
  openOrderPopup,
  item,
}) => {
  const [balance, setBalance] = React.useState<string>("");

  const [getOrderMap, setGetOrderMap] =
    React.useState<eventPriceBykeysTypeAndKeys>();

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

  const getSellPriceFunc = useCallback(
    async (percent: number) => {
      const val = percent * Number(balance) + "";
      setValue(val);

      const res = await getSellPrice(holderId, val);
      console.log(res);
      const order = {
        keys: val,
        holderId: holderId,
        orderPrice: res.result,
        ...res.result,
      };
      setGetOrderMap(order);
    },
    [balance, holderId]
  );

  const clickSellButton = () => {
    const order = {
      keys: value,
      holderId: holderId,
      orderPrice: getOrderMap?.orderPrice,
      ...getOrderMap,
    };
    openOrderPopup(order);
  };

  return (
    <PopupView
      showPopup={showPopupBuy}
      handleCancel={() => {
        setShowPopupBuy(false);
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

        <div className="mt-[16px]">
          <TimeLine
            onSelectPrice={(val) => {
              getSellPriceFunc(val);
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
                {getOrderMap?.orderPrice != "0" ? (
                  <div className="text-[12px] text-[#00FC6E] leading-[16px]">
                    {getOrderMap?.orderPrice} ETH
                  </div>
                ) : (
                  <div className={`text-[12px] text-[#949694] leading-[16px]`}>
                    0.00 card
                  </div>
                )}
              </div>
            }
            normalBackGround={
              getOrderMap?.orderPrice != "0" ? "#0D0D0D" : "#E9E9E9"
            }
            borderRadius="27px"
            border="none"
            buttonClick={() => {
              // if (getOrderMap?.orderPrice == "0") {
              //   return;
              // }
              clickSellButton();
            }}
          ></Button>
        </div>
      </div>
    </PopupView>
  );
};

export default SellPopupView;

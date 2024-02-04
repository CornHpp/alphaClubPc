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
import useDebounce from "@/hooks/useDebounce";

interface Props {
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  price: string;
  holderId: string;
  openOrderPopup: (orderMap: any) => void;
  item: PartialGetAllHomeType | undefined;
}

const SellPopupView: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  price,
  holderId,
  openOrderPopup,
  item,
}) => {
  const [balance, setBalance] = React.useState<string>("");

  const [getOrderMap, setGetOrderMap] =
    React.useState<eventPriceBykeysTypeAndKeys>();

  const [value, setValue] = React.useState("");

  const timeLineRef = React.useRef<any>(null);

  const getCurrentEventKeysFunc = useCallback(async () => {
    const res = await getCurrentEventKeys(holderId);
    console.log(res);
    setBalance(res.result ? res.result : "0");
  }, [holderId]);

  React.useEffect(() => {
    if (showPopup) {
      getCurrentEventKeysFunc();
    }
  }, [getCurrentEventKeysFunc, showPopup]);

  const getSellPriceFunc = useCallback(
    async (percent: number | string, isInput?: boolean) => {
      let val;

      if (!isInput) {
        val = Number(percent) * Number(balance) + "";
        setValue(val);
      } else {
        if (Number(percent) > Number(balance)) {
          return;
        }
        val = Number(percent);
      }

      if (!val) {
        setGetOrderMap(undefined);
        timeLineRef.current?.fatherSetCurrentStep(0);
        return;
      }

      const percentValue = Number(val) / Number(balance);
      timeLineRef.current?.fatherSetCurrentStep(percentValue * 4);
      const res = await getSellPrice(holderId, val as string);
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

  const debouncedFunction = useDebounce(getSellPriceFunc, 700);

  const clickSellButton = () => {
    const order = {
      keys: value,
      holderId: holderId,
      orderPrice: getOrderMap?.orderPrice,
      ...getOrderMap,
    };
    setValue("");
    setGetOrderMap(undefined);
    openOrderPopup(order);
  };

  return (
    <PopupView
      showPopup={showPopup}
      handleCancel={() => {
        setValue("");
        setGetOrderMap(undefined);
        setShowPopup(false);
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
            onRef={timeLineRef}
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
            type="number"
            value={value}
            onChange={(val) => {
              console.log(val);
              setValue(val);
              debouncedFunction(val, true);
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
                  getSellPriceFunc(1);
                  console.log(timeLineRef.current);

                  if (timeLineRef.current) {
                    timeLineRef.current?.fatherSetCurrentStep(4);
                  }
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
                {getOrderMap?.orderPrice && getOrderMap?.orderPrice != "0" ? (
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
              getOrderMap?.orderPrice && getOrderMap?.orderPrice != "0"
                ? "#0D0D0D"
                : "#E9E9E9"
            }
            borderRadius="27px"
            border="none"
            buttonClick={() => {
              if (
                !getOrderMap?.orderPrice ||
                getOrderMap?.orderPrice == "0" ||
                balance == "0"
              ) {
                return;
              }
              clickSellButton();
            }}
          ></Button>
        </div>
      </div>
    </PopupView>
  );
};

export default SellPopupView;

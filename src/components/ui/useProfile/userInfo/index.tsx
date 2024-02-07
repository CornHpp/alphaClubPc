import React, { useEffect } from "react";
import UserHeader from "@/components/ui/userHeader";
import Image from "next/image";
import danceFloor from "@/assets/profile/danceFloor.svg";
import baseChainIcon from "@/assets/profile/baseChainIcon.svg";
import Button from "@/components/custom/button";
import handLoveSign from "@/assets/home/handLoveSign.svg";
import { useSelector } from "react-redux";
import ethereum from "@/assets/home/ethereum.svg";
import { useParams } from "next/navigation";
import tradeIcon from "@/assets/profile/tradeIcon.svg";
import threeCardTitter from "@/assets/profile/threeCardTitter.svg";
import threeCardDetail from "@/assets/profile/threeCardDetail.svg";
import "./index.css";
import {
  creatSelfInfroAudio,
  getSelfcardMessage,
  getUserInfoByTwitterId,
} from "@/api/model/userService";
import firstThreePurchase from "@/assets/profile/firstThreePurchase.svg";
import {
  filterString,
  formatBalanceNumber,
  formatDaysHoursMinutes,
  parseTimeValue,
} from "@/lib/util";
import tipThreeDays from "@/assets/profile/tipThreeDays.svg";
import closeHover from "@/assets/popup/closeHover.svg";
import showOpenTreasure from "@/assets/home/showOpenTreasure.svg";
import closeIcon from "@/assets/popup/close.svg";
import BuyPopupView, {
  eventPriceBykeysTypeAndKeys,
} from "@/components/ui/buyPopup";
import SellPopipView from "@/components/ui/sellPopup";
import BuyOrderPopup from "../../buyOrderPopup";
import TradeSelfPopup from "../../tradeSelfPopup";
import ChooseVoiceNotePopup from "../../createVoiceNotePopup";
import Toast from "@/components/custom/Toast";
import { useAccount } from "wagmi";
import EventEmitter from "@/lib/emitter";

interface Props {
  onOpenDepositPopup: () => void;
  openTransferPopup: () => void;
  onOpenWithdrawPopup: () => void;
  onOpenExportWalletPopup: () => void;
  setCurrentNameProfile: (val: string) => void;
  setIsHaveIntroAudio: (val: boolean) => void;
}

const UserInfoView: React.FC<Props> = (props) => {
  // Add your component logic here
  const {
    onOpenDepositPopup,
    openTransferPopup,
    onOpenWithdrawPopup,
    onOpenExportWalletPopup,
    setCurrentNameProfile,
    setIsHaveIntroAudio,
  } = props;
  const { userinfo } = useSelector((state: any) => state.user);

  const urlParams = useParams();

  const isSelf = userinfo?.twitterUidStr === urlParams.id || !urlParams.id;

  const [houseId, setHouseId] = React.useState(isSelf ? "" : urlParams.id);

  const [widthDrawHideButtonBg, setWidthDrawHideButtonBg] =
    React.useState(false);

  const [exportWalletHideButtonBg, setExportWalletHideButtonBg] =
    React.useState(false);

  const [useHeaderInforMap, setUseHeaderInforMap] = React.useState({});

  const [currentClickItem, setCurrentClickItem] =
    React.useState<PartialGetAllHomeType>();

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  const [useProfileMap, setUseProfileMap] = React.useState<any>({});

  const [showTipThreeDays, setShowTipThreeDays] = React.useState(false);
  const [hoverCloseImage, setHoverCloseImage] = React.useState(false);

  const [showPopupBuy, setShowPopupBuy] = React.useState(false);

  const [showPopupSell, setShowPopupSell] = React.useState(false);

  const [eventSinglePrice, setEventSinglePrice] = React.useState("");
  const [clickCurrentHolderId, setClickCurrentHolderId] = React.useState("");
  const [showBuyOrderPopup, setShowBuyOrderPopup] = React.useState(false);

  const [showSelfTradePopup, setShowSelfTradePopup] = React.useState(false);

  const [orderMap, setOrderMap] = React.useState<eventPriceBykeysTypeAndKeys>();
  const [isCanBuySelf, setIsCanBuySelf] = React.useState(false);

  const [showCreatVoiceNotePopup, setShowCreatVoiceNotePopup] =
    React.useState(false);

  const [isIntroAudio, setIntroAudio] = React.useState(false);

  const onClickSell = (price: string) => {
    setEventSinglePrice(price);
    console.log(houseId);
    const twitterId = houseId || userinfo.twitterUidStr;
    setClickCurrentHolderId(twitterId);
    setShowPopupSell(true);
  };
  const onClickBuy = (price: string) => {
    setEventSinglePrice(price);
    const twitterId = houseId || userinfo.twitterUidStr;
    console.log("11111111");
    setClickCurrentHolderId(twitterId);
    setShowPopupBuy(true);
  };

  const [timeMap, setTimeMap] = React.useState<any>({});

  const getUserInfoByTwitterIdFunc = async () => {
    const twitterId = houseId || userinfo.twitterUidStr;
    const res = await getUserInfoByTwitterId(twitterId);
    console.log(res);

    // 根据传入的时间格式化时分秒
    const formatime = formatDaysHoursMinutes(res.result.createTime);
    setTimeMap(formatime);

    setCurrentClickItem(res.result);
    if (isSelf) {
      setIsHaveIntroAudio(res.result.selfIntrFlag ? false : true);
    } else {
      setIsHaveIntroAudio(false);
    }
    setIntroAudio(res.result.selfIntrFlag ? true : false);
    setIsCanBuySelf(res.result.selfCardCanBuy);
    setUseHeaderInforMap({
      username: res.result.twitterName,
      avatar: res.result.imageUrl,
      followers: res.result.followersCount,
      twitterScreenName: res.result.twitterScreenName,
      selfAudioUrl: res.result.selfIntr,
    });
    setCurrentClickItem({
      twitterName: res.result.twitterName,
      imageUrl: res.result.imageUrl,
      followersCount: res.result.followersCount,
      twitterScreenName: res.result.twitterScreenName,
    });
    console.log(isSelf);
    setCurrentNameProfile(
      isSelf || !urlParams.id ? "My" : res.result.twitterName
    );
    setUseProfileMap({
      holders: res.result.holders,
      priceStr: res.result.priceStr,
      walletAddress: res.result.walletAddress,
      walletBalance: res.result.walletBalance,
      holdingValues: res.result.holdingValues,
    });
  };

  useEffect(() => {
    getUserInfoByTwitterIdFunc();

    EventEmitter.on("updateUserInfo", () => {
      getUserInfoByTwitterIdFunc();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickBuyThreeCards = () => {
    getSelfcardMessage().then((res) => {
      console.log(res);
      setOrderMap({
        keys: "3",
        action: 3, //1:buy 2:sell
        ...res.result,
      });
      setShowBuyOrderPopup(true);
      setShowTipThreeDays(false);
    });
  };

  const deleteSelfIntroAudio = () => {
    const params = {
      selfIntrFlag: false,
    };
    creatSelfInfroAudio(params).then((res) => {
      console.log(res);
      Toast.success("Delete successfully");
      getUserInfoByTwitterIdFunc();
    });
  };
  const { isConnected } = useAccount();

  const clickOpenDeposit = () => {
    if (isConnected) {
      console.log("openTransferPopup");
      openTransferPopup();
    } else {
      onOpenDepositPopup();
    }
  };

  return (
    <div
      className="border-[2px] min-w-[355px] rounded-[16px]  border-[#0D0D0D] border-solid relative"
      style={{
        background: houseId ? "#fff" : "#D8FCD1",
      }}
    >
      <div
        className="w-full h-[88px] border-[#0D0D0D] border-solid border-b-[2px] items-center flex pl-[14px] justify-between bg-white "
        style={{
          borderRightWidth: "0px",
          borderRadius: "18px 18px 0px 0",
        }}
      >
        <UserHeader
          onClickDeleteIntroAudio={() => {
            console.log("delete");
            deleteSelfIntroAudio();
          }}
          onClickNewIntro={() => {
            setShowCreatVoiceNotePopup(true);
          }}
          isAcceptShowDelteButton={isSelf || !houseId}
          showPlayingAudioIcon={isIntroAudio}
          userInfo={useHeaderInforMap}
          nameMarginLeft={"12px"}
        ></UserHeader>
      </div>

      {houseId && (
        <div className="pt-[12px] px-[14px]  pb-[14px]">
          <div className="flex items-center bg-white  ">
            <div className="">
              <div className="text-[14px] text-[#404140] font-medium">
                Holders
              </div>
              <div className="flex items-center mt-[2px]">
                <Image src={handLoveSign} alt="" width={18} height={18}></Image>
                <div className="text-[#0D0D0D] font-semibold ml-[2px] text-[18px]">
                  {useProfileMap?.holders}
                </div>
              </div>
            </div>
            <div className="w-[2px] h-[12px] mx-[16px] bg-[#0D0D0D] rounded-[2px]"></div>

            <div className="">
              <div className="text-[14px] text-[#404140] font-medium">
                card price
              </div>
              <div className="flex items-center mt-[6px]">
                <Image src={ethereum} alt="" width={18} height={18}></Image>
                <div className="text-[#0D0D0D] font-semibold ml-[2px] text-[18px]">
                  {useProfileMap?.roomPrice?.slice(0, 7)} ETH
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between h-[44px] mt-[16px]">
            <Button
              active={false}
              width="48%"
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
                onClickSell(useProfileMap?.roomPrice);
              }}
              onMouseLeave={() => {
                setHideButtonBg(false);
              }}
            ></Button>
            <Button
              active={false}
              width="48%"
              height="44px"
              text={"buy"}
              background="#0D0D0D"
              borderRadius="24px"
              border="2px solid #0D0D0D"
              normalBackGround="#0D0D0D"
              color="#fff"
              buttonClick={() => {
                onClickBuy(useProfileMap?.roomPrice);
              }}
            ></Button>
          </div>
        </div>
      )}

      {!houseId && (
        <div className="pt-[12px] pl-[14px] flex items-center bg-white w-full">
          <div className="w-[30%]">
            <div className="text-[14px] text-[#404140] font-medium">
              Holders
            </div>
            <div className="flex items-center mt-[2px]">
              <Image src={handLoveSign} alt="" width={18} height={18}></Image>
              <div className="text-[#0D0D0D] font-semibold ml-[2px] text-[18px]">
                {useProfileMap?.holders}
              </div>
            </div>
          </div>
          <div className="w-[2px] h-[12px] mx-[16px] bg-[#0D0D0D] rounded-[2px]"></div>

          <div className="ml-[8px]">
            <div className="text-[14px] text-[#404140] font-medium">
              card price
            </div>
            <div className="flex items-center mt-[6px]">
              <Image src={ethereum} alt="" width={18} height={18}></Image>
              <div className="text-[#0D0D0D] font-semibold ml-[2px] text-[18px]">
                {useProfileMap?.priceStr?.slice(0, 8)} ETH
              </div>
            </div>
          </div>
        </div>
      )}
      {!houseId && (
        <div
          className="absolute right-0 top-[98px] bg-[#0D0D0D] w-[64px] h-[21px] text-[#fff] flex items-center justify-center text-[12px] cursor-pointer"
          style={{
            borderRadius: "10px 0 0 10px",
          }}
          onClick={() => {
            setShowSelfTradePopup(true);
          }}
        >
          <Image
            src={tradeIcon}
            alt=""
            className="mr-[2px]"
            width={12}
            height={12}
          ></Image>
          Trade
        </div>
      )}

      {isSelf && isCanBuySelf && (
        <div
          className=" px-[14px] cursor-pointer relative  h-[58px] bg-[#fff] flex items-center justify-between "
          onClick={() => {
            setShowTipThreeDays(true);
          }}
        >
          <div className="threeCardTip overflow-hidden rounded-[10px] border-[2px] border-solid border-[#0d0d0d] relative">
            <Image
              src={threeCardTitter}
              className="pl-[6px] pt-[4px]"
              alt=""
              width={228}
              height={24}
            ></Image>

            <div className="flex items-center pl-[6px] pt-[2px]">
              <Image
                src={threeCardDetail}
                alt=""
                width={158}
                height={16}
              ></Image>

              <div className=" flex items-center font-semibold mt-[2px] ml-[2px]">
                <div className="mr-[2px]">{timeMap.days} Days</div>
                <div className="mr-[2px]">{timeMap.hours} Hours</div>
                <div className="mr-[2px]">{timeMap.minutes} Mins</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!houseId && (
        <div
          className="w-full px-[16px] py-[12px] border-[#0D0D0D] border-solid border-b-[2px] bg-white"
          style={{
            borderRadius: "0 0px 18px 18px",
          }}
        >
          <div className="flex items-center mb-[16px]">
            <div className="w-[30%]">
              <div className="flex font-medium">
                <Image
                  src={baseChainIcon}
                  className="mr-[3px]"
                  alt=""
                  width={16}
                  height={16}
                ></Image>
                BlastChain
              </div>
              <div className="mt-[3px] font-semibold text-[18px]">
                {filterString(useProfileMap?.walletAddress, 4)}
              </div>
            </div>
            <div className="mx-[16px] w-[2px] h-[12px] rounded-[1px] bg-[#0D0D0D] flex-shrink-0"></div>
            <div className="ml-[8px]">
              <div className="flex font-medium">Balance</div>
              <div className="mt-[3px] font-semibold text-[18px]">
                {formatBalanceNumber(useProfileMap?.walletBalance)} ETH
              </div>
            </div>
          </div>

          <Button
            hideBottomBackground={true}
            active={false}
            width="100%"
            height="48px"
            text={"Deposit"}
            color={"#fff"}
            normalBackGround={"#0D0D0D"}
            borderRadius="27px"
            border="none"
            buttonClick={() => {
              clickOpenDeposit();
            }}
          ></Button>

          <div className="mt-[8px] flex items-center h-[48px] w-full justify-between">
            <Button
              active={false}
              width="48%"
              height={widthDrawHideButtonBg ? "48px" : "46px"}
              text={"Withdraw"}
              background="#fff"
              borderRadius="24px"
              border="2px solid #0D0D0D"
              hideBottomBackground={widthDrawHideButtonBg}
              onMouseEnter={() => {
                setWidthDrawHideButtonBg(true);
              }}
              buttonClick={() => {
                onOpenWithdrawPopup();
              }}
              onMouseLeave={() => {
                setWidthDrawHideButtonBg(false);
              }}
            ></Button>

            <Button
              active={false}
              width="48%"
              height={exportWalletHideButtonBg ? "48px" : "46px"}
              text={"Export wallet"}
              background="#fff"
              borderRadius="24px"
              border="2px solid #0D0D0D"
              hideBottomBackground={exportWalletHideButtonBg}
              onMouseEnter={() => {
                setExportWalletHideButtonBg(true);
              }}
              buttonClick={() => {
                onOpenExportWalletPopup();
              }}
              onMouseLeave={() => {
                setExportWalletHideButtonBg(false);
              }}
            ></Button>
          </div>
        </div>
      )}

      {showTipThreeDays && (
        <div className=" fixed left-0 top-0 z-[1000]  w-[100vw] h-[100vh]">
          <div
            className="absolute w-[100vw] h-[100vh] left-0 top-0 bg-[#0D0D0D99] "
            onClick={() => {
              setShowTipThreeDays(false);
            }}
          ></div>
          <div className=" z-[1001] pb-[24px]  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Image
                src={tipThreeDays}
                className="mr-[3px]"
                alt=""
                width={400}
                height={310}
              ></Image>
              <div className="absolute left-0 bottom-0 w-full h-[203px] p-[14px] ">
                <div className="text-[14px] mb-[20px]">
                  The first <span className="font-bold">three cards</span> you
                  own can only be purchased by yourself at one time. And in can
                  only be sold <span className="font-bold">after 7 days.</span>
                </div>

                <Button
                  hideBottomBackground={true}
                  active={false}
                  width="368px"
                  height="50px"
                  text={"Buy Now"}
                  color={"#fff"}
                  normalBackGround={"#0D0D0D"}
                  borderRadius="27px"
                  border="none"
                  buttonClick={() => {
                    clickBuyThreeCards();
                  }}
                ></Button>

                <div
                  className="mt-[16px] font-semibold text-center cursor-pointer"
                  onClick={() => {
                    setShowTipThreeDays(false);
                  }}
                >
                  Maybe Later
                </div>
              </div>
            </div>

            <div className=" absolute top-[-6px] right-0">
              {hoverCloseImage ? (
                <Image
                  src={closeHover}
                  alt=""
                  width={36}
                  height={36}
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setHoverCloseImage(true);
                  }}
                  onClick={() => {
                    setShowTipThreeDays(false);
                  }}
                  onMouseLeave={() => {
                    setHoverCloseImage(false);
                  }}
                ></Image>
              ) : (
                <Image
                  src={closeIcon}
                  alt=""
                  width={36}
                  height={36}
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setHoverCloseImage(true);
                  }}
                  onMouseLeave={() => {
                    setHoverCloseImage(false);
                  }}
                ></Image>
              )}
            </div>
          </div>
        </div>
      )}

      {!houseId && (
        <div className="px-[16px] py-[16px]">
          <div className="flex items-center font-semibold text-[16px]">
            <div className="font-medium ">Holding Value：</div>
            {userinfo?.holdingValue?.slice(0, 8)} ETH
          </div>
          <div className="flex items-center font-semibold text-[16px]">
            <div className="font-medium ">Fees Earned：</div>{" "}
            {userinfo?.earned?.slice(0, 8)} ETH
          </div>
        </div>
      )}

      <BuyPopupView
        showPopupBuy={showPopupBuy}
        setShowPopupBuy={setShowPopupBuy}
        price={eventSinglePrice}
        holderId={clickCurrentHolderId}
        openOrderPopup={(val) => {
          setOrderMap(val);
          setShowPopupBuy(false);
          setShowBuyOrderPopup(true);
        }}
        item={currentClickItem}
      ></BuyPopupView>

      <SellPopipView
        showPopup={showPopupSell}
        setShowPopup={setShowPopupSell}
        price={eventSinglePrice}
        holderId={clickCurrentHolderId}
        openOrderPopup={(val) => {
          setOrderMap(val);
          setShowPopupSell(false);
          setShowBuyOrderPopup(true);
        }}
        item={currentClickItem}
      ></SellPopipView>

      <BuyOrderPopup
        orderMap={orderMap}
        showPopup={showBuyOrderPopup}
        setShowPopup={setShowBuyOrderPopup}
        onClickOrderBack={() => {
          setShowBuyOrderPopup(false);
          setShowPopupBuy(true);
        }}
      ></BuyOrderPopup>

      <TradeSelfPopup
        showPopup={showSelfTradePopup}
        setShowPopup={setShowSelfTradePopup}
        sellSelfcard={() => {
          setShowSelfTradePopup(false);
          console.log(useProfileMap?.priceStr);
          onClickSell(useProfileMap?.priceStr);
        }}
        buySelfcard={() => {
          setShowSelfTradePopup(false);
          onClickBuy(useProfileMap?.priceStr);
        }}
      ></TradeSelfPopup>

      <ChooseVoiceNotePopup
        showPopup={showCreatVoiceNotePopup}
        setShowPopup={setShowCreatVoiceNotePopup}
        onSuccess={() => {
          console.log("onSuccess");
          setShowCreatVoiceNotePopup(false);
          getUserInfoByTwitterIdFunc();
        }}
        isIntroSelf={true}
      ></ChooseVoiceNotePopup>
    </div>
  );
};

export default UserInfoView;

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
import { getUserInfoByTwitterId } from "@/api/model/userService";
import { filterString, formatBalanceNumber } from "@/lib/util";
interface Props {
  onOpenDepositPopup: () => void;
  onOpenWithdrawPopup: () => void;
  onOpenExportWalletPopup: () => void;
}

const UserInfoView: React.FC<Props> = (props) => {
  const { userinfo } = useSelector((state: any) => state.user);

  const urlParams = useParams();

  const [houseId, setHouseId] = React.useState(urlParams.id || "");

  // Add your component logic here
  const { onOpenDepositPopup, onOpenWithdrawPopup, onOpenExportWalletPopup } =
    props;

  const [widthDrawHideButtonBg, setWidthDrawHideButtonBg] =
    React.useState(false);

  const [exportWalletHideButtonBg, setExportWalletHideButtonBg] =
    React.useState(false);

  const [useHeaderInforMap, setUseHeaderInforMap] = React.useState({});

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  const [useProfileMap, setUseProfileMap] = React.useState<any>({});

  const getUserInfoByTwitterIdFunc = async () => {
    const twitterId = houseId || userinfo.twitterUidStr;
    const res = await getUserInfoByTwitterId(twitterId);
    console.log(res);
    setUseHeaderInforMap({
      username: res.result.twitterName,
      avatar: res.result.imageUrl,
      followers: res.result.followersCount,
      twitterScreenName: res.result.twitterScreenName,
    });
    setUseProfileMap({
      holders: res.result.holders,
      roomPrice: res.result.priceStr,
      walletAddress: res.result.walletAddress,
      walletBalance: res.result.walletBalance,
    });
  };

  useEffect(() => {
    getUserInfoByTwitterIdFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="border-[2px] min-w-[355px] rounded-[16px]  border-[#0D0D0D] border-solid "
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
                room price
              </div>
              <div className="flex items-center mt-[6px]">
                <Image src={ethereum} alt="" width={18} height={18}></Image>
                <div className="text-[#0D0D0D] font-semibold ml-[2px] text-[18px]">
                  {useProfileMap?.roomPrice.slice(0, 6)} ETH
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between h-[44px] mt-[16px]">
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
                // console.log(item);
                // onClickSell(item.price as string, item.houseId as string);
              }}
              onMouseLeave={() => {
                setHideButtonBg(false);
              }}
            ></Button>
            <Button
              active={false}
              width="154px"
              height="44px"
              text={"buy"}
              background="#0D0D0D"
              borderRadius="24px"
              border="2px solid #0D0D0D"
              normalBackGround="#0D0D0D"
              color="#fff"
              buttonClick={() => {
                // onClickBuy(item.price as string, item.houseId as string);
              }}
            ></Button>
          </div>
        </div>
      )}

      {!houseId && (
        <div className="pt-[12px] pl-[14px] flex items-center bg-white">
          <div className=""></div>
          <div className="w-[114px]">
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
              room price
            </div>
            <div className="flex items-center mt-[6px]">
              <Image src={ethereum} alt="" width={18} height={18}></Image>
              <div className="text-[#0D0D0D] font-semibold ml-[2px] text-[18px]">
                {useProfileMap?.priceStr} ETH
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
            <div className="">
              <div className="flex font-medium">
                <Image
                  src={baseChainIcon}
                  className="mr-[3px]"
                  alt=""
                  width={16}
                  height={16}
                ></Image>
                Basechain
              </div>
              <div className="mt-[3px] font-semibold text-[18px]">
                {filterString(useProfileMap?.walletAddress, 4)}
              </div>
            </div>
            <div className="mx-[16px] w-[2px] h-[12px] rounded-[1px] bg-[#0D0D0D] flex-shrink-0"></div>
            <div className="">
              <div className="flex font-medium">Balance</div>
              <div className="mt-[3px] font-semibold text-[18px]">
                {formatBalanceNumber(useProfileMap?.walletBalance)}
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
              onOpenDepositPopup();
            }}
          ></Button>

          <div className="mt-[8px] flex items-center h-[48px] w-full">
            <Button
              active={false}
              width="45%"
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

            <div className="ml-[7px]">
              <Button
                active={false}
                width="154px"
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
        </div>
      )}

      {!houseId && (
        <div className="px-[16px] py-[16px]">
          <div className="flex items-center font-semibold text-[16px]">
            <div className="font-medium w-[129px]">Holding Value：</div> $1138
            (0.501 ETH)
          </div>
          <div className="flex items-center font-semibold text-[16px]">
            <div className="font-medium w-[129px]">Fees Earned：</div> $1138
            (0.501 ETH)
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoView;

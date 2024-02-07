import React, { useEffect } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import { useAccount, useDisconnect, useEnsName } from "wagmi";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useSelector, useDispatch } from "react-redux";
import { copyTextToClipboardSafari, filterString } from "@/lib/util";
import { setWalletAddress } from "@/redux/features/cryptoSlice";
interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  openTransferPopup: () => void;
}

const DepositPopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  openTransferPopup,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);
  const dispatch = useDispatch();
  const { userinfo, balance } = useSelector((state: any) => state.user);

  const [value, setValue] = React.useState(userinfo?.walletAddress);
  const [isShowCurrentView, setIsShowCurrentView] = React.useState(false);
  const { isConnected, address } = useAccount();

  const { open } = useWeb3Modal();

  useEffect(() => {
    if (address) {
      dispatch(setWalletAddress(address));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (isConnected && isShowCurrentView) {
      dispatch(setWalletAddress(address));
      openTransferPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);

  const clickConnectWallet = async () => {
    if (address && isConnected) {
      dispatch(setWalletAddress(address));
      openTransferPopup();
      return;
    }
    setIsShowCurrentView(true);
    await open();
  };

  return (
    <PopupView
      width={396}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setSelectedPrice(0);
      }}
      titleText="Deposit ETH On Blast  (Layer 2)"
    >
      <div className="w-full flex flex-col items-center">
        <div className="text-[14px] font-medium text-center">
          You need some ETH in your wallet to get started
        </div>

        <div className="mt-[8px]">
          <Button
            hideBottomBackground={true}
            active={false}
            width="368px"
            height="54px"
            text={"Connect Your Wallet"}
            color={"#fff"}
            normalBackGround={"#0D0D0D"}
            borderRadius="27px"
            border="none"
            buttonClick={clickConnectWallet}
          ></Button>
        </div>

        <div className="mt-[12px] flex items-center">
          <Search
            value={filterString(userinfo?.walletAddress)}
            onChange={() => {}}
            width={364}
            height={50}
            placeholder="min 0.001"
            leftNode={
              <div>
                <Image
                  className=" rounded-full  border-[2px] border-[#0D0D0D] border-solid"
                  src={userinfo?.imageUrl || defaultHeaderIcon}
                  alt=""
                  width={40}
                  height={40}
                ></Image>
              </div>
            }
            rightNode={
              <div
                onClick={() => {
                  copyTextToClipboardSafari(userinfo?.walletAddress);
                }}
                className="mr-[-5px] ml-[6px] text-[14px]  font-semibold w-[76px] h-[40px] border-[2px] border-[#0D0D0D] cursor-pointer border-solid flex items-center justify-center rounded-[20px]"
              >
                Copy
              </div>
            }
          ></Search>
        </div>

        <div className="mt-[16px] text-[16px]">
          Balance: <span className="font-semibold ">{balance} ETH</span>
        </div>
      </div>
    </PopupView>
  );
};

export default React.memo(DepositPopup);

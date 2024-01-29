import React, { useEffect } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import { useAccount, useDisconnect, useEnsName } from "wagmi";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import { useWeb3Modal, useWeb3ModalTheme } from "@web3modal/wagmi/react";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onClickSelectCoHost: () => void;
  onClickSchedule: () => void;
}

const DepositPopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickSelectCoHost,
  onClickSchedule,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  const [value, setValue] = React.useState("");
  const { isConnected, address } = useAccount();

  // const { setThemeVariables } = useWeb3ModalTheme()

  // useEffect(() => {
  //   setThemeVariables({
  //     "--w3m-z-index": 1001,
  //   })
  // }, [setThemeVariables])

  // const { open } = useWeb3Modal()

  const clickConnectWallet = () => {
    console.log("clickConnectWallet");
    // open()
  };

  return (
    <PopupView
      width={396}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setSelectedPrice(0);
      }}
      titleText="Deposit ETH On Base  (Layer 2)"
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
            value={value}
            onChange={setValue}
            width={364}
            height={50}
            placeholder="min 0.001"
            leftNode={
              <div>
                <Image
                  src={defaultHeaderIcon}
                  alt=""
                  width={40}
                  height={40}
                ></Image>
              </div>
            }
            rightNode={
              <div className="mr-[-5px] ml-[6px] text-[14px]  font-semibold w-[76px] h-[40px] border-[2px] border-[#0D0D0D] cursor-pointer border-solid flex items-center justify-center rounded-[20px]">
                Copy
              </div>
            }
          ></Search>
        </div>

        <div className="mt-[16px] text-[16px]">
          Balance: <span className="font-semibold ">$3138(0.074 eTH)</span>
        </div>
      </div>
    </PopupView>
  );
};

export default DepositPopup;

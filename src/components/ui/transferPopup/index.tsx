import React, { useEffect } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import {
  useAccount,
  useSendTransaction,
  useEnsName,
  useDisconnect,
} from "wagmi";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import { useWeb3Modal, useWeb3ModalTheme } from "@web3modal/wagmi/react";
import Toaster from "@/components/custom/Toast";
import { arbitrum, baseGoerli } from "viem/chains";
import { parseEther } from "viem";
import { useSelector } from "react-redux";

import { filterString } from "@/lib/util";
interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
}

const TransferPopup: React.FC<Props> = ({ setShowPopup, showPopup }) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);
  const { disconnect } = useDisconnect();

  const [hideButtonBg, setHideButtonBg] = React.useState(false);
  const { userinfo } = useSelector((state: any) => state.user);

  const { otherWalletAddress } = useSelector((state: any) => state.crypto);

  const [value, setValue] = React.useState("");
  const { isConnected, address } = useAccount();

  const { open } = useWeb3Modal();

  const chain = process.env.NODE_ENV == "production" ? 168587773 : 168587773;

  console.log("chain", chain);

  const { data, isLoading, isSuccess, sendTransactionAsync, error, isError } =
    useSendTransaction({
      to: userinfo?.walletAddress,
      value: parseEther(value ?? "0.01"),
      chainId: chain,
    });

  const clickTransfer = async () => {
    // 连接钱包进行转账操作
    console.log("clickTransfer", value);
    if (!value) {
      Toaster.error("Please enter the amount to transfer.");
      return;
    }
    const res = await sendTransactionAsync();
    console.log(res);
    Toaster.info("Please go to your wallet to confirm the transaction.");
  };

  const clickDisconnectWallet = () => {
    disconnect();
    setShowPopup(false);
  };

  return (
    <PopupView
      width={396}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setSelectedPrice(0);
      }}
      titleText="deposit ETH on Blast (Layer2）"
    >
      <div className="w-full flex flex-col items-center">
        <div className="text-[14px] font-medium text-left w-full">
          You need some ETH in your wallet to get started
        </div>

        <div className="mt-[20px] w-full">
          <div className="text-[14px]">Connected wallet:</div>
          <div className="flex justify-between items-center">
            <div className="text-[24px] font-semibold">
              {filterString(otherWalletAddress)}
            </div>

            <div>
              <Button
                active={false}
                width="104px"
                fontSize="14px"
                height={hideButtonBg ? "32px" : "30px"}
                text={"Disconnect"}
                background="#fff"
                borderRadius="15px"
                color="#E42222"
                border="2px solid #0D0D0D"
                hideBottomBackground={hideButtonBg}
                onMouseEnter={() => {
                  setHideButtonBg(true);
                }}
                buttonClick={() => {
                  clickDisconnectWallet();
                }}
                onMouseLeave={() => {
                  setHideButtonBg(false);
                }}
              ></Button>
            </div>
          </div>

          <div className="text-[14px] mt-[8px]">To:</div>
          <div className="flex justify-between">
            <div className="text-[24px] font-semibold">
              {filterString(userinfo?.walletAddress)}
            </div>
          </div>
        </div>

        <div className="mt-[24px] flex items-center">
          <Search
            value={value}
            onChange={setValue}
            width={364}
            height={50}
            placeholder="Enter the amount to transfer"
            leftNode={<></>}
            rightNode={<></>}
          ></Search>
        </div>

        <div className="mt-[16px]">
          <Button
            hideBottomBackground={true}
            active={false}
            width="368px"
            height="54px"
            text={"Transfer"}
            color={"#fff"}
            normalBackGround={"#0D0D0D"}
            borderRadius="27px"
            border="none"
            buttonClick={clickTransfer}
          ></Button>
        </div>
      </div>
    </PopupView>
  );
};

export default TransferPopup;

import React from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import warningIcon from "@/assets/popup/warningIcon.svg";
import { useSelector } from "react-redux";
import { exportWallet } from "@/api/model/userService";
import { copyTextToClipboardSafari } from "@/lib/util";
import rightIcon from "@/assets/profile/rightIcon.svg";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onClickSelectCoHost: () => void;
  onClickSchedule: () => void;
}

const ExportWalletPopop: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickSelectCoHost,
  onClickSchedule,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const { userinfo } = useSelector((state: any) => state.user);
  const [address] = React.useState(userinfo?.walletAddress || "");

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  const [isCopied, setIsCopied] = React.useState(false);

  const handleClickCopy = () => {
    if (address) {
      exportWallet().then((res) => {
        copyTextToClipboardSafari(res);
        // setShowPopup(false);
        setIsCopied(true);
      });
    }
  };

  return (
    <PopupView
      width={396}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setSelectedPrice(0);
        setIsCopied(false);
      }}
      titleText="Export Wallet"
    >
      <div className="w-full flex flex-col items-center">
        <div className=" flex items-center">
          <Search
            width={364}
            height={50}
            placeholder="min 0.001"
            value={address}
            leftNode={
              <div>
                <Image
                  src={userinfo?.imageUrl || defaultHeaderIcon}
                  alt=""
                  className="rounded-full border-[2px] border-solid border-[#0D0D0D]"
                  width={40}
                  height={40}
                ></Image>
              </div>
            }
            rightNode={<></>}
            onChange={function (val: string): void {
              throw new Error("Function not implemented.");
            }}
          ></Search>
        </div>
        <div className="mt-[16px] text-[14px] font-medium">
          You can take your account with you to another site using an external
          wallet!
        </div>

        <div className="mt-[12px] flex italic">
          <div className="flex flex-col items-center">
            <div className="w-[60px] h-[24px] bg-[#00FC6E] rounded-[12px] text-[14px] font-bold text-center ">
              step 1.
            </div>
            <div className="w-[2px] h-[44px] bg-[#00FC6E]"></div>
            <div className="w-[60px] h-[24px] bg-[#00FC6E] rounded-[12px] text-[14px] font-bold text-center">
              step 2.
            </div>
          </div>
          <div className="ml-[8px] font-semibold">
            <div>Transfer your account to your wallet of choice</div>
            <div className="mt-[20px]">
              Copy this key into your other wallet
            </div>
          </div>
        </div>

        <div className="mt-[16px] flex items-center h-[52px]">
          <Button
            active={false}
            width="366px"
            height={isCopied ? "52px" : hideButtonBg ? "52px" : "50px"}
            text={isCopied ? "Copied" : "Copy Key"}
            normalBackGround={isCopied ? "#E9E9E9" : "#fff"}
            borderRadius="28px"
            border="2px solid #0D0D0D"
            hideBottomBackground={isCopied ? true : hideButtonBg}
            onMouseEnter={() => {
              setHideButtonBg(true);
            }}
            buttonClick={() => {
              handleClickCopy();
            }}
            onMouseLeave={() => {
              setHideButtonBg(false);
            }}
          >
            {isCopied && (
              <Image src={rightIcon} alt="" width={16} height={16}></Image>
            )}
          </Button>
        </div>

        <div
          className="mt-[8px] border-[1px] border-[#0D0D0D] border-solid rounded-[8px] bg-[#FFE1C6] text-[14px]  flex py-[6px] px-[10px] relative"
          style={{
            textIndent: "18px",
          }}
        >
          <Image
            src={warningIcon}
            alt=""
            width={16}
            height={16}
            className="absolute top-[8px] left-[10px]"
          ></Image>
          WARNING: Never share your private key with anyone! it controls your
          account.
        </div>
      </div>
    </PopupView>
  );
};

export default ExportWalletPopop;

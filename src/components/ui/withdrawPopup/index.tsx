import React, { useEffect } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import { useParams } from "next/navigation";
import { getUserInfoByTwitterId } from "@/api/model/userService";
import { useSelector } from "react-redux";
import { sendEth } from "@/api/model/userService";
import Toast from "@/components/custom/Toast";
import Toaster from "@/components/custom/Toast";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onCloseWithdrawPopup: () => void;
  onClickSchedule: () => void;
}

const WithdrawPopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onCloseWithdrawPopup,
}) => {
  const [hideButtonBg, setHideButtonBg] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [walletBalance, setWalletBalance] = React.useState(0);
  const urlParams = useParams();

  const [houseId, setHouseId] = React.useState(urlParams.id || "");
  const { userinfo } = useSelector((state: any) => state.user);

  const getUserInfoByTwitterIdFunc = async () => {
    const twitterId = houseId || userinfo.twitterUidStr;
    const res = await getUserInfoByTwitterId(twitterId);
    console.log(res);
    setWalletBalance(res.result.walletBalance);
  };
  const [address, setAddress] = React.useState("");

  const [amount, setAmount] = React.useState("");

  const handleTransferClick = () => {
    if (!address) {
      Toaster.error("Please enter the address to transfer.");
      return;
    }
    if (!amount) {
      Toaster.error("Please enter the amount to transfer.");
      return;
    }

    sendEth(address, Number(amount)).then((res) => {
      Toast.success("Transfer success");
      setAmount("");
      setAddress("");
      setShowPopup(false);
    });
  };

  useEffect(() => {
    getUserInfoByTwitterIdFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houseId]);

  return (
    <PopupView
      width={396}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setButtonDisabled(false);
      }}
      titleText="Withdraw ETH"
    >
      <div className="w-full flex flex-col items-center">
        <div className="text-[14px] font-medium text-center">
          You need some ETH in your wallet to get started
        </div>

        <div className="mt-[12px] flex items-center">
          <Search
            width={364}
            height={50}
            placeholder="Enter Address"
            rightNode={<></>}
            value={address}
            onChange={(val) => {
              setAddress(val);
            }}
          ></Search>
        </div>
        <div className="mt-[12px] flex items-center">
          <Search
            width={364}
            height={50}
            value={amount}
            onChange={(val) => {
              setAmount(val);
              console.log(val, walletBalance);
              if (Number(val) > walletBalance) {
                setButtonDisabled(true);
              } else {
                setButtonDisabled(false);
              }
            }}
            placeholder="Enter Amount"
            type="number"
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
                  setAmount(walletBalance.toString());
                }}
              >
                Max
              </div>
            }
          ></Search>
        </div>

        <div className="mt-[16px]">
          Balance: <span className="font-semibold">{walletBalance}ETH</span>
        </div>

        <div className="mt-[16px] flex items-center">
          <Button
            active={false}
            width="178px"
            height={hideButtonBg ? "54px" : "52px"}
            text={"Close"}
            background="#fff"
            borderRadius="24px"
            border="2px solid #0D0D0D"
            hideBottomBackground={hideButtonBg}
            onMouseEnter={() => {
              setHideButtonBg(true);
            }}
            buttonClick={() => {
              onCloseWithdrawPopup();
              setButtonDisabled(false);
            }}
            onMouseLeave={() => {
              setHideButtonBg(false);
            }}
          ></Button>
          <div className="ml-[8px]">
            <Button
              active={false}
              width="180px"
              height="54px"
              text={"Transfer"}
              background="#0D0D0D"
              borderRadius="24px"
              border="2px solid #0D0D0D"
              normalBackGround="#0D0D0D"
              color="#fff"
              disabled={buttonDisabled}
              buttonClick={handleTransferClick}
            ></Button>
          </div>
        </div>
      </div>
    </PopupView>
  );
};

export default WithdrawPopup;

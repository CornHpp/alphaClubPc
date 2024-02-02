"use client";
import React, { useEffect } from "react";
import UserInfoView from "./userInfo";
import CreationvView from "./creation";
import HoldingsView from "./holdings";
import TradeView from "./Trade";
import inviteIcon from "@/assets/profile/inviteIcon.svg";
import setting from "@/assets/profile/setting.svg";
import Image from "next/image";
import InviteCodePopup from "../inviteCodePopup";
import SettingPopup from "../settingPopup";
import DepositPopup from "../depositPopup";
import WithdrawPopup from "../withdrawPopup";
import ExportWalletPopop from "../exportWallPopup";
import AcceptCoHostPopup from "../coHostPopup";
import logoutIcon from "@/assets/profile/logoutIcon.svg";
import LoginPopupView from "../loginPopup";
import { useParams } from "next/navigation";
import shortAudioTip from "@/assets/profile/shortAudioTip.svg";
import TransferPopup from "../transferPopup";
interface Props {
  // Add your props here
}

const UseProfileView: React.FC<Props> = () => {
  // Add your component logic here

  const [showPopupInviteCode, setShowPopupInviteCode] = React.useState(false);
  const [showPopupSetting, setShowPopupSetting] = React.useState(false);
  const [showPopupDeposit, setShowPopupDeposit] = React.useState(false);
  const [showPopupWithdraw, setShowPopupWithdraw] = React.useState(false);
  const [showPopupExportWallet, setShowPopupExportWallet] =
    React.useState(false);

  const [showPopupTransfer, setShowPopupTransfer] = React.useState(false);

  const [showPopupLoginView, setShowPopupLoginView] = React.useState(false);
  const urlParams = useParams();

  const [currentNameProfile, setCurrentNameProfile] = React.useState("");

  return (
    <div className="pt-[24px] overflow-hidden w-full flex-1 flex flex-col relative">
      <div className=" flex w-full justify-between pr-[39px] items-center">
        <div className="text-[32px] font-bold mr-[3px]">
          {currentNameProfile} Profile
        </div>

        {!urlParams.id && (
          <div className="flex items-center font-semibold cursor-pointer">
            <div
              className="text-[16px] flex mr-[24px]"
              onClick={() => {
                setShowPopupInviteCode(true);
              }}
            >
              <Image
                src={inviteIcon}
                alt=""
                width={20}
                height={20}
                className="mr-[2px]"
              ></Image>
              Invite Code
            </div>
            <div
              className="text-[16px] flex"
              onClick={() => {
                setShowPopupSetting(true);
              }}
            >
              <Image
                src={setting}
                alt=""
                width={20}
                height={20}
                className="mr-[2px]"
              ></Image>
              Setting
            </div>
            <div
              className="text-[16px] flex ml-[24px]"
              onClick={() => {
                setShowPopupLoginView(true);
              }}
            >
              <Image
                src={logoutIcon}
                alt=""
                width={20}
                height={20}
                className="mr-[2px]"
              ></Image>
              Logout
            </div>
          </div>
        )}
      </div>
      {/* <div className="mt-[12px] grid w-full pr-[37px] grid-cols-3 gap-[24px]">
        <div className="">
          <UserInfoView></UserInfoView>
          <div className="mt-[24px]">
            <TradeView></TradeView>
          </div>
        </div>
        <CreationvView></CreationvView>
        <HoldingsView></HoldingsView>
      </div> */}
      <Image
        src={shortAudioTip}
        alt=""
        width={120}
        height={84}
        className=" absolute left-[528px] top-[32px]"
      ></Image>

      <div className="mt-[12px] flex w-full pr-[37px] flex-1 pb-[16px] overflow-hidden">
        <div className="mr-[24px]  h-full  flex flex-col flex-1">
          <UserInfoView
            setCurrentNameProfile={(name) => {
              setCurrentNameProfile(name);
            }}
            onOpenExportWalletPopup={() => {
              setShowPopupExportWallet(true);
            }}
            onOpenWithdrawPopup={() => {
              setShowPopupWithdraw(true);
            }}
            onOpenDepositPopup={() => {
              setShowPopupDeposit(true);
            }}
          ></UserInfoView>
          <div className="mt-[24px] flex-1 overflow-hidden flex flex-col">
            <TradeView></TradeView>
          </div>
        </div>
        <div className="mr-[24px]  h-full  flex-1 flex flex-col">
          <CreationvView></CreationvView>
        </div>
        <div className="mr-[24px] flex-1">
          <HoldingsView></HoldingsView>
        </div>
      </div>

      <InviteCodePopup
        showPopup={showPopupInviteCode}
        setShowPopup={setShowPopupInviteCode}
        onClickSelectCoHost={() => {
          console.log("onClickSelectCoHost");
        }}
        onClickSchedule={() => {
          console.log("onClickSchedule");
        }}
      ></InviteCodePopup>

      <SettingPopup
        showPopup={showPopupSetting}
        setShowPopup={setShowPopupSetting}
      ></SettingPopup>

      <DepositPopup
        showPopup={showPopupDeposit}
        setShowPopup={setShowPopupDeposit}
        openTransferPopup={() => {
          setShowPopupTransfer(true);
        }}
      ></DepositPopup>

      <WithdrawPopup
        showPopup={showPopupWithdraw}
        setShowPopup={setShowPopupWithdraw}
        onCloseWithdrawPopup={() => {
          setShowPopupWithdraw(false);
        }}
        onClickSchedule={() => {
          console.log("onClickSchedule");
        }}
      ></WithdrawPopup>
      <ExportWalletPopop
        showPopup={showPopupExportWallet}
        setShowPopup={setShowPopupExportWallet}
        onClickSelectCoHost={() => {
          console.log("onClickSelectCoHost");
        }}
        onClickSchedule={() => {
          console.log("onClickSchedule");
        }}
      ></ExportWalletPopop>

      <LoginPopupView
        showPopup={showPopupLoginView}
        setShowPopup={setShowPopupLoginView}
      ></LoginPopupView>

      <TransferPopup
        showPopup={showPopupTransfer}
        setShowPopup={setShowPopupTransfer}
      ></TransferPopup>
    </div>
  );
};

export default UseProfileView;

import React, { useEffect } from "react";
import PopupView from "../popup";
import Image from "next/image";
import diamondIcon from "@/assets/popup/diamondIcon.svg";
import rightIcon from "@/assets/popup/rightIcon.svg";
import {
  getUserInviteCode,
  inviteCodeResponseType,
} from "@/api/model/userService";
import { copyTextToClipboardSafari } from "@/lib/util/index";
interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  onClickSelectCoHost: () => void;
  onClickSchedule: () => void;
}

const InviteCodePopup: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  onClickSelectCoHost,
  onClickSchedule,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [hideButtonBg, setHideButtonBg] = React.useState(false);
  const [inviteCodeList, setInviteCodeList] = React.useState<
    inviteCodeResponseType[]
  >([]);
  const getUserInviteCodeFunc = async () => {
    const res = await getUserInviteCode();
    setInviteCodeList(res.result);
    console.log(res);
  };

  useEffect(() => {
    getUserInviteCodeFunc();
  }, []);

  return (
    <PopupView
      width={400}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setSelectedPrice(0);
      }}
      titleText="Invite Your Friends"
    >
      <div className="">
        <div className="text-[12px] font-medium">Points</div>
        <div className="mt-[6px] flex items-center">
          <Image
            src={diamondIcon}
            alt=""
            width={24}
            height={24}
            className="mr-[2px]"
          ></Image>
          517
        </div>
      </div>

      <div className="mt-[12px]">
        <div>My Invite Code</div>
        {inviteCodeList.map((item, index) => {
          return (
            <div
              className="mt-[14px] flex items-center w-[full] justify-between"
              key={index + "o"}
            >
              <div className="text-[18px]  font-semibold ">
                {item.inviteCode}
              </div>
              {item.isCopy ? (
                <div className="flex text-[14px] items-center font-semibold bg-[#E9E9E9] w-[95px] h-[30px] justify-center rounded-[15px] cursor-pointer">
                  <Image
                    src={rightIcon}
                    alt=""
                    width={16}
                    height={16}
                    className="mr-[2px]"
                  ></Image>
                  Copied
                </div>
              ) : (
                <div
                  onClick={() => {
                    inviteCodeList[index].isCopy = true;
                    setInviteCodeList([...inviteCodeList]);
                    copyTextToClipboardSafari(item.inviteCode);
                  }}
                  className="ml-[6px] text-[14px]  font-semibold w-[60px] h-[28px] border-[2px] border-[#0D0D0D] cursor-pointer border-solid flex items-center justify-center rounded-[15px]"
                >
                  Copy
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PopupView>
  );
};

export default InviteCodePopup;

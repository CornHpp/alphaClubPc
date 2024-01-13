import React from "react";
import bellIcon from "@/assets/profile/bellIcon.svg";
import messageIcon from "@/assets/profile/messageIcon.svg";
import editIcon from "@/assets/profile/editIcon.svg";
import earphoneIcon from "@/assets/profile/earphoneIcon.svg";
import Image from "next/image";
import Button from "@/components/custom/button";

interface ProfileCardProps {
  currentTab: number;
  onClickEdit?: () => void;
  onClickAccept?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const { currentTab, onClickEdit, onClickAccept } = props;

  const [hideButtonBg, setHideButtonBg] = React.useState(false);
  return (
    <div className="min-w-[323px] border-[#0D0D0D] border-solid border-[2px] p-[10px] rounded-[10px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center font-medium">
          <div className="py-[2px] px-[8px] border-[#0D0D0D] border-solid border-[1px] rounded-[10px] flex items-center ">
            <Image src={bellIcon} alt="" width={12} height={12}></Image>
            <div className="text-[11px] ml-[3px]">Begins at 10:20 am</div>
          </div>

          <div className="ml-[6px] py-[2px] px-[8px] border-[#0D0D0D] bg-[#B4FFB3] border-solid border-[1px] rounded-[10px] flex items-center">
            <Image src={messageIcon} alt="" width={12} height={12}></Image>
            <div className="text-[11px] ml-[3px]">EVENT</div>
          </div>
        </div>
        <Image
          src={editIcon}
          alt=""
          className=" cursor-pointer"
          width={16}
          height={16}
          onClick={() => {
            console.log("click");
            onClickEdit && onClickEdit();
          }}
        ></Image>
      </div>

      <div className="font-semibold text-[18px] mt-[2px]">
        Bull is back, wen lambo?{" "}
      </div>
      <div className="font-medium text-[11px] mt-[2px] flex items-center ">
        <Image src={earphoneIcon} alt="" width={12} height={12}></Image>
        <span className="font-semibold ml-[2px]">32 </span> users are listening
      </div>

      {currentTab === 0 ? (
        <div className="mt-[12px]">
          <Button
            hideBottomBackground={true}
            active={false}
            width="301px"
            height="36px"
            text={"Let's Roll"}
            color={"#fff"}
            normalBackGround={"#0D0D0D"}
            borderRadius="27px"
            border="none"
            buttonClick={() => {
              console.log("click");
            }}
          ></Button>
        </div>
      ) : currentTab === 1 ? (
        <div className="mt-[12px]">
          <Button
            hideBottomBackground={true}
            active={false}
            width="301px"
            height="36px"
            text={"Confirm"}
            color={"#fff"}
            normalBackGround={"#0D0D0D"}
            borderRadius="27px"
            border="none"
            buttonClick={() => {
              console.log("click");
            }}
          ></Button>
        </div>
      ) : (
        <div className="mt-[12px] flex h-[36px]">
          <Button
            active={false}
            width="116px"
            height={hideButtonBg ? "36px" : "34px"}
            text={"No"}
            background="#fff"
            borderRadius="24px"
            border="2px solid #0D0D0D"
            color="#E42222"
            hideBottomBackground={hideButtonBg}
            onMouseEnter={() => {
              setHideButtonBg(true);
            }}
            buttonClick={() => {}}
            onMouseLeave={() => {
              setHideButtonBg(false);
            }}
          ></Button>
          <div className="ml-[8px]">
            <Button
              active={false}
              width="177px"
              height="34px"
              text={"Accept"}
              background="#0D0D0D"
              borderRadius="24px"
              border="2px solid #0D0D0D"
              normalBackGround="#0D0D0D"
              color="#fff"
              buttonClick={() => {
                onClickAccept && onClickAccept();
              }}
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;

import React from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import { useRouter } from "next/navigation";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
  clickDelete: () => void;
}

const DeletePopupView: React.FC<Props> = ({
  setShowPopup,
  showPopup,
  clickDelete,
}) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const router = useRouter();
  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  return (
    <PopupView
      width={396}
      showPopup={showPopup}
      handleCancel={() => {
        setShowPopup(false);
        setSelectedPrice(0);
      }}
      titleText="Logout"
    >
      <div className="w-full flex flex-col items-center">
        <div className="text-[16px] font-medium text-center">
          Are you sure you want to delete?
        </div>

        <div className="mt-[16px] flex items-center">
          <Button
            active={false}
            width="178px"
            height={hideButtonBg ? "54px" : "52px"}
            text={"No"}
            background="#fff"
            borderRadius="27px"
            border="2px solid #0D0D0D"
            hideBottomBackground={hideButtonBg}
            onMouseEnter={() => {
              setHideButtonBg(true);
            }}
            buttonClick={() => {
              setShowPopup(false);
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
              text={"Yes"}
              background="#0D0D0D"
              borderRadius="27px"
              border="2px solid #0D0D0D"
              normalBackGround="#0D0D0D"
              color="#fff"
              buttonClick={clickDelete}
            ></Button>
          </div>
        </div>
      </div>
    </PopupView>
  );
};

export default React.memo(DeletePopupView);

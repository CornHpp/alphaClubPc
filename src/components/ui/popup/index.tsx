import React, { Children } from "react";
import UserHeader from "../userHeader";
import Image from "next/image";
import closeIcon from "@/assets/popup/close.svg";
import closeHover from "@/assets/popup/closeHover.svg";

interface PopupProps {
  handleOk?: () => void;
  handleCancel?: () => void;
  width?: number;
  showPopup?: boolean;
  children?: React.ReactNode;
  titleText?: string | React.ReactNode;
  showCloseImage?: boolean;
}

const PopupView: React.FC<PopupProps> = (props) => {
  const {
    handleOk,
    handleCancel,
    width = 355,
    showPopup,
    children,
    titleText,
    showCloseImage = true,
  } = props;

  const [hoverCloseImage, setHoverCloseImage] = React.useState(false);
  return (
    <>
      {showPopup && (
        <div className=" fixed left-0 top-0 z-[1000]  w-[100vw] h-[100vh]">
          <div
            className="absolute w-[100vw] h-[100vh] left-0 top-0 bg-[#0D0D0D99] "
            onClick={handleCancel}
          ></div>
          <div
            className=" z-[1001] pb-[24px] bg-[#fff] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[16px]
            border-[2px] border-[#0D0D0D] border-solid
            "
            style={{
              width: width + "px",
            }}
          >
            <div
              style={{
                height: titleText ? "67px" : "78px",
              }}
              className="topInfo flex justify-between w-full text-[20px] font-semibold border-b-[2px] border-[#0D0D0D] border-solid px-[14px] items-center"
            >
              {titleText ? titleText : <UserHeader></UserHeader>}

              {showCloseImage ? (
                <>
                  {hoverCloseImage ? (
                    <Image
                      src={closeHover}
                      alt=""
                      width={38}
                      height={37}
                      className="cursor-pointer"
                      onMouseEnter={() => {
                        setHoverCloseImage(true);
                      }}
                      onClick={handleCancel}
                      onMouseLeave={() => {
                        setHoverCloseImage(false);
                      }}
                    ></Image>
                  ) : (
                    <Image
                      src={closeIcon}
                      alt=""
                      width={38}
                      height={37}
                      className="cursor-pointer"
                      onMouseEnter={() => {
                        setHoverCloseImage(true);
                      }}
                      onMouseLeave={() => {
                        setHoverCloseImage(false);
                      }}
                    ></Image>
                  )}
                </>
              ) : (
                <> </>
              )}
            </div>

            <div className="px-[16px] pt-[16px] relative">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupView;

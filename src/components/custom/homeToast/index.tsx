import React, { use, useEffect } from "react";
import Image from "next/image";
import successIcon from "@/assets/popup/successfulIcon.svg";
import warningIcon from "@/assets/popup/warningIcon.svg";
import errorIcon from "@/assets/popup/errorIcon.svg";

interface HomeToastProps {
  message: string;
  showHomeToast: boolean;
  type: "success" | "warning";
  setShowHomeToast: (val: boolean) => void;
}

const HomeToast: React.FC<HomeToastProps> = (props) => {
  const { message, showHomeToast, type, setShowHomeToast } = props;
  const icon =
    type === "success"
      ? successIcon
      : type === "warning"
      ? warningIcon
      : errorIcon;

  useEffect(() => {
    let timer: any;
    if (showHomeToast) {
      timer = setTimeout(() => {
        setShowHomeToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [setShowHomeToast, showHomeToast]);
  return (
    <>
      {showHomeToast && (
        <div className="border-[2px] border-solid border-[#0D0D0D] h-[56px] px-[14px] min-w-[283px] flex items-center bg-[#C0FFD2] rounded-[8px]">
          <Image
            src={icon}
            alt=""
            width={24}
            height={24}
            className="mr-[4px]"
          ></Image>
          <div className="font-bold">{message}</div>
        </div>
      )}
    </>
  );
};

export default HomeToast;

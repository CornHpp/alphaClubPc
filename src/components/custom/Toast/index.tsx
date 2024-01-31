import { toast, Flip, ToastOptions } from "react-toastify";
import Image from "next/image";
import successfulIcon from "@/assets/popup/successfulIcon.svg";
import "./Toast.css";
const options: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Flip,
};

const Toaster = {
  success: (msg: string) => {
    toast.success(msg, {
      className:
        "bg-[#C0FFD2] text-[#0D0D0D] rounded-[8px] text-[16px] font-bold min-w-[283px] min-h-[56px] pb-[] border-[2px] border-solid border-[#0D0D0D] flex justify-center items-center",
      autoClose: 2000,
      hideProgressBar: true,
      icon: (
        <>
          <Image
            src={successfulIcon}
            alt=""
            width={24}
            height={24}
            className="w-[24px] h-[24px] mr-[-10px]"
          ></Image>
        </>
      ),
    });
  },
  error: (msg: string) => {
    console.log("msg", msg);
    toast.error(msg, options);
  },
  warning: (msg: string) => {
    toast.warning(msg, options);
  },
  info: (msg: string, time = 2) => {
    toast.info(msg, {
      position: "top-right",
      autoClose: time * 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });
  },
};

export default Toaster;

"use client";
import React, { useEffect } from "react";
import LeftNav from "@/components/ui/leftNav";
import Header from "@/components/ui/header";
import Login from "@/app/login/page";
import { usePathname } from "next/navigation";
import { Providers } from "./walletProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import isMobileIcon from "@/assets/home/isMobileIcon.svg";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = React.useState(0);
  const pathname = usePathname();

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const setRem = () => {
      const actualWidth =
        document.documentElement.clientWidth || document.body.clientWidth; // 实际宽度
      if (actualWidth > 431) {
        setIsMobile(false); // 不是移动端
      } else {
        setIsMobile(true); // 是移动端
      }
    };

    window.addEventListener("resize", setRem);
    setRem();

    return () => {
      window.removeEventListener("resize", setRem);
    };
  }, []);
  return (
    <>
      {isMobile ? (
        <div className="w-[100vw] h-[100vh] overflow-hidden flex flex-col items-center justify-center ">
          <div className="w-[270px] flex flex-col items-center justify-center text-center">
            <Image src={isMobileIcon} alt="" width={121} height={120}></Image>
            Please use PC instead, mobile experience coming soon!
          </div>
        </div>
      ) : (
        <Providers>
          {pathname != "/login" && pathname != "/" ? (
            <div className="flex px-[16px]  relative pb-[16px]">
              <LeftNav></LeftNav>

              <div className="flex-1 flex flex-col " style={{}}>
                <Header></Header>
                <div
                  className="flex flex-col border-[2px] border-[#0D0D0D] border-solid"
                  style={{
                    borderLeft: "none",
                    borderRadius: "0 16px 16px 0",
                    height: "calc(100vh - 106px)",
                    background:
                      "linear-gradient(180deg, #F0EBE8 0%, #ECECEC 100%)",
                  }}
                >
                  {children}
                </div>
              </div>
            </div>
          ) : (
            <div>{children}</div>
          )}
          <ToastContainer></ToastContainer>
        </Providers>
      )}
    </>
  );
}

export default AppLayout;

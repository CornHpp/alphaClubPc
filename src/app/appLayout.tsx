"use client";
import React, { useEffect } from "react";
import LeftNav from "@/components/ui/leftNav";
import Header from "@/components/ui/header";
import Login from "@/app/login/page";
import { usePathname } from "next/navigation";
import { Providers } from "./walletProviders";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = React.useState(0);
  const pathname = usePathname();

  return (
    <>
      <Providers>
        {pathname != "/login" ? (
          <div className="flex px-[16px]  relative pb-[16px]">
            <LeftNav></LeftNav>

            <div className="flex-1 flex flex-col " style={{}}>
              <Header></Header>
              <div
                className="flex flex-col border-[2px] border-[#0D0D0D] border-solid "
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
      </Providers>
    </>
  );
}

export default AppLayout;

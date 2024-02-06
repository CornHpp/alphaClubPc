"use client";

import React, { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { arbitrum, baseGoerli, base } from "viem/chains";
import { WagmiConfig, Config } from "wagmi";

import { store } from "@/redux";

const projectId = "fb3959e4d4a2e4654b70f711216dbe63";

const wagmiMetadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// todo:
// 根据生产或者测试环境进行配置
// 测试
const chains = process.env.NODE_ENV == "production" ? [base] : [baseGoerli];

// 生产
// const chains = [base];

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: wagmiMetadata,
}) as Config;
createWeb3Modal({ wagmiConfig, projectId, chains });

interface Props {
  children: React.ReactNode;
}

export function Providers(props: Props) {
  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <ReduxProvider store={store}>
          <WagmiConfig config={wagmiConfig}>{props.children}</WagmiConfig>
        </ReduxProvider>
      )}
    </>
  );
}

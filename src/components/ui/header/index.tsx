"use client";
import React, { useEffect } from "react";
import Search from "@/components/custom/search";
import total from "@/assets/home/total.svg";
import holdings from "@/assets/home/holdings.svg";
import balance from "@/assets/home/balance.svg";
import earn from "@/assets/home/earn.svg";
import point from "@/assets/home/point.svg";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "@/redux/features/headSearchValue";
import { usePathname } from "next/navigation";
import Emitter from "@/lib/emitter";
import { getSelfUsersBalanceinfo } from "@/api/model/home";
import { setBalance } from "@/redux/features/userSlice";
import { setEarned, setHoldingValue } from "@/redux/features/userSlice";

import { setEtherObject } from "@/redux/features/userSlice";

import { ethers } from "ethers";
// const provider = ethers.getDefaultProvider(
//   process.env.NEXT_PUBLIC_APP_PROVIDE_WEB3NETWORK as string
// );
// const main = async () => {
//   console.log(provider);
// };
// main();
interface Props {}

const Header: React.FC<Props> = (props) => {
  const { value } = useSelector((state: any) => state.searchValue);
  const { userinfo } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const setValue = (value: string) => {
    dispatch(setSearchValue(value));
  };

  // const getBalance = async (address: string) => {
  //   const balance = await provider.getBalance(address as string);
  //   console.log(balance);
  //   console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
  //   setIconLists((pre) => {
  //     return pre.map((item, index) => {
  //       if (index === 2) {
  //         return {
  //           ...item,
  //           value: ethers.formatEther(balance),
  //         };
  //       }
  //       return item;
  //     });
  //   });
  // };

  const getSelfUsersBalanceFunc = async () => {
    const res = await getSelfUsersBalanceinfo();
    console.log(res);
    dispatch(setBalance(res?.result?.balance));
    dispatch(setEarned(res?.result?.earned) || "");
    dispatch(setHoldingValue(res?.result?.holdingValue));
    iconLists[0].value = res?.result?.totalBalance;
    iconLists[1].value = res?.result?.holdingValue;
    iconLists[2].value = res?.result?.balance;
    iconLists[3].value = res?.result?.earned;
    iconLists[4].value = res?.result?.score;
    setIconLists([...iconLists]);
  };

  useEffect(() => {
    getSelfUsersBalanceFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   dispatch(setEtherObject(provider));
  //   getBalance(userinfo?.walletAddress);
  // }, [dispatch, userinfo?.walletAddress]);

  const [iconLists, setIconLists] = React.useState([
    {
      img: total,
      text: "Total Value",
      value: "0",
    },
    {
      img: holdings,
      text: "Holdings Value",
      value: "0",
      currency: "ETH",
    },
    {
      img: balance,
      text: "Balance",
      value: "0",
      currency: "ETH",
    },
    {
      img: earn,
      text: "Earned",
      value: "0",
      currency: "ETH",
    },
    {
      img: point,
      text: "point",
      value: "0",
    },
  ]);

  const [showSearch, setShowSearch] = React.useState(false);

  const pathName = usePathname();
  useEffect(() => {
    setShowSearch(pathName === "/home");
  }, [pathName]);
  return (
    <div className="h-[90px]  pr-[7px] flex items-center justify-between flex-shrink-0">
      {showSearch ? (
        <Search
          value={value}
          onChange={setValue}
          onClickSerchIcon={() => {
            Emitter.emit("clickSearchIcon", value);
          }}
        ></Search>
      ) : (
        <div></div>
      )}

      <div className="flex items-center">
        {iconLists.map((item, index) => {
          return (
            <div key={index + "q"} className="flex items-center mr-[24px]">
              <Image
                src={item.img}
                alt=""
                className="w-[32px] h-[32px]"
                width={32}
                height={32}
              ></Image>
              <div className="ml-[6px]">
                <div className="text-[12px] text-[#404140] font-medium">
                  {item.text}
                </div>
                <div className="text-[20px] text-[#0D0D0D] font-semibold">
                  {index != 4 ? "$" : ""}
                  {item.value.slice(0, 8)} {item?.currency}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;

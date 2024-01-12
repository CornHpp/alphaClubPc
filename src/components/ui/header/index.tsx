"use client";
import React from "react";
import Search from "@/components/custom/search";
import total from "@/assets/home/total.svg";
import holdings from "@/assets/home/holdings.svg";
import balance from "@/assets/home/balance.svg";
import earn from "@/assets/home/earn.svg";
import point from "@/assets/home/point.svg";
import Image from "next/image";

interface Props {
  // Define your component's props here
}

const Header: React.FC<Props> = () => {
  return (
    <div className="h-[90px]  pr-[7px] flex items-center justify-between flex-shrink-0">
      <Search></Search>
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
                  {Number(item.value).toLocaleString()} {item?.currency}
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

const iconLists = [
  {
    img: total,
    text: "Total Value",
    value: "3072",
  },
  {
    img: holdings,
    text: "Holdings Value",
    value: "6.07",
    currency: "ETH",
  },
  {
    img: balance,
    text: "Balance",
    value: "1.31",
    currency: "ETH",
  },
  {
    img: earn,
    text: "earn",
    value: "0.92",
    currency: "ETH",
  },
  {
    img: point,
    text: "point",
    value: "635",
  },
];

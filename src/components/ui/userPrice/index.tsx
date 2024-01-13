import React from "react";
import UserHeader from "../userHeader";
import Image from "next/image";

import ethIcon from "@/assets/profile/ethIcon.svg";

interface Props {
  // Define your props here
}

const UserPrice: React.FC<Props> = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <UserHeader headerWidth={40} titleSize={"16px"}></UserHeader>

      <div className="">
        <div className="flex text-[18px] font-semibold">
          <Image
            className="mr-[2px]"
            src={ethIcon}
            alt=""
            width={16}
            height={17}
          ></Image>
          68 ETH
        </div>
        <div className="flex text-[#404140] text-[12px] font-medium">
          Holder：3244
        </div>
      </div>
    </div>
  );
};

export default UserPrice;

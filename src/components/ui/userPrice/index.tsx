import React from "react";
import UserHeader from "../userHeader";
import Image from "next/image";

import ethIcon from "@/assets/profile/ethIcon.svg";
import { formatBalanceNumber } from "@/lib/util";

interface Props {
  // Define your props here
  item?: PartialGetTradeOrderList;
  showEthHolder?: boolean;
}

const UserPrice: React.FC<Props> = (props) => {
  const { item, showEthHolder = true } = props;
  return (
    <div className="w-full flex items-center justify-between">
      <UserHeader
        userInfo={{
          username: item?.twitterName,
          avatar: item?.imageUrl,
          twitterScreenName: item?.twitterScreenName,
          followers: item?.followersCount,
        }}
        headerWidth={40}
        titleSize={"16px"}
      ></UserHeader>

      {showEthHolder && (
        <div className="flex flex-col items-end">
          <div className="flex text-[18px] font-semibold">
            <Image
              className="mr-[2px] w-[16px] h-[17px]"
              src={ethIcon}
              alt=""
              width={16}
              height={17}
            ></Image>
            {formatBalanceNumber(item?.price)} ETH
          </div>
          <div className="flex text-[#404140] text-[12px] font-medium ">
            Holder：{item?.holdcount}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPrice;

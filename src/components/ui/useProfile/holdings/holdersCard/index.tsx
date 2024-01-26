import UserHeader from "@/components/ui/userHeader";
import React from "react";
import keyIcon from "@/assets/home/key.svg";
import Image from "next/image";

interface Props {
  // Add your props here
  item: any;
}

const HoldersCard: React.FC<Props> = (props) => {
  const { item } = props;
  return (
    <div className="flex items-center justify-between">
      <UserHeader></UserHeader>

      <div className="">
        <div className="text-[12px] text-[#404140] font-medium">Keys</div>
        <div className="text-[#0D0D0D] flex justify-end text-[18px] font-semibold">
          <Image
            src={keyIcon}
            alt=""
            width={18}
            height={18}
            className="mr-[1px]"
          ></Image>
          {item.keys}
        </div>
      </div>
    </div>
  );
};

export default HoldersCard;

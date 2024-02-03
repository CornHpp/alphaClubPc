import UserHeader from "@/components/ui/userHeader";
import React from "react";
import keyIcon from "@/assets/home/key.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  // Add your props here
  item: any;
}

const HoldersCard: React.FC<Props> = (props) => {
  const router = useRouter();
  const { item } = props;
  return (
    <div className="flex items-center justify-between">
      <div
        onClick={() => {
          router.push(`/profile/${item.twitterUid}`);
        }}
      >
        <UserHeader
          userInfo={{
            username: item?.twitterName,
            avatar: item?.imageUrl,
            twitterScreenName: item?.twitterScreenName,
            followers: item.followersCount,
          }}
          headerWidth={40}
        ></UserHeader>
      </div>

      <div className=" text-right">
        <div className="text-[12px] text-[#404140] font-medium">Cards</div>
        <div className="text-[#0D0D0D] flex justify-end text-[18px] font-semibold">
          {item.keys}
        </div>
      </div>
    </div>
  );
};

export default HoldersCard;

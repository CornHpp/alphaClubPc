import React, { useEffect } from "react";
import UserHeader from "@/components/ui/userHeader";
import diamondIcon from "@/assets/airdrop/diamondIcon.svg";
import Image from "next/image";
import {
  PartialUsersAirdropRequestType,
  getUsersAirdrop,
  usersAirdropRequestType,
} from "@/api/model/airdrop";

interface AirDropRankProps {
  // Define the props for the AirDropRank component here
}

const AirDropRank: React.FC<AirDropRankProps> = () => {
  const [personRankList, setPersonRankList] = React.useState<
    PartialUsersAirdropRequestType[]
  >([]);

  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const params = {
    pageNum: 1,
    pageSize: 20,
  };
  const getUsersAirdropFunc = async () => {
    const res = await getUsersAirdrop(params);
    console.log(res);
    let { pageList = [], count = 0 } = res.result;
    if (!pageList) pageList = [];

    const newCardList = [
      ...(personRankList ? personRankList : []),
      ...(pageList ? pageList : []),
    ];
    setPersonRankList(newCardList);

    if (newCardList.length >= count) {
      setHasMore(false);
    }
    params.pageNum++;
  };

  useEffect(() => {
    getUsersAirdropFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" border-solid border-[2px] flex-1 border-[#0D0D0D] rounded-[16px] p-[16px] bg-white mr-[16px] overflow-y-scroll">
      <div className="text-[20px] font-bold mr-[3px]"> Points Ranking</div>
      <div className="text-[14px] mt-[2px]">
        Get to the top of the leaderboard and increase your points. 24-hour
        rolling rankings of the top 1,221 players will be rewarded with points!
        To learn more about our point earning mechanism please read on
        <span className="text-[14px] font-semibold underline">
          {" "}
          Points Farming
        </span>
      </div>

      <div className="mt-[8px] w-full flex-1  overflow-y-scroll">
        <div className="flex w-full pl-[64px] pr-[64px] text-[#404140] text-[12px]">
          <div className="w-[15%]">Rank</div>
          <div className="w-[35%]">Club owner</div>
          <div className="w-[35%]">Invited by</div>
          <div className="w-[15%]">Points</div>
        </div>
      </div>
      {personRankList.map((item, index) => {
        return (
          <div
            key={index + "1"}
            style={{
              borderColor:
                item.rank == 1
                  ? "#FFD601"
                  : item.rank == 2
                  ? "#A1B8B3"
                  : item.rank == 2
                  ? "#DDAA7A"
                  : "#949694",
            }}
            className="border-solid border-[2px] border-[#949694] h-[74px] rounded-[8px] flex items-center pl-[64px] pr-[64px] w-full mb-[16px]"
          >
            <div className="w-[15%] flex items-center italic text-[24px] ">
              <div className="">
                {item.rank}
                <span className="text-[12px]">th</span>
              </div>
            </div>

            <div className="w-[35%]">
              <UserHeader
                userInfo={{
                  username: item.twitterName,
                  avatar: item.imageUrl,
                  followers: item.followersCount,
                  twitterScreenName: item.twitterScreenName,
                }}
              ></UserHeader>
            </div>
            <div className="w-[35%]">
              <UserHeader
                userInfo={{
                  username: item.parentTwitterName,
                  avatar: item.parentImageUrl,
                  followers: item.parentFollowersCount,
                  twitterScreenName: item.parentTwitterScreenName,
                }}
              ></UserHeader>
            </div>

            <div className="w-[15%] flex items-center">
              <Image
                src={diamondIcon}
                alt=""
                width={24}
                height={24}
                className="mr-[2px]"
              ></Image>
              {item.score}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AirDropRank;

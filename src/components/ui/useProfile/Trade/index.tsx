import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import { getPersonTradeList } from "@/api/model/profile";
import { useSelector } from "react-redux";
import clockIcon from "@/assets/profile/clockIcon.svg";
import InfinietScrollbar from "@/components/custom/scrollInfiniteScroll";
import { useParams } from "next/navigation";
import nothingIcon from "@/assets/home/nothingIcon.svg";

interface Props {
  // Add your props here
}

const TradeView: React.FC<Props> = () => {
  const { userinfo } = useSelector((state: any) => state.user);
  const [lists, setLists] = React.useState<PartialGetTradeListType[]>([]);

  const [orderHasMore, setOrderHasMore] = React.useState<boolean>(true);

  const urlParams = useParams();

  const houseId = urlParams.id ? urlParams.id : userinfo.twitterUidStr;

  const queryParams = {
    pageNum: 1,
    pageSize: 50,
  };

  const getPersonTradeListFunc = useCallback(async () => {
    const params = {
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize,
      houseId: houseId,
    };
    const res = await getPersonTradeList(params);
    console.log(res);
    let { pageList = [], count = 0 } = res.result;
    if (!pageList) pageList = [];
    const newCardList = [...lists, ...(pageList ? pageList : [])];
    if (newCardList.length >= count) {
      setOrderHasMore(false);
    }
    setLists(newCardList);
    queryParams.pageNum++;
  }, [houseId, lists, queryParams.pageNum, queryParams.pageSize]);

  useEffect(() => {
    getPersonTradeListFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="border-[2px] min-w-[355px] rounded-[16px] h-full border-[#0D0D0D] border-solid py-[14px] bg-white flex-1 flex flex-col">
      <div className="text-[20px] font-bold mx-[14px]">Trade</div>

      <div className="mt-[12px] w-full flex-1 overflow-y-scroll">
        {lists.length > 0 && (
          <InfinietScrollbar
            hasMore={orderHasMore}
            onLoadMore={getPersonTradeListFunc}
            // distanceClientHeight={"150px"}
          >
            {lists.map((item, index) => {
              return (
                <div
                  className="flex mx-[14px] justify-between mt-[16px] first:mt-0"
                  key={index + "fa"}
                >
                  <div className="flex items-center">
                    <Image
                      src={item.imageUrl || defaultHeaderIcon}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full border-[1px] border-solid border-[#0d0d0d]"
                    ></Image>
                    <div className="ml-[4px] ">
                      <div className="text-[#004D22] text-[12px]">
                        {item.twitterName} bought{" "}
                        <span className="font-semibold">{item.keys}</span> card
                      </div>
                      <div className="text-[#005A0E] text-[16px] font-semibold">
                        {item.moneyCount} ETH
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex ">
                    <Image
                      src={clockIcon}
                      alt=""
                      width={12}
                      height={12}
                      className="w-[12px] h-[12px] mr-[2px] mt-[3px]"
                    ></Image>
                    <div className=" text-[#404140]">2023.12.12</div>
                  </div> */}
                </div>
              );
            })}
          </InfinietScrollbar>
        )}

        {lists.length == 0 && (
          <div className="flex flex-col items-center font-semibold ">
            <Image
              src={nothingIcon}
              alt=""
              width={120}
              height={120}
              className="w-[120px] h-[120px]"
            ></Image>
            Un，there is nothing here
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeView;

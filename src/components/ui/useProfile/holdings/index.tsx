import React, { useCallback } from "react";
import HoldTabs from "./holdTabs";
import HoldCard from "./holdCard";
import HoldersCard from "./holdersCard";
import { keyholderHolding, keyholderHolders } from "@/api/model/profile";
import InfinietScrollbar from "@/components/custom/scrollInfiniteScroll";
import Image from "next/image";
import nothingIcon from "@/assets/home/nothingIcon.svg";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {
  // Add your props here
}

const HoldingsView: React.FC<Props> = () => {
  const { userinfo } = useSelector((state: any) => state.user);

  let [tabIndex, setTabIndex] = React.useState(0);

  const [houlderList, setHoulderList] = React.useState<
    PartialGetTradeListType[]
  >([]);

  const [orderHasMore, setOrderHasMore] = React.useState<boolean>(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryParams = {
    pageNum: 1,
    pageSize: 50,
  };

  const urlParams = useParams();

  const houseId = urlParams.id ? urlParams.id : userinfo.twitterUidStr;

  const getkeyholderHoldingFunc = useCallback(
    async (isReset?: boolean) => {
      const params = {
        pageNum: 1,
        pageSize: 50,
        twitterUid: houseId as string,
      };
      if (isReset) {
        queryParams.pageNum = 1;
        setHoulderList([]);
      }

      const keyholderFunc =
        tabIndex === 0 ? keyholderHolding : keyholderHolders;

      const res = await keyholderFunc(params);
      let { pageList = [], count = 0 } = res.result;
      if (!pageList) pageList = [];
      const newCardList = [
        ...(isReset ? [] : houlderList),
        ...(pageList ? pageList : []),
      ];
      if (newCardList.length >= count) {
        setOrderHasMore(false);
      }

      setHoulderList(newCardList || []);
    },
    [houlderList, houseId, queryParams, tabIndex]
  );

  React.useEffect(() => {
    getkeyholderHoldingFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border-[2px] min-w-[355px] rounded-[16px]  border-[#0D0D0D] border-solid h-full py-[14px] bg-white">
      <div className="px-[14px]">
        <HoldTabs
          currentTab={tabIndex}
          setCurrentTab={(val) => {
            tabIndex = val;
            getkeyholderHoldingFunc(true);
            setTabIndex(val);
          }}
        ></HoldTabs>
      </div>

      <div className="mt-[12px]">
        {houlderList.length > 0 && (
          <InfinietScrollbar
            hasMore={orderHasMore}
            onLoadMore={getkeyholderHoldingFunc}
            distanceClientHeight={"610px"}
          >
            <div className="mx-[14px]">
              {houlderList.map((item, index) => {
                return (
                  <div className="mb-[16px]" key={index + "fff"}>
                    <HoldersCard item={item}></HoldersCard>
                  </div>
                );
              })}
            </div>
          </InfinietScrollbar>
        )}

        {houlderList.length == 0 && (
          <div className="flex flex-col items-center font-semibold  mt-[100px]">
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

export default HoldingsView;

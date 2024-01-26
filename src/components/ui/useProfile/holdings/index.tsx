import React from "react";
import HoldTabs from "./holdTabs";
import HoldCard from "./holdCard";
import HoldersCard from "./holdersCard";
import { keyholderHolding } from "@/api/model/profile";
import InfinietScrollbar from "@/components/custom/scrollInfiniteScroll";
import Image from "next/image";
import nothingIcon from "@/assets/home/nothingIcon.svg";
import { useParams } from "next/navigation";

interface Props {
  // Add your props here
}

const HoldingsView: React.FC<Props> = () => {
  // Add your component logic here

  const [tabIndex, setTabIndex] = React.useState(0);

  const [houlderList, setHoulderList] = React.useState<
    PartialGetTradeListType[]
  >([]);

  const [orderHasMore, setOrderHasMore] = React.useState<boolean>(true);

  const queryParams = {
    pageNum: 1,
    pageSize: 50,
  };

  const urlParams = useParams();

  const houseId = urlParams.id ? urlParams.id : "1128532098262765568";

  const getkeyholderHoldingFunc = async (isReset?: boolean) => {
    const params = {
      pageNum: 1,
      pageSize: 50,
      twitterUid: houseId as string,
    };
    if (isReset) {
      queryParams.pageNum = 1;
      setHoulderList([]);
    }
    const res = await keyholderHolding(params);
    console.log(res);
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
  };

  React.useEffect(() => {
    getkeyholderHoldingFunc();
  }, []);

  return (
    <div className="border-[2px] min-w-[355px] rounded-[16px]  border-[#0D0D0D] border-solid h-[684px]  py-[14px] bg-white">
      <div className="px-[14px]">
        <HoldTabs
          currentTab={tabIndex}
          setCurrentTab={(val) => {
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
            distanceClientHeight={610}
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

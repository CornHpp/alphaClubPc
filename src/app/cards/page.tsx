"use client";
import React, { useEffect } from "react";

import Button from "@/components/custom/button";
import Roll from "@/components/custom/roll";
import UseProfileView from "@/components/ui/useProfile";
import CreationTabs from "@/components/ui/useProfile/creation/creationTabs";
import UserPrice from "@/components/ui/userPrice";
import Image from "next/image";
import loveWhiteIcon from "@/assets/cards/loveWhiteIcon.svg";
import loveBlackIcon from "@/assets/cards/loveBlackIcon.svg";
import personAddIcon from "@/assets/cards/personAddIcon.svg";
import champion from "@/assets/cards/champion.svg";
import secondPlace from "@/assets/cards/secondPlace.svg";
import thirdWinner from "@/assets/cards/thirdWinner.svg";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import personIcon from "@/assets/cards/personIcon.svg";
import handLoveSign from "@/assets/home/handLoveSign.svg";
import ETHIcon from "@/assets/popup/ETH.svg";
import CustomScrollbar from "@/components/custom/scroll";
import twitterIcon from "@/assets/home/twitterIcon.svg";
import InfinietScrollbar from "@/components/custom/scrollInfiniteScroll";
import closeIcon from "@/assets/cards/closeIcon.svg";
import searchIcon from "@/assets/cards/searchIcon.svg";
import arrivedIcon from "@/assets/cards/arrivedIcon.svg";
import "./index.css";
import {
  getTradeGetAllTradeList,
  getTradeGetHouseGetOrderList,
  getTwitterList,
  getTwitterSearch,
  setTwitterVote,
} from "@/api/model/card";
import { formatBalanceNumber } from "@/lib/util";
import Search from "@/components/custom/search";

interface Props {
  // Define your props here
}

const Page: React.FC<Props> = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [greaerThenFourOrderlist, setGreaerThenFourOrderlist] = React.useState<
    PartialGetTradeOrderList[]
  >([]);

  const [twitterFriendList, setTwitterFriendList] =
    React.useState<PartialResponseTwitterListType[]>();
  const [paimingList, setPaimingList] = React.useState<
    PartialGetTradeOrderList[]
  >([]);
  const [scrollItemClientHeight, setScrollItemClientHeight] =
    React.useState<number>(0);

  let [value, setValue] = React.useState<string>("");

  const [danmuList, setDanmuList] = React.useState<any[]>([]);

  const getPageData = () => {
    const params = {
      pageNum: 1,
      pageSize: 20,
    };
    getTradeGetAllTradeList(params).then((res) => {
      console.log(res);
      setDanmuList(res.result);
    });
  };

  const [orderHasMore, setOrderHasMore] = React.useState<boolean>(true);

  const getLoadOrder = () => {
    const params = {
      pageNum: 1,
      pageSize: 50,
    };
    return getTradeGetHouseGetOrderList(params).then((res) => {
      console.log(res);
      let { pageList = [], count = 0 } = res.result;
      if (!pageList) pageList = [];

      const topThreeOrderlist = pageList.slice(0, 3);

      const temporaryMap = topThreeOrderlist[1];
      topThreeOrderlist[1] = topThreeOrderlist[0];
      topThreeOrderlist[0] = temporaryMap;

      setPaimingList(topThreeOrderlist);

      const newCardList = [
        ...greaerThenFourOrderlist,
        ...(pageList ? pageList.slice(3) : []),
      ];

      setGreaerThenFourOrderlist(res.result.pageList.slice(3));

      if (newCardList.length >= count) {
        setOrderHasMore(false);
      }
    });
  };

  const [searchMap, setSearchMap] =
    React.useState<PartialResponseScreenNameType>();

  const getTwitterSearchData = (value: string | undefined) => {
    getTwitterSearch(value).then((res) => {
      console.log(res);
      setSearchMap(res.result);
    });
  };

  const twitterParams = {
    pageNum: 1,
    pageSize: 50,
  };

  const getTwitterListFunc = (refresh?: boolean) => {
    if (refresh) {
      twitterParams.pageNum = 1;
      setTwitterFriendList([]);
    }
    getTwitterList(twitterParams).then((res) => {
      console.log(res);
      let { pageList = [], count = 0 } = res.result;
      if (!pageList) pageList = [];

      const newCardList = [
        ...(refresh ? [] : twitterFriendList ? twitterFriendList : []),
        ...(pageList ? pageList : []),
      ];

      setTwitterFriendList(newCardList);

      if (newCardList.length >= count) {
        setOrderHasMore(false);
      }
    });
  };

  const setTwitterVoteFunc = (
    twitterName: string | undefined,
    isSearchList?: boolean
  ) => {
    const params = {
      twitterScreenName: twitterName as string,
    };
    setTwitterVote(params).then((res) => {
      console.log(res);
      if (isSearchList) {
        setSearchMap({
          ...searchMap,
          started: 1,
          tickets: (searchMap?.tickets as number) + 1,
        });
      }
      getTwitterListFunc(true);
    });
  };
  useEffect(() => {
    getPageData();
    getTwitterListFunc();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-[24px] w-full flex flex-col flex-1 pr-[37px] overflow-hidden">
      <div className=" flex w-full justify-between pr-[39px] items-center">
        <div className="text-[32px] font-bold mr-[3px]">Cards</div>
      </div>
      <div className="flex items-center mt-[12px] border-[2px] border-[#0D0D0D] border-solid rounded-[12px]  h-[58px] bg-white px-[14px]">
        <div className="font-bold text-[18px] w-[65px] leading-[20px]">
          Recent Trade
        </div>
        <div className="ml-[12px] relative overflow-hidden flex-1 h-full flex items-center">
          <Roll
            danmuList={danmuList}
            isCardsDanmu={true}
            leftOrRight={true}
          ></Roll>
        </div>
      </div>

      <div className="flex flex-1 pb-[16px] w-full overflow-hidden">
        <div
          className="mt-[24px] border-[2px] border-[#0D0D0D] border-solid rounded-[12px]  flex-1 mr-[24px] flex-col flex overflow-hidden"
          style={{
            background:
              "linear-gradient(128deg, #FDFFF4 0%, #F5FFF2 47%, #FFFEE2 100%)",
          }}
        >
          <div className=" pb-[0px]">
            <div className="text-[20px] font-bold mt-[14px] ml-[14px]">
              Top Clubs
            </div>

            <div className="flex items-end">
              {paimingList.map((item, index) => {
                return (
                  <div
                    className=" relative w-[33%] flex justify-center min-w-[173px]"
                    key={index + "w"}
                    style={{
                      marginRight: index == 2 ? "0px" : "8px",
                    }}
                  >
                    <Image
                      src={
                        index == 0
                          ? secondPlace
                          : index == 1
                          ? champion
                          : thirdWinner
                      }
                      alt=""
                      style={{
                        height: index == 1 ? "229px" : "200px",
                      }}
                      width={index == 1 ? 200 : 173}
                      priority={true}
                      height={index == 1 ? 229 : 200}
                    ></Image>
                    <div
                      className="absolute left-[50%] translate-x-[-50%] top-0"
                      style={{
                        width: "173px",
                      }}
                    >
                      <div
                        className="mt-[32px] ml-[8px] flex items-end"
                        style={{
                          marginTop: index == 1 ? "48px" : "32px",
                        }}
                      >
                        <Image
                          src={item.imageUrl || defaultHeaderIcon}
                          alt=""
                          width={51}
                          height={51}
                          className="w-[51px] h-[51px] rounded-full border-[2px] border-solid border-[#0d0d0d]"
                        ></Image>
                        <div className="text-[16px] font-bold overflow-hidden text-ellipsis whitespace-nowrap  w-[70px] h-[20px]">
                          {item.twitterName}
                        </div>
                      </div>

                      <div className="pt-[6px]  flex items-center ml-[6px]">
                        <div className="">
                          <div className="flex items-center text-[12px] text-[#404140]">
                            <Image
                              src={twitterIcon}
                              className="w-[12px] h-[12px]"
                              alt=""
                              width={12}
                              height={12}
                            ></Image>
                            <div className="ml-[2px] text-[12px] font-medium">
                              Twitter
                            </div>
                          </div>
                          <div className="text-[14px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap  w-[70px]">
                            @{item.twitterScreenName}
                          </div>
                        </div>
                        <div className="w-[2px] h-[12px] ml-[8px] mr-[8px] bg-[#0D0D0D] rounded-[2px]"></div>

                        <div className="">
                          <div className="flex items-center text-[12px] text-[#404140]">
                            <Image
                              src={personIcon}
                              className="w-[12px] h-[12px]"
                              alt=""
                              width={12}
                              height={12}
                            ></Image>
                            <div className="ml-[2px] text-[11px] font-medium text-[#404140]">
                              Followers
                            </div>
                          </div>
                          <div className="text-[14px] font-semibold">
                            {item.followersCount}
                          </div>
                        </div>
                      </div>

                      <div className=" w-full pt-[10px] px-[8px]  ">
                        <div
                          className="border-[#0D0D0D] border-[1px]  h-[50px] border-solid rounded-[8px] flex flex-col items-center justify-center "
                          style={{
                            height: index == 1 ? "58px" : "50px",
                            fontSize: index == 1 ? "18px" : "16px",
                          }}
                        >
                          <div className="flex font-semibold mb-[-2px] items-center">
                            <Image
                              src={ETHIcon}
                              alt=""
                              width={16}
                              height={16}
                              className="w-[16px] h-[16px] mr-[2px]"
                            ></Image>
                            {formatBalanceNumber(item.price)}
                            ETH
                          </div>
                          <div className="flex items-center">
                            <Image
                              src={handLoveSign}
                              alt=""
                              className="w-[12px] h-[12px]"
                              width={12}
                              height={12}
                            ></Image>
                            <div className="text-[#404140]  ml-[2px] text-[12px]">
                              Holder:{item.holdcount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-[-2px] box-border pl-[12px] bg-[#fff] rounded-[12px]  ml-[-2px] border-[2px] border-[#0D0D0D] border-solid flex-1 mb-[-2px] overflow-y-scroll">
            <InfinietScrollbar
              hasMore={orderHasMore}
              onLoadMore={getLoadOrder}
              distanceClientHeight={"390px"}
            >
              {greaerThenFourOrderlist.map((item, index) => {
                return (
                  <div
                    id="scrollItemId"
                    className="flex items-center mt-[16px] mr-[14px]"
                    key={index + "q"}
                  >
                    <div className="w-[43px] flex items-center italic text-[20px]">
                      <div className="">
                        {index + 4}
                        <span className="text-[12px]">th</span>
                      </div>
                    </div>
                    <UserPrice item={item}></UserPrice>
                  </div>
                );
              })}
            </InfinietScrollbar>
          </div>
        </div>

        {searchMap?.twitterScreenName && (
          <div
            className="w-[100vw] h-[100vh] fixed bg-[#fff] z-[111111] opacity-0"
            onClick={() => {
              setSearchMap({});
            }}
          ></div>
        )}

        <div className="mt-[24px] border-[2px] flex-1 border-[#0D0D0D] border-solid rounded-[12px] w-[563px] pl-[14px] pt-[14px] bg-[#fff] flex flex-col">
          <div className="flex w-full justify-between pr-[14px] relative">
            <div className="text-[20px] font-bold">Polls Ranking</div>
            <div className="selfStyle">
              <Search
                value={value}
                onChange={(val) => {
                  if (val == "") {
                    setSearchMap({});
                  }
                  value = val;
                  setValue(val);
                }}
                onClickSerchIcon={(val) => {
                  console.log(val);

                  getTwitterSearchData(val);
                }}
                width={165}
                height={34}
                borderRadius="17px"
                placeholder="Twitter Name"
                leftNode={
                  <>
                    <Image
                      src={searchIcon}
                      alt=""
                      width={14}
                      height={14}
                      className="ml-[6px]"
                    ></Image>
                  </>
                }
                rightNode={
                  <>
                    <Image
                      src={closeIcon}
                      alt=""
                      width={14}
                      height={14}
                      onClick={() => {
                        setValue("");
                        setSearchMap({});
                      }}
                    ></Image>
                  </>
                }
              ></Search>
            </div>

            {searchMap?.twitterScreenName && (
              <div className="min-w-[342px] border-[2px] border-solid border-[#0D0D0D] rounded-[16px] absolute right-[16px] top-[40px] z-[1000] bg-[#fff]">
                <div className="flex items-center w-full px-[10px] h-[62px]">
                  <UserPrice
                    item={{
                      imageUrl: searchMap?.imageUrl,
                      twitterName: searchMap?.twitterName,
                      twitterScreenName: searchMap?.twitterScreenName,
                      followersCount: searchMap?.followersCount,
                    }}
                    showEthHolder={false}
                  ></UserPrice>
                  <div className="ml-[32px]">
                    <Button
                      hideBottomBackground={true}
                      active={false}
                      width="113px"
                      height="40px"
                      text={
                        searchMap.arrived == 1
                          ? "arrived"
                          : searchMap?.started == 1
                          ? `${searchMap.tickets} Polls`
                          : `${searchMap.tickets} Polls`
                      }
                      color={
                        searchMap?.arrived == 1
                          ? "#949694"
                          : searchMap?.started == 1
                          ? "#0D0D0D"
                          : "#fff"
                      }
                      normalBackGround={
                        searchMap?.arrived == 1
                          ? "#E9E9E9"
                          : searchMap?.started == 1
                          ? "#00FC6E"
                          : "#0D0D0D"
                      }
                      borderRadius="27px"
                      border={
                        searchMap?.arrived == 1 ? "none" : "2px solid #0D0D0D"
                      }
                      buttonClick={() => {
                        if (searchMap.arrived || searchMap.started) {
                          return;
                        }
                        setTwitterVoteFunc(searchMap.twitterScreenName, true);
                      }}
                    >
                      <Image
                        src={
                          searchMap?.arrived == 1
                            ? arrivedIcon
                            : searchMap.started == 1
                            ? loveBlackIcon
                            : loveWhiteIcon
                        }
                        alt=""
                        width={20}
                        height={20}
                      ></Image>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* <div className="mt-[12px]">
            <CreationTabs
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              tabList={[
                {
                  name: "Following",
                },
                {
                  name: "Mutual Following",
                },
              ]}
            ></CreationTabs>
          </div> */}
          <div className="mt-[16px] flex-1  overflow-y-scroll">
            <InfinietScrollbar
              hasMore={false}
              distanceClientHeight={"606px"}
              onLoadMore={() => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
              }}
            >
              <div>
                {twitterFriendList &&
                  twitterFriendList.map((item, index) => {
                    return (
                      <div
                        className="flex items-center mb-[16px] pr-[16px] pl-[4px]"
                        key={index + "1r"}
                      >
                        <UserPrice
                          item={{
                            imageUrl: item?.imageUrl,
                            twitterName: item?.twitterName,
                            twitterScreenName: item?.twitterScreenName,
                            followersCount: item?.followersCount,
                            price: item?.priceStr,
                            holders: item?.holdcount,
                          }}
                        ></UserPrice>
                        <div className="ml-[32px]">
                          <Button
                            hideBottomBackground={true}
                            active={false}
                            width="113px"
                            height="40px"
                            text={
                              item.arrived == 1
                                ? "arrived"
                                : item?.started == 1
                                ? `${item.tickets} Polls`
                                : `${item.tickets} Polls`
                            }
                            color={
                              item?.arrived == 1
                                ? "#E9E9E9"
                                : item?.started == 1
                                ? "#0D0D0D"
                                : "#fff"
                            }
                            normalBackGround={
                              item?.arrived == 1
                                ? "#E9E9E9"
                                : item?.started == 1
                                ? "#00FC6E"
                                : "#0D0D0D"
                            }
                            borderRadius="27px"
                            border={
                              item?.arrived == 1 ? "none" : "2px solid #0D0D0D"
                            }
                            buttonClick={() => {
                              if (item.arrived || item.started) {
                                return;
                              }
                              setTwitterVoteFunc(item.twitterScreenName);
                            }}
                          >
                            <Image
                              src={
                                item?.arrived == 1
                                  ? arrivedIcon
                                  : item.started == 1
                                  ? loveBlackIcon
                                  : loveWhiteIcon
                              }
                              alt=""
                              width={20}
                              height={20}
                            ></Image>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </InfinietScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderThumb = ({ ...props }) => {
  //设置滚动条的样式
  const thumbStyle = {
    width: "8px",
    backgroundColor: "#000000",
    opacity: "0.2",
    borderRadius: "6px",
    right: "4px",
  };
  return <div style={{ ...thumbStyle }} {...props} />;
};

export default Page;

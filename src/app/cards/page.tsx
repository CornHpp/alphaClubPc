"use client";
import React from "react";

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
import secondPlace from "@/assets/cards/secondplace.svg";
import thirdWinner from "@/assets/cards/thirdWinner.svg";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import personIcon from "@/assets/cards/personIcon.svg";
import handLoveSign from "@/assets/home/handLoveSign.svg";
import ETHIcon from "@/assets/popup/ETH.svg";
import CustomScrollbar from "@/components/custom/scroll";
import twitterIcon from "@/assets/home/twitterIcon.svg";

interface Props {
  // Define your props here
}

const Page: React.FC<Props> = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [list, setList] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [paimingList, setPaimingList] = React.useState([1, 2, 3]);
  const [scrollItemClientHeight, setScrollItemClientHeight] =
    React.useState<number>(0);
  return (
    <div className="mt-[24px] w-full">
      <div className=" flex w-full justify-between pr-[39px] items-center">
        <div className="text-[32px] font-bold mr-[3px]">cards</div>
      </div>
      <div className="flex items-center mt-[12px] border-[2px] border-[#0D0D0D] border-solid rounded-[12px] w-full h-[58px] bg-white px-[14px]">
        <div className="font-bold text-[18px] w-[65px] leading-[20px]">
          Recent Trade
        </div>
        <div className="ml-[12px] relative overflow-hidden flex-1 h-full flex items-center">
          <Roll isCardsDanmu={true} leftOrRight={true}></Roll>
        </div>
      </div>

      <div className="mt-[24px] flex">
        <div
          className="mt-[24px] border-[2px] border-[#0D0D0D] border-solid rounded-[12px] h-[596px] w-[563px] mr-[24px] flex-col flex"
          style={{
            background:
              "linear-gradient(128deg, #FDFFF4 0%, #F5FFF2 47%, #FFFEE2 100%)",
          }}
        >
          <div className="p-[14px]">
            <div className="text-[20px] font-bold">Top Clubs</div>

            <div className="flex items-end justify-between">
              {paimingList.map((item, index) => {
                return (
                  <div
                    className=" relative"
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
                      width={173}
                      height={index == 1 ? 229 : 200}
                    ></Image>
                    <div className="absolute left-0 top-0 w-full h-full">
                      <div
                        className="mt-[32px] ml-[8px] flex items-end"
                        style={{
                          marginTop: index == 1 ? "48px" : "32px",
                        }}
                      >
                        <Image
                          src={defaultHeaderIcon}
                          alt=""
                          width={51}
                          height={51}
                          className="w-[51px] h-[51px]"
                        ></Image>
                        <div className="text-[16px] font-bold">Jim</div>
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
                              @Dekid
                            </div>
                          </div>
                          <div className="text-[14px] font-semibold">
                            @Gooy10
                          </div>
                        </div>
                        <div className="w-[2px] h-[12px] ml-[12px] mr-[8px] bg-[#0D0D0D] rounded-[2px]"></div>

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
                          <div className="text-[14px] font-semibold">1.5K</div>
                        </div>
                      </div>

                      <div className=" w-full pt-[10px] px-[6px]  ">
                        <div className="border-[#0D0D0D] border-[2px]  h-[50px] border-solid rounded-[8px] flex flex-col items-center justify-center ">
                          <div className="flex font-semibold mb-[-2px] items-center">
                            <Image
                              src={ETHIcon}
                              alt=""
                              width={16}
                              height={16}
                              className="w-[16px] h-[16px] mr-[2px]"
                            ></Image>
                            104 ETH
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
                              Holder:242
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

          <div className=" py-[12px] pl-[12px] bg-[#fff]  rounded-[12px] w-[563px] ml-[-2px] border-[2px] border-[#0D0D0D] border-solid flex-1 mb-[-2px]">
            <CustomScrollbar
              distanceClientHeight={
                // todo:这里得到滚动到最底部的方法，scrollItemClientHeight为每个滚动元素的高度，16为每个marginbottom，list.length为滚动元素的个数，16为最后一个item元素之间的间距
                (scrollItemClientHeight + 16) * list.length - 16 - 332
              }
              onloadMore={() => {
                console.log("loadmore");
              }}
            >
              <div className="h-[332px]">
                {list.map((item, index) => {
                  var scrollItemId = document.getElementById("scrollItemId");
                  if (!scrollItemClientHeight) {
                    setScrollItemClientHeight(scrollItemId?.clientHeight || 0);
                  }
                  return (
                    <div
                      id="scrollItemId"
                      className="flex items-center mb-[16px] mr-[14px]"
                      key={index + "q"}
                    >
                      <div className="w-[43px] flex items-center italic text-[20px]">
                        <div className="">
                          {index + 4}
                          <span className="text-[12px]">th</span>
                        </div>
                      </div>
                      <UserPrice></UserPrice>
                    </div>
                  );
                })}
              </div>
            </CustomScrollbar>
          </div>
        </div>

        <div className="mt-[24px] border-[2px] border-[#0D0D0D] border-solid rounded-[12px] h-[596px] w-[563px] px-[14px] pt-[14px] bg-[#fff] flex flex-col">
          <div className="text-[20px] font-bold">Twitter Friends</div>

          <div className="mt-[12px]">
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
          </div>
          <div className="mt-[16px] flex-1">
            {list.map((item, index) => {
              return (
                <div className="flex items-center mb-[16px]" key={index + "r"}>
                  <UserPrice></UserPrice>
                  <div className="ml-[32px]">
                    {index % 2 == 0 ? (
                      <Button
                        hideBottomBackground={true}
                        active={false}
                        width="113px"
                        height="40px"
                        text={"0 Polls"}
                        color={"#fff"}
                        normalBackGround={"#0D0D0D"}
                        borderRadius="27px"
                        border="none"
                        buttonClick={() => {
                          console.log("click");
                        }}
                      >
                        <Image
                          src={loveWhiteIcon}
                          alt=""
                          width={20}
                          height={20}
                        ></Image>
                      </Button>
                    ) : (
                      <Button
                        hideBottomBackground={true}
                        active={false}
                        width="113px"
                        height="40px"
                        text={"24 Polls"}
                        color={"#0D0D0D"}
                        normalBackGround={"#00FC6E"}
                        borderRadius="27px"
                        border="none"
                        buttonClick={() => {
                          console.log("click");
                        }}
                      >
                        <Image
                          src={loveBlackIcon}
                          alt=""
                          width={20}
                          height={20}
                        ></Image>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
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

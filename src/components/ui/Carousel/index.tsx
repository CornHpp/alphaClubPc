import React, { useEffect } from "react";
import { Carousel } from "antd";

import Danmu from "./danmu";
import Live from "./live";
import CardBeginView from "./begin";
import AudioCard from "./audioCard";
import nothingIcon from "@/assets/home/nothingIcon.svg";
import { getPersonTradeList } from "@/api/model/profile";
import Image from "next/image";
import { utcToLocal } from "@/lib/util";

interface CarouselProps {
  // Define your props here
  onOpenEventPopup: () => void;
  item: PartialGetAllHomeType;
  houseId?: string;
}

const CarouselView: React.FC<CarouselProps> = (props) => {
  const { onOpenEventPopup, item, houseId } = props;
  const carouseRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const onChange = (val: number) => {
    setCurrentSlide(val);
    if (val !== currentSlide) {
      (carouseRef?.current as any).next();
    }
    console.log(val);
    if (val !== currentSlide && val == 1) {
      // getPersonTradeListFunc();
    }
  };

  const [isShowDanmu, setIsShowDanmu] = React.useState<boolean>(false);

  const [isHaveList, setIsHaveList] = React.useState<boolean>(false);

  const [isHaveAudio, setIsHaveAudio] = React.useState<boolean>(false);

  //
  useEffect(() => {
    if (item.audioEventDomain || item.tradeHistoryDomains) {
      setIsHaveList(true);
      if (item.audioEventDomain) {
        setIsHaveAudio(true);
      }
    } else {
      // const params = {
      //   pageNum: queryParams.pageNum,
      //   pageSize: queryParams.pageSize,
      //   houseId: houseId,
      // };
      // getPersonTradeList(params).then((res) => {
      //   console.log(res);
      //   console.log(res);
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const [showDanmuList, setShowDanmuList] = React.useState<
    PartialGetTradeListType[]
  >([]);

  const queryParams = {
    pageNum: 1,
    pageSize: 50,
  };

  const getPersonTradeListFunc = async () => {
    const params = {
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize,
      houseId: houseId,
    };
    const res = await getPersonTradeList(params);
    console.log(res);
    let { pageList = [], count = 0 } = res.result;
    if (!pageList) pageList = [];
    const newCardList = [...showDanmuList, ...(pageList ? pageList : [])];
    setShowDanmuList(newCardList);
  };

  return (
    <div className="w-full px-[16px] py-[16px] ">
      <div className="border-[2px] border-[#0D0D0D] border-solid overflow-hidden rounded-[10px] w-full h-[129px]">
        {isHaveList ? (
          <Carousel ref={carouseRef} dots={false}>
            {isHaveAudio && (
              <div
                className="w-full rounded-[10px] bg-[#fff] h-[129px] px-[10px] py-[10px] cursor-pointer"
                onClick={() => {
                  console.log("click");
                  onOpenEventPopup();
                }}
              >
                {item.audioEventDomain && (
                  <AudioCard
                    id={item?.audioEventDomain?.id}
                    time={utcToLocal(item?.audioEventDomain?.showTime)}
                    audioUrl={item?.audioEventDomain?.fileUrl as string}
                    audioSource={item?.audioEventDomain.source}
                    title={item.audioEventDomain.title}
                    audioDuration={item.audioEventDomain.audioDuration}
                    descr={item.audioEventDomain.descr}
                  ></AudioCard>
                )}
              </div>
            )}
            {item.tradeHistoryDomains && (
              <div className="w-full rounded-[10px] bg-[#E9E9E9] h-[129px] block overflow-hidden">
                {item && <Danmu lists={item.tradeHistoryDomains}></Danmu>}
              </div>
            )}
          </Carousel>
        ) : (
          <div className="overflow-hidden rounded-[10px] w-full h-[129px] flex flex-col items-center justify-center font-semibold text-[14px]">
            <Image
              src={nothingIcon}
              alt=""
              className="w-[64px] h-[64px]"
              width={64}
              height={64}
            ></Image>
            Uh, there’s nothing here.
          </div>
        )}
      </div>
      {item.audioEventDomain && item.tradeHistoryDomains ? (
        <div className=" flex w-full justify-center mt-[6px] cursor-pointer">
          <div
            className="w-[14px] h-[5px]  rounded-[16px] "
            onClick={() => onChange(0)}
            style={{
              width: currentSlide === 0 ? "14px" : "10px",
              background: currentSlide === 0 ? "#0D0D0D" : "none",
              border: currentSlide === 0 ? "none" : "2px solid #0D0D0D",
            }}
          ></div>
          <div
            className="w-[10px] h-[5px]  rounded-[16px] ml-[3px] "
            onClick={() => onChange(1)}
            style={{
              width: currentSlide === 1 ? "14px" : "10px",
              background: currentSlide === 1 ? "#0D0D0D" : "none",
              border: currentSlide === 1 ? "none" : "2px solid #0D0D0D",
            }}
          ></div>
        </div>
      ) : (
        <div className="mt-[12px]"></div>
      )}
    </div>
  );
};

interface ButtonProps {
  onClick?: () => void;
  text?: string;
  background?: string;
  children?: React.ReactNode;
}

export const SmallButton: React.FC<ButtonProps> = (props) => {
  const { onClick, text, background, children } = props;
  return (
    <div
      className="h-[16px] border-[1px] px-[8px] border-[#0D0D0D] text-[11px] rounded-[8px] flex items-center justify-center font-medium"
      style={{
        background: background,
      }}
    >
      {children} {text}
    </div>
  );
};

export default CarouselView;

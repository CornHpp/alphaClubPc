import React, { useCallback, useEffect } from "react";
import DanmuButton from "../danmuButton";
import "./index.css";
import DanmuButtonCards from "../danmuButtonCards";

interface RollProps {
  leftOrRight: boolean; // true: left, false: right
  isCardsDanmu?: boolean;
  danmuList: PartialGetTradeListType[];
}

const Roll: React.FC<RollProps> = ({
  leftOrRight,
  isCardsDanmu,
  danmuList,
}) => {
  const [danmuLeft, setDanmuLeft] = React.useState<number>(0); // 弹幕的整体宽度

  const startRoll = () => {};

  return (
    <div
      className="absolute flex "
      id="danmu"
      style={{
        left: danmuLeft + "px",
        top: isCardsDanmu ? "7px" : "4px",
      }}
    >
      <div
        className={`${
          leftOrRight ? "scrollLeft" : "scrollRight"
        }  flex  relative`}
      >
        {danmuList?.length &&
          danmuList.map((item, index) => {
            return (
              <div
                key={index + "s"}
                className="flex-shrink-0 mr-[8px] cursor-pointer"
              >
                {isCardsDanmu ? (
                  <DanmuButtonCards item={item}></DanmuButtonCards>
                ) : (
                  <DanmuButton></DanmuButton>
                )}
              </div>
            );
          })}
      </div>
      <div
        className={`${
          leftOrRight ? "scrollLeft" : "scrollRight"
        }  flex relative`}
      >
        {danmuList?.length &&
          danmuList.map((item, index) => {
            return (
              <div key={index + "s"} className="flex-shrink-0 mr-[8px]">
                {isCardsDanmu ? (
                  <DanmuButtonCards item={item}></DanmuButtonCards>
                ) : (
                  <DanmuButton></DanmuButton>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Roll;

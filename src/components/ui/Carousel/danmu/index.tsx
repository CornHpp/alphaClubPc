import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import DanmuButton from "@/components/custom/danmuButton";
import Roll from "@/components/custom/roll";
import { getPersonTradeList } from "@/api/model/profile";

interface Props {
  lists: PartialGetTradeListType[];
}

const Danmu: React.FC<Props> = (props) => {
  const { lists } = props;

  return (
    <div className="w-full h-full">
      <div className="h-[50%]  relative flex items-center">
        <Roll
          isCardsDanmu={false}
          top={"16px"}
          danmuList={lists}
          leftOrRight={true}
        ></Roll>
      </div>
      <div className="h-[50%] relative">
        <Roll
          isCardsDanmu={false}
          top={"6px"}
          danmuList={lists}
          leftOrRight={false}
        ></Roll>
      </div>
    </div>
  );
};

export default React.memo(Danmu);

import React from "react";
import Image from "next/image";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";

interface Props {
  // Add your props here
}

const TradeView: React.FC<Props> = () => {
  // Add your component logic here
  const [lists, setLists] = React.useState([{}, {}]);
  return (
    <div className="border-[2px] min-w-[355px] rounded-[16px] h-[227px] border-[#0D0D0D] border-solid  px-[16px] py-[16px] bg-white">
      <div className="text-[20px] font-bold">Trade</div>

      <div className="mt-[12px]">
        {lists.map((item, index) => {
          return (
            <div className="flex w-full justify-between items-center mb-[16px]">
              <div className="flex items-center">
                <Image
                  src={defaultHeaderIcon}
                  alt=""
                  width={32}
                  height={32}
                ></Image>
                <div className="ml-[4px] ">
                  <div className="text-[#004D22] text-[12px]">
                    kent bought <span className="font-semibold">0.01</span> key
                  </div>
                  <div className="text-[#005A0E] text-[16px] font-semibold">
                    0.42 ETH
                  </div>
                </div>
              </div>
              <div className=""></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TradeView;

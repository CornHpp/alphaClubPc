import React from "react";
import { SmallButton } from "..";
import Image from "next/image";
import audioIcon from "@/assets/home/audio.svg";
import machine from "@/assets/home/machine.svg";
import person from "@/assets/home/person.svg";
import stopWatchIcon from "@/assets/home/stopwatchIcon.svg";
import playIcon from "@/assets/home/playIcon.svg";
interface CarouselProps {
  // Define your component props here
}

const AudioCard: React.FC<CarouselProps> = () => {
  return (
    <div>
      <div className="flex">
        <SmallButton text="LIVE" background="#00FC6E">
          <Image
            src={audioIcon}
            alt=""
            width={13.5}
            height={10}
            className="w-[13.5px] h-[10px] mr-[3px]"
          ></Image>
        </SmallButton>
        <div className="ml-[6px]">
          <SmallButton text="GAME" background="#FFDCFB">
            <Image
              src={machine}
              alt=""
              width={12}
              height={12}
              className="w-[12px] h-[12px] mr-[3px]"
            ></Image>
          </SmallButton>
        </div>
      </div>

      <div className="text-[18px] font-semibold mt-[2px]">voice note no.12</div>

      <div className="flex mt-[2px] items-center">
        <Image
          className="mr-[2px]"
          src={stopWatchIcon}
          alt=""
          width={12}
          height={12}
        ></Image>

        <div className="text-[11px] font-medium text-[#0D0D0D]">03′ 35″</div>
      </div>

      <div className="mt-[10px] flex items-center">
        <div className="mr-[12]"></div>
        <Image
          className="mr-[2px]"
          src={playIcon}
          alt=""
          width={32}
          height={32}
        ></Image>
      </div>
    </div>
  );
};

export default AudioCard;

import React from "react"
import { SmallButton } from ".."
import Image from "next/image"
import audioIcon from "@/assets/home/audio.svg"
import machine from "@/assets/home/machine.svg"
import person from "@/assets/home/person.svg"
interface CarouselProps {
  // Define your component props here
}

const Live: React.FC<CarouselProps> = () => {
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

      <div className="text-[18px] font-semibold mt-[2px]">
        Let&apos;s play Snake together!
      </div>

      <div className="flex mt-[2px] items-center">
        <Image
          src={person}
          alt=""
          width={12}
          height={12}
          className="w-[12px] h-[12px] mr-[2px] "
        ></Image>
        <div className="text-[11px] font-medium text-[#0D0D0D]">
          <span className="text-[#000000] font-SemiBold">32 </span>users are
          playing
        </div>
      </div>
    </div>
  )
}

export default Live

import React from "react"
import { SmallButton } from ".."
import Image from "next/image"
import bell from "@/assets/home/bell.svg"
import radio from "@/assets/home/radio.svg"
import person from "@/assets/home/person.svg"

interface CarouselProps {
  // Add your props here
}

const CardBeginView: React.FC<CarouselProps> = (props) => {
  return (
    <div className="">
      <div className="flex">
        <SmallButton text="Begins at 10:20 am" background="#FFFFFF">
          <Image
            src={bell}
            alt=""
            width={12}
            height={12}
            className="w-[12px] h-[12px] mr-[3px] mt-[-1px]"
          ></Image>
        </SmallButton>
        <div className="ml-[6px]">
          <SmallButton text="VOICE" background="#FFFFB3">
            <Image
              src={radio}
              alt=""
              width={12}
              height={12}
              className="w-[12px] h-[12px] mr-[3px]"
            ></Image>
          </SmallButton>
        </div>
      </div>

      <div className="text-[18px] font-semibold mt-[2px]">
        Bull is back, wen lambo?
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

export default CardBeginView

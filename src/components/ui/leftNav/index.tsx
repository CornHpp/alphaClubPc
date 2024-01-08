"use client"

import React from "react"
import Image from "next/image"
import logo from "@/assets/home/logo.png"
import Button from "@/components/custom/button"
import smallHouse from "@/assets/home/smallHouse.svg"
import key from "@/assets/home/key.svg"

interface LeftNavProps {
  // Add any props you need for your component here
}

const buttonLists = [
  {
    img: smallHouse,
    text: "Clubs",
  },
  {
    img: key,
    text: "Keys",
  },
]

const LeftNav: React.FC<LeftNavProps> = () => {
  const [buttonActive, setButtonActive] = React.useState(0)
  return (
    <div className="w-[244px]  flex flex-col items-center">
      <Image
        src={logo}
        alt=""
        width={104}
        height={69}
        className="w-[104px] h-[69px] mt-[13px]"
      ></Image>

      <div className="mt-[18px] border-[2px] border-[#0D0D0D] border-solid w-[180px] h-[744px] rounded-[12px] flex flex-col items-center py-[24px] bg-[white]">
        {buttonLists.map((item, index) => {
          return (
            <div key={index + "11"} className="mb-[24px]">
              <Button
                active={buttonActive === index ? true : false}
                width="146px"
                height="58px"
                text={item.text}
                background="linear-gradient(180deg, #DFDFDF 0%, #F5F5F5 100%)"
                borderRadius="16px"
                border="2px solid #0D0D0D"
                buttonClick={() => {
                  setButtonActive(index)
                }}
              >
                <Image
                  src={item.img}
                  alt=""
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px]"
                ></Image>
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LeftNav

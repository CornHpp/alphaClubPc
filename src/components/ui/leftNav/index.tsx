"use client"

import React from "react"
import Image from "next/image"
import logo from "@/assets/home/logo.svg"
import Button from "@/components/custom/button"
import smallHouse from "@/assets/home/smallHouse.svg"
import key from "@/assets/home/key.svg"
import leftBg from "@/assets/home/leftBG.svg"
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
    <div
      className=" mt-[16px]  relative"
      style={{
        height: "calc(100vh - 32px)",
      }}
    >
      <Image
        src={leftBg}
        alt=""
        className="w-[244px] h-[76px] absolute top-[-1px] left-[-2px] z-[110]"
        width={244}
        height={76}
        style={{
          left: "0px",
          top: "0",
        }}
      ></Image>

      <Image
        src={logo}
        alt=""
        width={104}
        height={69}
        className="w-[104px] h-[69px]  absolute left-[48px] top-[16px] z-[120]"
      ></Image>

      <div className="absolute top-0 right-0 w-[120px] h-[76px] bg-[#fbf5f2]"></div>

      <div
        className="h-full flex flex-col pb-[16px]
        pl-[24px]
        border-[2px] border-[#0D0D0D] border-solid 
        pt-[100px]
        z-[120]
        "
        style={{
          height: "calc(100vh - 32px)",
          width: "244px",
          borderTop: "none",
          borderRight: "none",
          borderRadius: "16px 0 0 16px",
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #F0EBE8 0%, #ECECEC 100%)",
        }}
      >
        <div className=" flex-1 border-[2px] border-[#0D0D0D] border-solid w-[180px]  rounded-[12px] flex flex-col items-center py-[24px] bg-[white]">
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
    </div>
  )
}

export default LeftNav

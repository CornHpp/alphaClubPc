"use client"
import React from "react"
import Image from "next/image"
import LeftNav from "@/components/ui/leftNav"
import Header from "@/components/ui/header"
import homeBackground from "@/assets/home/homeBg.svg"
import starIcon from "@/assets/home/star.svg"
import Tabs from "@/components/custom/tabs"
import Card from "@/components/ui/card"
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg"

const homeBg = "/homeBg.svg"

const tabsList = [
  {
    text: "Tab1",
    img: "",
  },
  {
    text: "Tab2",
    img: "",
  },
  {
    text: "Tab3",
    img: "",
  },
]
const Home: React.FC = () => {
  const [tabsActive, setTabsActive] = React.useState(0)

  const [cardList, setCardList] = React.useState([
    {
      userInfo: {
        username: "username",
        avatar: defaultHeaderIcon,
        followers: 100,
      },
    },
  ])
  return (
    <div className="flex px-[16px] py-[16px] relative">
      <LeftNav></LeftNav>

      <div
        className="flex-1 flex flex-col "
        style={{
          height: "calc(100vh - 32px)",
        }}
      >
        <Header></Header>

        <div className=" flex pt-[18px] h-[76px]">
          <div className="text-[32px] font-bold mr-[3px]">
            Pick Clubs To Join In!
          </div>
          <Image
            src={starIcon}
            alt=""
            width={29}
            height={26}
            className="w-[29px] h-[26[x]"
          ></Image>
        </div>

        <div className="pt-[4px] h-[36px]">
          <Tabs
            tabList={tabsList}
            activeIndex={tabsActive}
            tabClick={(val) => {
              setTabsActive(val)
            }}
          ></Tabs>
        </div>

        <div className="pt-[16px] flex flex-wrap flex-1 overflow-y-scroll">
          {cardList.map((item, index) => {
            return (
              <div key={index + "r"}>
                <Card item={item}></Card>
              </div>
            )
          })}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-[100%] h-[868px] px-[16px] py-[16px] z-[-1]">
        {/* <Image src={homeBackground} alt="" className="w-[100%]"></Image> */}
        {/* <div
          style={{
            backgroundImage: `url(${homeBg})`,
            backgroundSize: "100% 100%", // 设置宽度和高度为100%
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "868px",
          }}
        ></div> */}
      </div>
    </div>
  )
}

export default Home

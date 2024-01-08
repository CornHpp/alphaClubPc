import React from "react"

interface listType {
  text: string
  img: string
}
interface TabsProps {
  tabList: listType[]
  tabClick: (index: number) => void
  activeIndex: number
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { tabList, tabClick, activeIndex } = props
  const handleClickTabs = (index: number) => {
    tabClick(index)
  }
  return (
    <div className="flex items-center">
      {tabList.map((item, index) => {
        return (
          <div
            key={index + "f"}
            onClick={() => {
              handleClickTabs(index)
            }}
            className="w-[68px] h-[28px] border-[2px] rounded-[16px] text-[16px] font-medium flex items-center justify-center mr-[4px] cursor-pointer"
            style={{
              border: activeIndex === index ? "2px solid #0D0D0D" : "none",
              color: activeIndex === index ? "#0D0D0D" : "#404140",
              background: activeIndex === index ? "#00FC6E" : "none",
            }}
          >
            {item.text}
          </div>
        )
      })}
    </div>
  )
}

export default Tabs

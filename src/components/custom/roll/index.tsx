import React, { useCallback, useEffect } from "react"
import DanmuButton from "../danmuButton"
import "./index.css"

interface RollProps {
  leftOrRight: boolean // true: left, false: right
}

const Roll: React.FC<RollProps> = ({ leftOrRight }) => {
  const [danmuList, setDanmuList] = React.useState([{}, {}, {}, {}, {}, {}])

  const [danmuLeft, setDanmuLeft] = React.useState<number>(0) // 弹幕的整体宽度

  const startRoll = () => {}

  return (
    <div
      className="absolute flex "
      id="danmu"
      style={{
        left: danmuLeft + "px",
        top: "4px",
      }}
    >
      <div
        className={`${
          leftOrRight ? "scrollLeft" : "scrollRight"
        }  flex mr-[8px]`}
      >
        {danmuList.map((item, index) => {
          return (
            <div key={index + "s"} className="flex-shrink-0 ml-[8px]">
              <DanmuButton></DanmuButton>
            </div>
          )
        })}
      </div>
      <div className={`${leftOrRight ? "scrollLeft" : "scrollRight"}  flex `}>
        {danmuList.map((item, index) => {
          return (
            <div key={index + "s"} className="flex-shrink-0 ml-[8px]">
              <DanmuButton></DanmuButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Roll

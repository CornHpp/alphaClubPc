import React from "react"
import Image from "next/image"
import DanmuButton from "@/components/custom/danmuButton"
import Roll from "@/components/custom/roll"

interface Props {
  // Define your component props here
}

const Danmu: React.FC<Props> = () => {
  return (
    <div className="w-full h-full">
      <div className="h-[50%] pt-[4px] relative">
        <Roll danmuList={[]} leftOrRight={true}></Roll>
      </div>
      <div className="h-[50%] relative">
        <Roll danmuList={[]} leftOrRight={false}></Roll>
      </div>
    </div>
  )
}

export default Danmu

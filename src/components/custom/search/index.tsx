"use client"

import React, { useState } from "react"
import searchIcon from "@/assets/home/searchIcon.svg"
import Image from "next/image"

interface Props {
  // Add your component props here
  rightNode?: React.ReactNode
  width?: number
  height?: number
  placeholder?: string
}

const Search: React.FC<Props> = (props) => {
  const {
    rightNode,
    width = 300,
    height = 44,
    placeholder = "Search Whatever You Like",
  } = props
  const [search, setSearch] = useState("")
  return (
    <div className=" relative">
      <input
        value={search}
        style={{
          width: width + "px",
          height: height + "px",
        }}
        className="w-[300px] h-[44px] rounded-[24px]  pl-[16px] pr-[44px] border-[#0D0D0D] border-solid border-[2px]
        focus:shadow-[0px_0px_16px_#00FC6E]
        "
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      {rightNode ? (
        <div
          className=" absolute  right-[10px] cursor-pointer
          top-1/2 transform -translate-y-1/2

          "
        >
          {rightNode}
        </div>
      ) : (
        <Image
          src={searchIcon}
          width={32}
          height={32}
          alt=""
          className="w-[32px] h-[32px] absolute  right-[10px] cursor-pointer
          top-1/2 transform -translate-y-1/2
          "
          onClick={() => {
            console.log(search)
          }}
        ></Image>
      )}
    </div>
  )
}

export default Search

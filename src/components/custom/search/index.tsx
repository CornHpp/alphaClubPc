"use client"

import React, { useState } from "react"
import searchIcon from "@/assets/home/searchIcon.png"
import Image from "next/image"

interface Props {
  // Add your component props here
}

const Search: React.FC<Props> = () => {
  const [search, setSearch] = useState("")
  return (
    <div className=" relative">
      <input
        value={search}
        className="w-[300px] h-[44px] rounded-[24px] pl-[16px] pr-[44px] border-[#0D0D0D] border-solid border-[2px]"
        placeholder="Search Whatever You Like"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <Image
        src={searchIcon}
        width={32}
        height={32}
        alt=""
        className="w-[32px] h-[32px] absolute top-[6px] right-[10px] cursor-pointer"
        onClick={() => {
          console.log(search)
        }}
      ></Image>
    </div>
  )
}

export default Search

import React from "react"
import PopupView from "../popup"
import ETHIcon from "@/assets/popup/ETH.svg"
import Image from "next/image"
import Button from "@/components/custom/button"
import Search from "@/components/custom/search"

interface Props {
  // Define your component props here
  showPopupBuy: boolean
  setShowPopupBuy: (showPopupBuy: boolean) => void
}

const BuyPopupView: React.FC<Props> = ({ setShowPopupBuy, showPopupBuy }) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0)
  return (
    <PopupView
      showPopup={showPopupBuy}
      handleCancel={() => {
        setShowPopupBuy(false)
        setSelectedPrice(0)
      }}
    >
      <div className="">
        <div className="font-medium text-[14px]">Room Price</div>
        <div className="flex mt-[4px] font-semibold text-[24px]">
          <Image src={ETHIcon} alt="" width={24} height={24}></Image>
          0.074ETH
        </div>
        <div className="mt-[16px]">Price Formula</div>

        <div className="mt-[4px]">
          <Button
            hideBottomBackground={true}
            active={false}
            width="323px"
            height="50px"
            text={"0.001"}
            normalBackGround={selectedPrice === 1 ? "#00FC6E" : "#fff"}
            borderRadius="27px"
            border="2px solid #0D0D0D"
            buttonClick={() => {
              setSelectedPrice(1)
            }}
          ></Button>
        </div>
        <div className="mt-[12px]">
          <Button
            hideBottomBackground={true}
            active={false}
            width="323px"
            height="50px"
            text={"0.01"}
            normalBackGround={selectedPrice === 2 ? "#00FC6E" : "#fff"}
            borderRadius="27px"
            border="2px solid #0D0D0D"
            buttonClick={() => {
              setSelectedPrice(2)
            }}
          ></Button>
        </div>
        <div className="mt-[12px]">
          <Button
            hideBottomBackground={true}
            active={false}
            width="323px"
            height="50px"
            text={"0.1"}
            normalBackGround={selectedPrice === 3 ? "#00FC6E" : "#fff"}
            borderRadius="27px"
            border="2px solid #0D0D0D"
            buttonClick={() => {
              console.log("click")
              setSelectedPrice(3)
            }}
          ></Button>
        </div>
        <div className="mt-[12px]">
          <Search
            width={323}
            height={50}
            placeholder="min 0.001"
            rightNode={<div className="text-[16px] font-medium">Key</div>}
          ></Search>
        </div>

        <div className="mt-[24px]">
          <Button
            hideBottomBackground={true}
            active={false}
            width="323px"
            height="50px"
            text={
              <div className="flex flex-col items-center">
                <div className="text-[18px] text-[#949694] leading-[24px]">
                  Buy
                </div>
                {selectedPrice ? (
                  <div className="text-[12px] text-[#00FC6E] leading-[16px]">
                    2.51 ETH ($2800.3)
                  </div>
                ) : (
                  <div className={`text-[12px] text-[#949694] leading-[16px]`}>
                    0.00 ETH
                  </div>
                )}
              </div>
            }
            normalBackGround={selectedPrice ? "#0D0D0D" : "#E9E9E9"}
            borderRadius="27px"
            border="none"
            buttonClick={() => {
              console.log("click")
            }}
          ></Button>
        </div>
      </div>
    </PopupView>
  )
}

export default BuyPopupView
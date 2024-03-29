import treasureIcon from "@/assets/airdrop/treasureIcon.svg";
import smileyFaceIcon from "@/assets/airdrop/smileyFaceIcon.svg";
import Image from "next/image";
import closeIcon from "@/assets/popup/close.svg";
import closeHover from "@/assets/popup/closeHover.svg";
import { Player } from "@lottiefiles/react-lottie-player";
import transureOne from "@/lib/animation/TreasureOnce.json";
import TreasureInimm from "@/lib/animation/TreasureInimm.json";

import React from "react";
interface Props {
  handleCancel?: () => void;
  showPopup?: boolean;
  scores?: number;
}
const OpenTreasure: React.FC<Props> = (props) => {
  const [hoverCloseImage, setHoverCloseImage] = React.useState(false);
  const { showPopup, scores } = props;
  console.log("scores", scores);
  return (
    <>
      {showPopup && (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center z-[9998] text-[20px] bg-[rgba(0, 0, 0, 0.3)] w-[100%] h-[100%]"
          style={{
            background: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <div className="flex flex-col items-center justify-center rounded-[8px] p-[12px] text-[#fff] relative">
            <Player
              loop={false}
              autoplay
              keepLastFrame
              src={transureOne}
              style={{ width: "280px", height: "186px" }}
              className="absolute top-[12px] left-[48px] z-[9999]"
            ></Player>

            <Player
              loop
              autoplay
              keepLastFrame
              src={TreasureInimm}
              style={{ width: "280px", height: "186px" }}
            ></Player>
            <div className="text-[16px]">
              You{"'"}re one of a kind，just like these{" "}
              <span className="text-[28px] text-[#00FC6E] font-bold">
                {scores}
              </span>{" "}
              points
            </div>
            <div className="text-[#FFF96D] text-[16px] flex items-center">
              Let{"'"}s cheer for you!
              <Image
                src={smileyFaceIcon}
                alt=""
                width={20}
                height={20}
                className="ml-[4px]"
              ></Image>
            </div>

            <div className="absolute right-[48px] top-[18px] z-[100001]">
              {hoverCloseImage ? (
                <Image
                  src={closeHover}
                  alt=""
                  width={38}
                  height={37}
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setHoverCloseImage(true);
                  }}
                  onClick={props.handleCancel}
                  onMouseLeave={() => {
                    setHoverCloseImage(false);
                  }}
                ></Image>
              ) : (
                <Image
                  src={closeIcon}
                  alt=""
                  width={38}
                  height={37}
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setHoverCloseImage(true);
                  }}
                  onMouseLeave={() => {
                    setHoverCloseImage(false);
                  }}
                ></Image>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenTreasure;

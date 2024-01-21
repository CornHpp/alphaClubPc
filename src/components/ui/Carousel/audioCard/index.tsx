import React from "react";
import { SmallButton } from "..";
import Image from "next/image";
import audioIcon from "@/assets/home/audio.svg";
import machine from "@/assets/home/machine.svg";
import person from "@/assets/home/person.svg";

import PlayAudio from "@/components/custom/playAudio";
import AudioPlayer from "@/components/custom/audioPlayer";

interface CarouselProps {
  // Define your component props here
}

const AudioCard: React.FC<CarouselProps> = () => {
  const [shortAudio, setShortAudio] = React.useState<boolean>(true);
  return (
    <div>
      <div className="flex">
        <SmallButton text="LIVE" background="#00FC6E">
          <Image
            src={audioIcon}
            alt=""
            width={13.5}
            height={10}
            className="w-[13.5px] h-[10px] mr-[3px]"
          ></Image>
        </SmallButton>
        <div className="ml-[6px]">
          <SmallButton text="GAME" background="#FFDCFB">
            <Image
              src={machine}
              alt=""
              width={12}
              height={12}
              className="w-[12px] h-[12px] mr-[3px]"
            ></Image>
          </SmallButton>
        </div>
      </div>

      <div className="text-[18px] font-semibold mt-[2px]">voice note no.12</div>

      {shortAudio ? (
        <PlayAudio></PlayAudio>
      ) : (
        <AudioPlayer
          src="/demo.wav"
          onPlay={(e) => console.log("onPlay")}
        ></AudioPlayer>
      )}
    </div>
  );
};

export default AudioCard;

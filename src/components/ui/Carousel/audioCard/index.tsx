import React from "react";
import { SmallButton } from "..";
import Image from "next/image";
import audioIcon from "@/assets/home/audio.svg";
import machine from "@/assets/home/machine.svg";
import person from "@/assets/home/person.svg";
import volumeIcon from "@/assets/home/volumeIcon.svg";
import timeIcon from "@/assets/popup/timeIcon.svg";
import PlayAudio from "@/components/custom/playAudio";
import AudioPlayer from "@/components/custom/audioPlayer";

interface CarouselProps {
  time: string | undefined;
  audioUrl: string;
  audioSource: number;
  title?: string;
}

const AudioCard: React.FC<CarouselProps> = (props) => {
  const {
    time = "2024.01.04",
    audioUrl = "/demo.wav",
    audioSource,
    title,
  } = props;
  return (
    <div>
      <div className="flex">
        <SmallButton
          text={audioSource === 0 ? "SHORT" : "LOING"}
          background="#FFFFB3"
        >
          <Image
            src={volumeIcon}
            alt=""
            width={12}
            height={12}
            className="w-[12px] h-[12px] mr-[3px]"
          ></Image>
        </SmallButton>
        <div className="ml-[6px]">
          <SmallButton text={time} background="#fff">
            <Image
              src={timeIcon}
              alt=""
              width={12}
              height={12}
              className="w-[12px] h-[12px] mr-[3px]"
            ></Image>
          </SmallButton>
        </div>
      </div>

      <div className="text-[18px] font-semibold mt-[2px]">{title}</div>

      {audioSource === 0 ? (
        <PlayAudio src={audioUrl}></PlayAudio>
      ) : (
        <AudioPlayer
          src={audioUrl}
          onPlay={(e) => console.log("onPlay")}
        ></AudioPlayer>
      )}
    </div>
  );
};

export default AudioCard;

import React from "react";
import { SmallButton } from "..";
import Image from "next/image";
import audioIcon from "@/assets/home/audio.svg";
import machine from "@/assets/home/machine.svg";
import person from "@/assets/home/person.svg";
import radioIcon from "@/assets/profile/radioIcon.svg";
import volumeIcon from "@/assets/home/volumeIcon.svg";
import timeIcon from "@/assets/popup/timeIcon.svg";
import PlayAudio from "@/components/custom/playAudio1";
import AudioPlayer from "@/components/custom/audioPlayer";
import deleteIcon from "@/assets/popup/deleteIcon.svg";
import earphoneIcon from "@/assets/profile/earphoneIcon.svg";
import { Tooltip } from "antd";

interface CarouselProps {
  time: string | undefined;
  audioUrl: string;
  audioSource: number;
  title?: string;
  audioDuration?: number;
  id: number | undefined;
  readedUserCount?: number;
  handleClickDelete?: (id: number | undefined) => void;
  showDeleteIcon?: boolean;
  desc?: string;
}

const AudioCard: React.FC<CarouselProps> = (props) => {
  const {
    time = "2024.01.04",
    audioUrl = "/demo.wav",
    audioSource,
    title,
    audioDuration,
    id,
    readedUserCount,
    handleClickDelete,
    showDeleteIcon = false,
    desc,
  } = props;
  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex">
            <SmallButton
              text={audioSource === 0 ? "SHORT" : "LONG"}
              background={audioSource === 0 ? "#FFFFB3" : "#B4FFB3"}
            >
              <Image
                src={audioSource === 0 ? volumeIcon : radioIcon}
                alt=""
                width={12}
                height={12}
                className="w-[12px] h-[12px] mr-[3px]"
              ></Image>
            </SmallButton>
            <div className="ml-[6px]">
              <SmallButton text={time.slice(0, 11)} background="#fff">
                <Image
                  src={timeIcon}
                  alt=""
                  width={12}
                  height={12}
                  className="w-[12px] h-[12px] mr-[3px]"
                ></Image>
              </SmallButton>
            </div>
            {/* <div className="ml-[6px]">
              <SmallButton text={readedUserCount?.toString()} background="#fff">
                <Image
                  src={earphoneIcon}
                  alt=""
                  width={12}
                  height={12}
                  className="w-[12px] h-[12px] mr-[3px]"
                ></Image>
              </SmallButton>
            </div> */}
          </div>

          {showDeleteIcon && (
            <div
              className="cursor-pointer"
              onClick={() => {
                handleClickDelete && handleClickDelete(id);
              }}
            >
              <Image src={deleteIcon} alt="" width={16} height={16}></Image>
            </div>
          )}
        </div>
        {title && title.length > 25 ? (
          <Tooltip placement="top" title={title} className=" cursor-pointer">
            <div className="text-[18px] font-semibold mt-[2px] overflow-hidden text-ellipsis whitespace-nowrap w-[95%]">
              {title}
            </div>
          </Tooltip>
        ) : (
          <div className="text-[18px] font-semibold mt-[2px] overflow-hidden text-ellipsis whitespace-nowrap w-[95%]">
            {title}
          </div>
        )}
        {desc ? (
          <div className="text-[14px] text-[#404140] mt-[2px] overflow-hidden text-ellipsis whitespace-nowrap w-[95%]">
            {desc}
          </div>
        ) : (
          <>{audioSource != 0 && <div className="h-[20px]">{desc}</div>}</>
        )}

        {audioSource === 0 ? (
          <PlayAudio
            id={id as number}
            audioDuration={audioDuration}
            src={audioUrl}
          ></PlayAudio>
        ) : (
          <AudioPlayer
            id={id as number}
            isProfile={false}
            audioDuration={audioDuration}
            src={audioUrl}
          ></AudioPlayer>
        )}
      </div>
    </>
  );
};

export default AudioCard;

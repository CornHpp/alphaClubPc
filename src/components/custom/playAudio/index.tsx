import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Image from "next/image";
import playIcon from "@/assets/home/playIcon.svg";
import stopIcon from "@/assets/home/stopIcon.svg";
import stopWatchIcon from "@/assets/home/stopWatchIcon.svg";
import audioWaveSurfer from "@/assets/home/audioWaveSurfer.svg";

import "./index.css";
import { audioQueryAccess } from "@/api/model/audio";

interface PlayAudioProps {
  shortAudio?: boolean;
  audioDuration?: number;
  id: number;
  src: string;
}

let wavesurfer: any;
let timer: any;
const PlayAudio: React.FC<PlayAudioProps> = (props) => {
  const { shortAudio = false, src, audioDuration, id } = props;
  const [playStatus, setPlayStatus] = React.useState(1);

  const [audioStatus, setAudioStatus] = React.useState(1); // 1: 隐藏 2: 播放
  let [wavesurfer, setWaveSurfer] = useState<any>();

  const waveContentId = useRef<HTMLDivElement>(null);

  let [audioSrc, setAudioSrc] = React.useState("");

  const createWaveSurfer = () => {
    // Create an instance of WaveSurfer
    if (wavesurfer) {
      wavesurfer.destroy();
    }

    if (!waveContentId.current || !audioSrc) return;
    wavesurfer = WaveSurfer.create({
      container: waveContentId.current,
      waveColor: "#949694",
      progressColor: "##FFFFB3",
      url: audioSrc,
      // url: "/demo.wav",
      barGap: 2,
      barRadius: 4,
      barWidth: 2,
      barHeight: 1,
      height: 30,
      cursorColor: "#FF4141",
      cursorWidth: 2,
      dragToSeek: true,
    });

    wavesurfer.on("timeupdate", () => {});
  };

  useEffect(() => {
    if (audioSrc) {
      createWaveSurfer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc]);

  const clickPlayAudio = () => {
    audioQueryAccess(id).then((res) => {
      console.log("res", res);

      const newSrc = src + "?" + res.result;
      console.log(src);
      console.log("newSrc", newSrc);
      audioSrc = newSrc;
      setAudioSrc(newSrc);
    });
    // wavesurfer.playPause();
  };

  const clickPlayStop = () => {
    // wavesurfer.playPause();
  };

  return (
    <>
      <div className="flex mt-[2px] items-center">
        <Image
          className="mr-[2px]"
          src={stopWatchIcon}
          alt=""
          width={12}
          height={12}
        ></Image>

        <div className="text-[11px] font-medium text-[#0D0D0D]">
          {audioDuration} {"'"}s
        </div>
      </div>

      <div className="w-full  mt-[11px] flex items-center justify-between">
        <div
          id="container"
          ref={waveContentId}
          className="w-[85%] flex-shrink-0 h-[32px] rounded-[6px] border-[1px] border-solid border-[#0D0D0D] bg-[#E9E9E9] mr-[12px]"
          style={
            {
              // display: audioStatus === 1 ? "none" : "block",
            }
          }
        ></div>
        <div
          className="flex-1 flex-shrink-0 h-[32px] rounded-[6px] border-[1px] border-solid border-[#0D0D0D] bg-[#E9E9E9] mr-[12px] flex items-center justify-center"
          style={
            {
              // display: audioStatus === 2 ? "none" : "flex",
            }
          }
        >
          <Image src={audioWaveSurfer} alt="" width={234} height={22}></Image>
        </div>
        {playStatus === 1 ? (
          <Image
            src={playIcon}
            alt=""
            width={32}
            height={32}
            className="cursor-pointer"
            onClick={() => {
              clickPlayAudio();
              setPlayStatus(2);
            }}
          ></Image>
        ) : (
          <Image
            src={stopIcon}
            alt=""
            width={32}
            height={32}
            className="cursor-pointer"
            onClick={() => {
              clickPlayStop();
              setPlayStatus(1);
            }}
          ></Image>
        )}
      </div>
    </>
  );
};

export default PlayAudio;

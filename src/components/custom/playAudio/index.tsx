import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import Image from "next/image";
import playIcon from "@/assets/home/playIcon.svg";
import stopIcon from "@/assets/home/stopIcon.svg";
import stopWatchIcon from "@/assets/home/stopWatchIcon.svg";

import "./index.css";

interface PlayAudioProps {
  shortAudio?: boolean;
  src: string;
}

let wavesurfer: any;
let timer: any;
const PlayAudio: React.FC<PlayAudioProps> = (props) => {
  const [playStatus, setPlayStatus] = React.useState(1);
  const [countTime, setCountTime] = React.useState<number | string>(0);

  useEffect(() => {
    const createWaveSurfer = () => {
      // Create an instance of WaveSurfer
      if (wavesurfer) {
        wavesurfer.destroy();
      }
      wavesurfer = WaveSurfer.create({
        container: "#container",
        waveColor: "#949694",
        progressColor: "##FFFFB3",
        url: props.src,
        barGap: 2,
        barRadius: 4,
        barWidth: 2,
        barHeight: 1,
        height: 30,
        cursorColor: "#FF4141",
        cursorWidth: 2,
        dragToSeek: true,
      });

      wavesurfer.on("timeupdate", () => {
        // const currentTime = wavesurfer.getCurrentTime();
        // if (timer) return;
        // timer = setTimeout(() => {
        //   // console.log("currentTime", currentTime);
        //   setCountTime((val) => {
        //     const time = Number(val) - currentTime;
        //     console.log("time", time);
        //     clearTimeout(timer);
        //     timer = null;
        //     return time;
        //   });
        // }, 1000);
      });

      wavesurfer.on("ready", () => {
        const alltime = wavesurfer.getDuration();
        setCountTime(alltime.toFixed(2));
      });
    };

    createWaveSurfer();
  }, [props.src]);

  const clickPlayAudio = () => {
    wavesurfer.playPause();
  };

  const clickPlayStop = () => {
    wavesurfer.playPause();
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
          {countTime}
        </div>
      </div>

      <div className="mt-[11px] flex items-center">
        <div
          id="container"
          className="w-[259px] flex-shrink-0 h-[32px] rounded-[6px] border-[1px] border-solid border-[#0D0D0D] bg-[#E9E9E9] mr-[12px]"
        ></div>
        {playStatus === 1 ? (
          <Image
            src={playIcon}
            alt=""
            width={32}
            height={32}
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

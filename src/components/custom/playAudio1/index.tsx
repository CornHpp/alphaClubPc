import React, { use, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Image from "next/image";
import playIcon from "@/assets/home/playIcon.svg";
import stopIcon from "@/assets/home/stopIcon.svg";
import stopWatchIcon from "@/assets/home/stopWatchIcon.svg";
import audioWaveSurfer from "@/assets/home/audioWaveSurfer.svg";

import "./index.css";
import { audioQueryAccess } from "@/api/model/audio";
import Toaster from "../Toast";

interface PlayAudioProps {
  shortAudio?: boolean;
  src: string;
  audioDuration?: number;
  id: number;
}

const PlayAudio: React.FC<PlayAudioProps> = (props) => {
  // Create an instance of WaveSurfer

  let [wavesurfer, setWaveSurfer] = useState<any>();

  const { shortAudio = false, src, audioDuration, id } = props;
  const [playStatus, setPlayStatus] = React.useState(1);

  const [audioStatus, setAudioStatus] = React.useState(1); // 1: 隐藏 2: 播放

  const waveContentId = useRef<HTMLDivElement>(null);

  const createWaveSurfer = (waveContentId: any, audioUrl: string) => {
    if (wavesurfer) {
      wavesurfer.destroy();
    }

    if (!waveContentId) return;

    const currentWaveSurfer = WaveSurfer.create({
      container: waveContentId,
      waveColor: "#949694",
      progressColor: "##FFFFB3",
      url: audioUrl,
      barGap: 2,
      barRadius: 4,
      barWidth: 2,
      barHeight: 1,
      height: 30,
      cursorColor: "#FFC700",
      cursorWidth: 2,
      dragToSeek: true,
    });

    // 监听结束事件
    currentWaveSurfer.on("finish", () => {
      setPlayStatus(1);
    });
    wavesurfer = currentWaveSurfer;
    setWaveSurfer(currentWaveSurfer);
  };

  const [cacheAudioUrl, setCacheAudioUrl] = React.useState("");

  const clickPlayAudio = () => {
    if (cacheAudioUrl) {
      setTimeout(() => {
        wavesurfer.playPause();
        setPlayStatus(2);
      }, 500);
      return;
    }
    audioQueryAccess(id)
      .then((res) => {
        console.log(res);
        if (res.code == "200") {
          setAudioStatus(2);
          setPlayStatus(2);
          const newSrc = src + "?" + res.result;
          createWaveSurfer(waveContentId.current, newSrc);
          setCacheAudioUrl(newSrc);
          setTimeout(() => {
            wavesurfer.playPause();
          }, 500);
        } else {
          Toaster.error("Cards not enough!");
        }
      })
      .catch((err) => {
        Toaster.error("Cards not enough!");
      });
  };

  const clickPlayStop = () => {
    wavesurfer.playPause();
    setPlayStatus(1);
  };

  const waveRef = useRef<HTMLDivElement>(null);

  const createAudioBars = () => {
    if (waveRef.current == null) return;
    const container = waveRef.current;
    const containerWidth = container?.clientWidth; // 获取容器宽度
    container.innerHTML = ""; // 清空容器
    const barCount = Math.floor(containerWidth / 6); // 计算音频条数量，这里假设每个音频条的最小宽度为 10px
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement("div");
      bar.classList.add("audio-bar");
      container.appendChild(bar);
    }
  };

  useEffect(() => {
    window.onresize = function () {
      createAudioBars();
    };
    createAudioBars();

    return () => {
      window.onresize = null;
      wavesurfer?.destroy();
    };
  }, [wavesurfer]);

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
          ref={waveContentId}
          className="flex-1 flex-shrink-0 h-[32px] rounded-[6px] border-[1px] border-solid border-[#0D0D0D] bg-[#E9E9E9] mr-[12px]"
          style={{
            display: audioStatus === 1 ? "none" : "block",
          }}
        ></div>
        <div
          ref={waveRef}
          className="flex-1 flex-shrink-0 h-[32px] rounded-[6px] border-[1px] border-solid border-[#0D0D0D] bg-[#E9E9E9] mr-[12px] flex items-center
           justify-around px-[8px]"
          style={{
            display: audioStatus === 2 ? "none" : "flex",
          }}
        >
          {/* <Image src={audioWaveSurfer} alt="" width={234} height={22}></Image> */}
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
            }}
          ></Image>
        )}
      </div>
    </>
  );
};

export default PlayAudio;

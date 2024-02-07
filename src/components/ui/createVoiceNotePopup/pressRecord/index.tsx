// Record plugin

import { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "node_modules/wavesurfer.js/dist/plugins/record.esm.js";
import Image from "next/image";
import voicePlayIcon from "@/assets/home/voicePlayIcon.svg";
import voicePlayIcon2 from "@/assets/popup/voicePlayIcon2.svg";
import voicePlayIcon3 from "@/assets/popup/voicePlayIcon3.svg";
import "./index.css";

import React from "react";

interface PressRecordProps {
  // Add props here
  toFatherAudioFile: (audioUrl: FormData, audioDuration: number) => void;
}

let wavesurfer: any, record: any;
let audioContext: any;

const PressRecord: React.FC<PressRecordProps> = (props) => {
  const { toFatherAudioFile } = props;
  const [recordStatus, setRecordStatus] = React.useState(1);

  const [showPlayOrShowStopIcon, setShowPlayOrShowStopIcon] =
    React.useState(true);

  useEffect(() => {
    const createWaveSurfer = () => {
      if (wavesurfer) {
        wavesurfer.destroy();
      }
      wavesurfer = WaveSurfer.create({
        container: "#mic",
        waveColor: "#949694",
        progressColor: "##FFFFB3",
        barGap: 2,
        barRadius: 4,
        barWidth: 2,
        barHeight: 1,
        height: 76,
        dragToSeek: true,
      });
      wavesurfer.on("click", () => {
        wavesurfer.play();
      });

      // Initialize the Record plugin
      record = wavesurfer.registerPlugin(
        RecordPlugin.create({
          scrollingWaveform: true,
          renderRecordedAudio: true,
        })
      );
      // Render recorded audio
      record.on("record-end", (blob: any) => {
        const audioDuration = wavesurfer.getDuration();
        const formData = new FormData();

        let timestamp = new Date().getTime().toString(); // 获取当前时间戳
        let random = Math.random().toString(36).substring(2, 8); // 生成随机字符串

        let randomString = timestamp + "_" + random; // 组合时间戳和随机字
        formData.append("file", blob, `${randomString}.mp4`);
        toFatherAudioFile(formData, audioDuration);

        const recordedUrl = URL.createObjectURL(blob);

        // Create wavesurfer from the recorded audio
        audioContext = WaveSurfer.create({
          container: "#recordings",
          waveColor: "#949694",
          progressColor: "#000000",
          url: recordedUrl,
          height: 76,
          barGap: 3,
          barWidth: 2,
          cursorColor: "#FFC700",
          cursorWidth: 2,
        });
      });

      record.on("record-progress", (time: number) => {
        updateProgress(time);
      });
    };

    const progress = document.querySelector(
      "#progress"
    ) as HTMLParagraphElement;
    const updateProgress = (time: number) => {
      // time will be in milliseconds, convert it to mm:ss format
      const formattedTime = [
        Math.floor((time % 3600000) / 60000), // minutes
        Math.floor((time % 60000) / 1000), // seconds
      ]
        .map((v) => (v < 10 ? "0" + v : v))
        .join(":");
      progress.textContent = formattedTime;
    };

    const pauseButton = document.querySelector("#pause") as HTMLButtonElement;
    if (pauseButton) {
      pauseButton.onclick = () => {
        if (record.isPaused()) {
          record.resumeRecording();
          pauseButton.textContent = "Pause";
          return;
        }

        record.pauseRecording();
        pauseButton.textContent = "Resume";
      };
    }

    createWaveSurfer();
  }, [toFatherAudioFile]);

  const clickStartRecording = () => {
    record.startRecording().then(() => {
      setRecordStatus(2);
    });
  };

  const clickPulseRecording = () => {
    console.log(record);
    record.pauseRecording();
    setRecordStatus(3);
  };

  const clickContinueRecording = () => {
    record.resumeRecording();
    setRecordStatus(2);
  };

  const clickStopAndPlay = () => {
    record.stopRecording();
    setRecordStatus(4);
  };

  const clickPlay = () => {
    audioContext.playPause();
    setShowPlayOrShowStopIcon(false);
  };

  const clickPlayStop = () => {
    audioContext.playPause();
    setShowPlayOrShowStopIcon(true);
  };

  return (
    <div className="mt-[16px]">
      <div
        id="mic"
        className={`w-[368px] h-[80px] rounded-[10px] border-[2px] border-solid border-[#0D0D0D] bg-[#E9E9E9] ${
          recordStatus == 4 ? "disableRecording" : ""
        }`}
      ></div>
      <div
        id="recordings"
        className={`w-[368px] h-[80px] rounded-[10px] border-[2px] border-solid border-[#0D0D0D]  bg-[#E9E9E9] overflow-hidden} 
        ${recordStatus != 4 ? "disableRecording" : ""}
        `}
        style={{
          marginTop: "1rem 0",
        }}
      ></div>
      <div className="mt-[4px] w-full justify-between flex text-[12px]">
        <div>00:00:00</div>
        <p id="progress">00:00</p>
      </div>

      {recordStatus == 1 && (
        <div
          onClick={clickStartRecording}
          className="mt-[8px] mx-auto w-[144px] h-[48px] border-[2px] border-solid border-[#0D0D0D] rounded-[24px] flex items-center justify-center text-[18px] cursor-pointer"
        >
          <div className="w-[20px] h-[20px] border-[2px] border-solid border-[#0D0D0D]  bg-[#FF4141] rounded-[50%] mr-[2px]"></div>
          Recording
        </div>
      )}
      {recordStatus == 2 && (
        <div
          onClick={clickPulseRecording}
          className=" cursor-pointer mt-[8px] mx-auto w-[144px] h-[48px] border-[2px] border-solid border-[#0D0D0D] rounded-[24px] flex items-center justify-center text-[18px]"
        >
          <Image
            src={voicePlayIcon}
            alt=""
            width={20}
            height={20}
            className="mr-[4px]"
          ></Image>
          Pulse
        </div>
      )}
      {recordStatus == 3 && (
        <div className="mt-[8px] mx-auto w-full flex justify-center">
          <Image
            src={voicePlayIcon2}
            alt=""
            width={48}
            height={48}
            className="mr-[12px] cursor-pointer"
            onClick={clickStopAndPlay}
          ></Image>
          <div
            onClick={clickContinueRecording}
            className="w-[135px] h-[48px] border-[2px] border-solid border-[#0D0D0D] rounded-[24px] flex items-center justify-center text-[18px] cursor-pointer"
          >
            <div className="w-[20px] h-[20px] border-[2px] border-solid border-[#0D0D0D]  bg-[#FF4141] rounded-[50%] mr-[2px]"></div>
            Continue
          </div>
        </div>
      )}
      {recordStatus == 4 && (
        <>
          <div className="mt-[8px] mx-auto w-full flex justify-center">
            {showPlayOrShowStopIcon ? (
              <Image
                src={voicePlayIcon2}
                alt=""
                width={48}
                height={48}
                className="mr-[12px] cursor-pointer"
                onClick={clickPlay}
              ></Image>
            ) : (
              <Image
                src={voicePlayIcon3}
                alt=""
                width={48}
                height={48}
                className="mr-[12px] cursor-pointer"
                onClick={clickPlayStop}
              ></Image>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PressRecord;

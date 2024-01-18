import React, { useEffect, useState } from "react";
import { ReactMic } from "react-mic";
import Image from "next/image";
import voicePlayIcon from "@/assets/home/voicePlayIcon.svg";
import voicePlayIcon2 from "@/assets/popup/voicePlayIcon2.svg";
import LoadAudio from "@/components/custom/loadAudio";

interface AudioEditProps {
  // Add props here
}

const AudioEdit: React.FC<AudioEditProps> = (props) => {
  // Add component logic here
  const [tempFile, setTempFile] = React.useState<any>();
  const [record, setRecord] = useState(false);
  const startRecording = () => {
    setTempFile(null);
    setRecord(true);
  };

  const onStop = (recordedBlob: any) => {
    console.log("recordedBlob is: ", recordedBlob);
    const index = recordedBlob.blobURL.indexOf("blob:");
    const audioUrl = recordedBlob.blobURL.slice(index + 5);
    setTempFile(recordedBlob.blobURL);
  };

  const onData = (recordedBlob: any) => {
    // console.log("chunk of real-time data is: ", recordedBlob);
  };

  return (
    <div>
      <div className="mt-[16px] w-full h-[80px]">
        <div className="relative w-[368px] h-[80px] bg-[#E9E9E9] rounded-[10px] ">
          {tempFile ? (
            <LoadAudio tempFileUrl={tempFile}></LoadAudio>
          ) : (
            <ReactMic
              record={record}
              visualSetting={"frequencyBars"}
              onStop={onStop}
              onData={onData}
              className="w-[368px] h-[80px] rounded-[10px] border-[2px] border-solid border-[#0D0D0D]"
              strokeColor="grey"
              backgroundColor="#E9E9E9"
            />
          )}
        </div>
      </div>

      <div className="mt-[8px]  w-full h-[32px]">
        <div className="relative w-[368px] h-[32px] bg-[#E9E9E9] rounded-[6px]">
          <ReactMic
            record={record}
            visualSetting={"frequencyBars"}
            onStop={onStop}
            onData={onData}
            className="w-[368px] h-[32px] rounded-[6px] border-[2px] border-solid border-[#0D0D0D]"
            strokeColor="grey"
            backgroundColor="#E9E9E9"
          />
        </div>
      </div>

      <div className="mt-[4px] w-full justify-between flex text-[12px]">
        <div>00:00:00</div>
        <div>10:00:00</div>
      </div>

      {!record && (
        <div
          onClick={() => {
            startRecording();
          }}
          className="mt-[8px] mx-auto w-[144px] h-[48px] border-[2px] border-solid border-[#0D0D0D] rounded-[24px] flex items-center justify-center text-[18px] cursor-pointer"
        >
          <div className="w-[20px] h-[20px] border-[2px] border-solid border-[#0D0D0D]  bg-[#FF4141] rounded-[50%] mr-[2px]"></div>
          Recording
        </div>
      )}

      {record && (
        <div
          onClick={() => {
            setRecord(false);
          }}
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

      {/* <div className="mt-[8px] mx-auto w-full flex justify-center">
        <Image
          src={voicePlayIcon2}
          alt=""
          width={48}
          height={48}
          className="mr-[12px]"
        ></Image>
        <div className="w-[135px] h-[48px] border-[2px] border-solid border-[#0D0D0D] rounded-[24px] flex items-center justify-center text-[18px]">
          <div className="w-[20px] h-[20px] border-[2px] border-solid border-[#0D0D0D]  bg-[#FF4141] rounded-[50%] mr-[2px]"></div>
          Continue
        </div>
      </div> */}
    </div>
  );
};

export default AudioEdit;

import React, { useEffect } from "react";
import type { UploadFile, UploadProps } from "antd";
import { message, Progress, Upload } from "antd";
import cloudUploadIcon from "@/assets/popup/cloudUploadIcon.svg";
import Image from "next/image";
import fileMusicIcon from "@/assets/popup/fileMusicIcon.svg";
import deleteIcon from "@/assets/popup/deleteIcon.svg";
import { audioCreate, audioUpload } from "@/api/model/audio";
import Toaster from "@/components/custom/Toast";

import "./index.css";

interface uploadProps {
  setUrltoParent: (url: string) => void;
  setAudioDuration: (duration: number) => void;
}

const { Dragger } = Upload;

const DragUpload: React.FC<uploadProps> = (props) => {
  const { setUrltoParent, setAudioDuration } = props;
  const [files, setFiles] = React.useState<any>([]);
  const [fileName, setFileName] = React.useState("");
  const [percent, setPercent] = React.useState(0);
  let [isHasFile, setIshasFile] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const startProgress = () => {
    const timer = setInterval(() => {
      setPercent((pre) => {
        if (pre >= 95) {
          clearInterval(timer);
          if (isHasFile) {
            setUploading(false);
            return 100;
          }
          return 95;
        }
        return pre + 5;
      });
    }, 100);
  };

  useEffect(() => {
    if (isHasFile) {
      setPercent(100);
    }
  }, [isHasFile]);

  const getAudioLength = (audioFile: File | undefined) => {
    if (!audioFile) return;
    // 创建一个新的音频元素
    const audio = new Audio();
    audio.src = URL.createObjectURL(audioFile);
    // 监听 loadedmetadata 事件，获取音频长度
    audio.addEventListener("loadedmetadata", () => {
      // 获取音频长度（以秒为单位）
      const lengthInSeconds = Number(audio.duration.toFixed(2));
      console.log("lengthInSeconds", lengthInSeconds);
      setAudioDuration(lengthInSeconds);
    });
  };

  const uploadAttruite: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,

    beforeUpload: (file) => {
      const { type } = file;

      console.log(file);

      setPercent(0);
      return false;
    },
    accept: ".mp3,.wav,.m4a",
    onChange(info) {
      const { status, type } = info.file;

      console.log(type);
      if (
        type !== "audio/mpeg" &&
        type !== "audio/x-m4a" &&
        type !== "audio/wav"
      ) {
        setFiles([]);
        Toaster.error("Please upload an audio");
        return;
      }
      if (status === "removed") {
        return;
      }

      setFiles([info.file]);

      setFileName(info.file.name);
      if (status !== "uploading") {
        startProgress();
        setUploading(true);

        console.log(info.file, info.fileList);
        const fileList = info.fileList;
        const formdata = new FormData();
        fileList.forEach((file) => {
          if (file?.originFileObj) {
            formdata.append("file", file?.originFileObj);
          }
        });

        getAudioLength(info.fileList[0].originFileObj);
        audioUpload(formdata).then((res) => {
          console.log("res", res);
          isHasFile = true;
          setIshasFile(true);
          setUrltoParent(res.result);
        });
      }
    },
    onRemove: (file) => {
      console.log("remove", file);
      setPercent(0);
      isHasFile = false;
      setIshasFile(false);
      setFiles([]);

      setUrltoParent("");
      return true;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    fileList: files,
    itemRender: (
      originNode,
      file,
      currFileList,
      actions: {
        remove: (file: UploadFile<any>) => void;
      }
    ) => {
      return (
        <div className="ml-[9px] h-[100px] flex flex-col justify-center">
          <div className="flex w-[200px]  justify-between">
            <div className="flex items-center">
              <Image
                src={fileMusicIcon}
                alt=""
                width={20}
                height={20}
                className="mr-[2px]"
              ></Image>
              {fileName}
            </div>
            <Image
              src={deleteIcon}
              alt=""
              className="cursor-pointer"
              onClick={() => {
                actions.remove(file);
                setUrltoParent("");
              }}
              width={20}
              height={20}
            ></Image>
          </div>
          <div className="w-[200px]  h-[8px] mt-[8px] ">
            {/* <div className="w-[20%]  bg-[#00FC6E] h-[8px] absolute left-[0px] top-[-1px] border-[1px] rounded-[8px] border-[#0D0D0D]"></div> */}
            <Progress
              percent={percent}
              showInfo={false}
              strokeColor="#00FC6E"
            />
          </div>
          <div className="flex justify-end w-full mt-[10px]">{percent}%</div>
        </div>
      );
    },
  };

  return (
    <div className={uploading ? "selfSttyle" : ""}>
      <Dragger {...uploadAttruite}>
        <div className="flex flex-col justify-center items-center">
          <Image src={cloudUploadIcon} alt="" width={32} height={32}></Image>
          <div className="font-semibold text-[#656765] text-[14px]">
            {uploading ? "Uploading..." : "Drag Or Browse"}
          </div>
          {!uploading && (
            <div className="text-[11px] text-[#949694]">
              support: wav.mp3.m4a
            </div>
          )}
        </div>
      </Dragger>
    </div>
  );
};

export default DragUpload;

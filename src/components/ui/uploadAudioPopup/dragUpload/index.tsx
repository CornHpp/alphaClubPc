import React from "react";
import type { UploadFile, UploadProps } from "antd";
import { message, Progress, Upload } from "antd";
import cloudUploadIcon from "@/assets/popup/cloudUploadIcon.svg";
import Image from "next/image";
import fileMusicIcon from "@/assets/popup/fileMusicIcon.svg";
import deleteIcon from "@/assets/popup/deleteIcon.svg";
import { audioCreate, audioUpload } from "@/api/model/audio";

import "./index.css";

interface uploadProps {
  setUrltoParent: (url: string) => void;
}

const { Dragger } = Upload;

const DragUpload: React.FC<uploadProps> = (props) => {
  const { setUrltoParent } = props;
  const [files, setFiles] = React.useState([null]);
  const [fileName, setFileName] = React.useState("");
  const [percent, setPercent] = React.useState(0);
  let isHasFile = false;
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

  const uploadAttruite: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,

    beforeUpload: (file) => {
      setPercent(0);
      return false;
    },
    accept: ".mp3,.wav",
    onChange(info) {
      const { status } = info.file;

      if (status === "removed") {
        return;
      }

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
        audioUpload(formdata).then((res) => {
          console.log("res", res);
          isHasFile = true;
          setUrltoParent(res.result);
        });
      }
    },
    onRemove: (file) => {
      console.log("remove", file);
      setPercent(0);
      isHasFile = false;
      setUrltoParent("");
      return true;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
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
            <div className="text-[11px] text-[#949694]">support: wav. mp3.</div>
          )}
        </div>
      </Dragger>
    </div>
  );
};

export default DragUpload;

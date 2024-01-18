import React from "react";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import cloudUploadIcon from "@/assets/popup/cloudUploadIcon.svg";
import Image from "next/image";
import fileMusicIcon from "@/assets/popup/fileMusicIcon.svg";
import deleteIcon from "@/assets/popup/deleteIcon.svg";
import "./index.css";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  itemRender: (originNode, file, currFileList) => {
    console.log("file", file);
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
            File name
          </div>
          <Image src={deleteIcon} alt="" width={20} height={20}></Image>
        </div>
        <div className="w-full bg-[#E9E9E9] border-[1px] border-[#0D0D0D] h-[8px] mt-[8px] rounded-[8px] relative">
          <div className="w-[20%]  bg-[#00FC6E] h-[8px] absolute left-[0px] top-[-1px] border-[1px] rounded-[8px] border-[#0D0D0D]"></div>
        </div>
        <div className="flex justify-end w-full">48%</div>
      </div>
    );
  },
};

const DragUpload: React.FC = () => (
  <Dragger {...props}>
    <div className="flex flex-col justify-center items-center">
      <Image src={cloudUploadIcon} alt="" width={32} height={32}></Image>
      <div className="font-semibold text-[#656765] text-[14px]">
        Drag Or Browse
      </div>
      <div className="text-[11px] text-[#949694]">support: wav. mp3.</div>
    </div>
  </Dragger>
);

export default DragUpload;

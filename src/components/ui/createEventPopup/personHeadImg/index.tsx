import React from "react";
import Image from "next/image";
import defaultHeaderIcon from "@/assets/home/defaultHeaderIcon.svg";
import trashIcon from "@/assets/popup/trashIcon.svg";
interface PersonHeadImgProps {
  // Define your props here
  onClickDelete: () => void;
}

const PersonHeadImg: React.FC<PersonHeadImgProps> = (props) => {
  const { onClickDelete } = props;
  // Implement your component logic here
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  return (
    <div
      className="w-[44px] h-[44px] rounded-[50%] items-center justify-center flex mr-[8px] flex-shrink-0 relative"
      onMouseEnter={() => {
        setIsMouseOver(true);
      }}
      onMouseLeave={() => {
        console.log("up");
        setIsMouseOver(false);
      }}
    >
      <Image
        className=" cursor-pointer"
        src={defaultHeaderIcon}
        alt=""
        width={44}
        height={44}
      ></Image>

      {isMouseOver && (
        <div
          className="absolute left-0 top-0 w-full h-full items-center flex justify-center bg-[] rounded-[50%] cursor-pointer"
          style={{
            background: "rgba(13, 13, 13, 0.6)",
          }}
          onClick={() => {
            onClickDelete();
          }}
        >
          <Image src={trashIcon} alt="" width={16} height={16}></Image>
        </div>
      )}
    </div>
  );
};

export default PersonHeadImg;

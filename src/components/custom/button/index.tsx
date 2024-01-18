import React from "react";

interface ButtonProps {
  text: string | React.ReactNode;
  width?: string;
  height?: string;
  border?: string;
  borderRadius?: string;
  background?: string;
  normalBackGround?: string;
  color?: string;
  active?: boolean;
  children?: React.ReactNode;
  fontSize?: string;
  buttonClick: () => void;
  hideBottomBackground?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    text,
    width,
    height,
    borderRadius,
    border,
    buttonClick,
    background,
    normalBackGround = "#fff",
    fontSize,
    active,
    color,
    children,
    hideBottomBackground,
    onMouseEnter,
    onMouseLeave,
  } = props;

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="absolute z-[9]"
        style={{
          left: active ? "-2px" : "2px",
          top: active ? "-2px" : "2px",
          width: width,
          height: height,
          borderRadius: borderRadius,
          background: "#0D0D0D",
          display: hideBottomBackground ? "none" : "block",
        }}
      ></div>
      <div
        className="cursor-pointer flex items-center justify-center relative z-10"
        onClick={buttonClick}
        style={{
          width: width,
          height: height,
          border: border,
          borderRadius: borderRadius,
          background: active ? background : normalBackGround,
          color: color,
        }}
      >
        {children && <div className="mr-[2px]">{children}</div>}
        <span
          className="relative z-11"
          style={{
            fontWeight: active ? "700" : "600",
            fontSize: fontSize || "16px",
          }}
        >
          {text}
          {active && (
            <span className="inline-block w-[100%] h-[6px] bg-[#00FC6E] absolute left-[1px] bottom-[3px] z-[-1]"></span>
          )}
        </span>
      </div>
    </div>
  );
};

export default Button;

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
  disabled?: boolean;
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
    disabled,
  } = props;

  return (
    <div
      className="relative"
      style={{
        width: width,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!disabled && (
        <div
          className="absolute z-[9]"
          style={{
            left: active ? "-2px" : "2px",
            top: active ? "-2px" : "2px",
            width: "100%",
            height: height,
            borderRadius: borderRadius,
            background: "#0D0D0D",
            display: hideBottomBackground ? "none" : "block",
          }}
        ></div>
      )}

      <div
        className="cursor-pointer flex items-center justify-center relative z-10"
        onClick={() => !disabled && buttonClick()}
        style={{
          width: "100%",
          height: height,
          border: border,
          borderRadius: borderRadius,
          background: disabled
            ? "#E9E9E9"
            : active
            ? background
            : normalBackGround,
          color: disabled ? "#0D0D0D" : color,
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

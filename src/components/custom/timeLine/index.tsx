import { Tooltip } from "antd";
import React, { useEffect } from "react";
import "./index.css";

interface TimeLineProps {
  // Add your props here
  onSelectPrice: (val: number) => void;
}

const TimeLine: React.FC<TimeLineProps> = (props) => {
  const { onSelectPrice } = props;
  const [currentStep, setCurrentStep] = React.useState(0);

  return (
    <div className="w-[327px] h-[64px] flex justify-between relative cursor-pointer items-center">
      <div
        className="absolute top-[31px] left-0 h-[2px] bg-[#0D0D0D] z-[-1]"
        style={{
          width: `calc(327px * (${currentStep} / 4))`,
        }}
      ></div>
      <div
        className="absolute top-[31px] left-0 h-[2px] bg-[#D3D3D3] z-[-2]"
        style={{
          width: "327px",
        }}
      ></div>

      <div className="mt-[20px]">
        <Cricle
          includeActive={currentStep >= 0}
          active={currentStep == 0}
          percent={0}
          onCricleClick={() => {
            setCurrentStep(0);
            onSelectPrice(0);
          }}
        ></Cricle>
        <div className="text-[12px] leading-[18px] mt-[2px] font-medium">0</div>
      </div>
      <div>
        <Cricle
          includeActive={currentStep >= 1}
          active={currentStep == 1}
          percent={25}
          onCricleClick={() => {
            onSelectPrice(0.25);
            setCurrentStep(1);
          }}
        ></Cricle>
      </div>

      <div>
        <Cricle
          includeActive={currentStep >= 2}
          active={currentStep == 2}
          percent={50}
          onCricleClick={() => {
            onSelectPrice(0.5);

            setCurrentStep(2);
          }}
        ></Cricle>
      </div>

      <div>
        <Cricle
          includeActive={currentStep >= 3}
          active={currentStep == 3}
          onCricleClick={() => {
            onSelectPrice(0.75);

            setCurrentStep(3);
          }}
          percent={75}
        ></Cricle>
      </div>

      <div className="relative">
        <Cricle
          includeActive={currentStep >= 4}
          active={currentStep == 4}
          onCricleClick={() => {
            onSelectPrice(1);

            setCurrentStep(4);
          }}
          percent={100}
        ></Cricle>
        <div className="text-[12px] mt-[2px] leading-[18px] font-medium float-right absolute top-[6px] right-0">
          100%
        </div>
      </div>
    </div>
  );
};

interface CricleProps {
  active: boolean;
  includeActive?: boolean;
  percent?: number;
  onCricleClick?: () => void;
}

export const Cricle: React.FC<CricleProps> = ({
  active,
  onCricleClick,
  includeActive,
  percent,
}) => {
  return (
    <>
      {active ? (
        <Tooltip title={`${percent}%`} trigger="click" open={active}>
          <div
            onClick={onCricleClick}
            className="w-[8px] h-[8px] rounded-full bg-[#00FC6E] border-[2px]  border-solid relative"
            style={{
              background: active && includeActive ? "#00FC6E" : "#fff",
              borderColor: active || includeActive ? "#0D0D0D" : "#D3D3D3",
            }}
          ></div>
        </Tooltip>
      ) : (
        <div
          onClick={onCricleClick}
          className="w-[8px] h-[8px] rounded-full bg-[#00FC6E] border-[2px]  border-solid relative"
          style={{
            background: active && includeActive ? "#00FC6E" : "#fff",
            borderColor: active || includeActive ? "#0D0D0D" : "#D3D3D3",
          }}
        ></div>
      )}
    </>
  );
};

export default TimeLine;

import { DotLoading } from "antd-mobile";

interface Props {
  loadingText?: string;
}
const Loading: React.FC<Props> = (props) => {
  const { loadingText = "loading..." } = props;
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center z-[9998] text-[20px] bg-[rgba(0, 0, 0, 0.3)] w-[100%] h-[100%]">
      <div className="flex flex-col items-center justify-center rounded-[8px] p-[12px]">
        <DotLoading color="white" />
        <span className="text-[14px] text-white mt-[10px]">{loadingText}</span>
      </div>
    </div>
  );
};

export default Loading;

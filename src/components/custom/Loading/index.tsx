import { DotLoading } from "antd-mobile";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "@/lib/animation/loadingfinal.json";

interface Props {
  loadingText?: string;
}
const Loading: React.FC<Props> = (props) => {
  const { loadingText = "Loading..." } = props;
  return (
    <div
      className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center z-[9998] text-[20px] bg-[rgba(0, 0, 0, 0.3)] w-[100%] h-[100%]"
      style={{
        background: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <div
        className="w-[120px] h-[120px] bg-[#fff] flex items-center justify-center broder-solid border-[2px] border-[#0d0d0d] rounded-[16px]
          fixed top-[48%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]
        "
      >
        <Player
          autoplay
          loop
          src={loadingAnimation}
          style={{ height: "100px", width: "100px" }}
        ></Player>
      </div>
    </div>
  );
};

export default Loading;

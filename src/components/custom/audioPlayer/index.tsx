import React, {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  MouseEvent,
} from "react";

import Image from "next/image";
import playIcon from "@/assets/home/playIcon.svg";
import stopIcon from "@/assets/home/stopIcon.svg";
// import "./Audio.css";

function transTime(value: number) {
  var time = "";
  var h = parseInt(`${value / 3600}`);
  value %= 3600;
  var m = parseInt(`${value / 60}`);
  var s = parseInt(`${value % 60}`);
  if (h > 0) {
    time = formatTime(h + ":" + m + ":" + s);
  } else {
    time = formatTime(m + ":" + s);
  }

  return time;
}

function formatTime(value: string) {
  var time = "";
  var s = value.split(":");
  var i = 0;
  for (; i < s.length - 1; i++) {
    time += s[i].length === 1 ? "0" + s[i] : s[i];
    time += ":";
  }
  time += s[i].length === 1 ? "0" + s[i] : s[i];

  return time;
}

export const Audio: React.FC<any> = (props) => {
  const { src, width = "100%", height = "30px" } = props;

  const [playStatus, setPlayStatus] = React.useState(1);

  const audioRef = useRef<HTMLAudioElement>(null);
  const barBgRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  const [toggle, setToggle] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<string>("00 : 00");
  const [currentTime, setCurrentTime] = useState<string>("00:00");

  useLayoutEffect(() => {
    if (audioRef.current && src) {
      audioRef.current.addEventListener("play", (e: Event) => {
        const pid = (e.target as HTMLAudioElement).getAttribute("pid");
        const audios = document.querySelectorAll("audio");
        console.log("pid", pid);
        audios.forEach((element, index) => {
          if (element.getAttribute("pid") === pid) return;
          element.pause();
        });
      });

      audioRef.current.addEventListener("loadedmetadata", (e) => {
        const duration = transTime(
          (e.target as HTMLAudioElement).duration as number
        );
        setDuration(duration);
      });
      audioRef.current.addEventListener("play", (_res) => {
        setToggle(false);
      });
      audioRef.current.addEventListener("pause", () => {
        setToggle(true);
      });
      audioRef.current.addEventListener("timeupdate", (e) => {
        let value =
          (e.target as HTMLAudioElement).currentTime /
          (audioRef.current as HTMLAudioElement).duration;
        setProgress(value * 100);
        setCurrentTime(transTime((e.target as HTMLAudioElement).currentTime));
        // console.log('timeupdate res', res.target.currentTime);
      });
    }
    return () => {};
  }, [src]);

  useEffect(() => {
    if (dotRef.current && src) {
      const position = {
        oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
        oriX: 0, // 移动开始时的x坐标
        maxLeft: 0, // 向左最大可拖动距离
        maxRight: 0, // 向右最大可拖动距离
      };
      let flag = false; // 标记是否拖动开始

      // 按下
      const down = (event: TouchEvent | MouseEvent) => {
        if (!audioRef.current?.paused || audioRef.current.currentTime !== 0) {
          flag = true;
          position.oriOffestLeft = dotRef.current?.offsetLeft ?? 0; // 初始位置
          position.oriX = position.oriX =
            event instanceof TouchEvent
              ? event.touches[0].clientX
              : event.clientX; // 要同时适配mousedown和touchstart事件
          position.maxLeft = position.oriOffestLeft; // 向左最大可拖动距离
          position.maxRight =
            barBgRef.current?.offsetWidth ?? 0 - position.oriOffestLeft; // 向右边最大可拖动距离

          if (event && event.preventDefault) {
            event.preventDefault();
          } else {
            (event as TouchEvent).returnValue = false;
          }

          // 禁止事件冒泡
          if (event && event.stopPropagation) {
            event.stopPropagation();
          }
        }
      };
      // 移动
      const move = (event: TouchEvent | MouseEvent) => {
        if (flag && barBgRef.current) {
          let clientX =
            event instanceof TouchEvent
              ? event.touches[0].clientX
              : event.clientX; // 要同时适配mousemove和touchmove事件

          let length = clientX - position.oriX;
          if (length > position.maxRight) {
            length = position.maxRight;
          } else if (length < -position.maxLeft) {
            length = -position.maxLeft;
          }
          // let pgsWidth = barBgRef.current?.offsetWidth;
          let pgsWidth = parseFloat(
            window.getComputedStyle(barBgRef.current).width.replace("px", "")
          );
          let rate = (position.oriOffestLeft + length) / pgsWidth;

          console.log("===", position.oriOffestLeft, length);

          console.log(
            "偏移总长比例",
            (audioRef.current as HTMLAudioElement).duration * rate,
            rate
          );
          (audioRef.current as HTMLAudioElement).currentTime =
            (audioRef.current as HTMLAudioElement).duration * rate;
        }
      };
      // 结束
      const end = () => {
        flag = false;
      };

      // 鼠标按下时
      dotRef.current.addEventListener("mousedown", down as any, false);
      dotRef.current.addEventListener("touchstart", down, false);

      // 开始拖动
      document.addEventListener("mousemove", move as any, false);
      document.addEventListener("touchmove", move, false);

      // 拖动结束
      document.addEventListener("mouseup", end, false);
      barBgRef.current?.addEventListener("touchend", end, false);
    }
  }, [src]);

  const handlePaly = () => {
    if (toggle && src) {
      audioRef.current?.play();
      return;
    }
    audioRef.current?.pause();
    return;
  };

  return (
    <>
      <audio controls={false} src={src} preload="metadata" ref={audioRef}>
        您的浏览器不支持 audio 标签
      </audio>
      <div className="flex items-center">
        <div className="">
          <div className="w-full flex justify-between  pr-[8px]">
            <div>{currentTime}</div>
            <div>{duration}</div>
          </div>
          <div className="flex items-center mt-[6px]">
            <div
              className="w-[261px] border-[1px] border-soild border-[#000] rounded-[6px] h-[6px] bg-[#E9E9E9] relative mr-[8px]"
              ref={barBgRef}
            >
              <span
                ref={dotRef}
                className="w-[4px] h-[10px] border-[1px] border-soild border-[#000] rounded-[2px] bg-[#00FC6E] inline-block absolute top-[-3px]"
                style={{ left: `${progress - 1}%` }}
              ></span>
              <div
                ref={barRef}
                className="h-[100%] bg-[#00FC6E]"
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        {toggle && src && playStatus === 1 && (
          <Image
            src={playIcon}
            alt=""
            width={32}
            height={32}
            onClick={() => {
              setPlayStatus(2);
              handlePaly();
            }}
          ></Image>
        )}
        {playStatus === 2 && (
          <Image
            src={stopIcon}
            alt=""
            width={32}
            height={32}
            onClick={() => {
              setPlayStatus(1);
              handlePaly();
            }}
          ></Image>
        )}
      </div>
    </>
  );
};

export default Audio;

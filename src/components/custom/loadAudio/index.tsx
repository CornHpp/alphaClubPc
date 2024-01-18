import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

interface LoadAudioProps {
  // Add any props you need for the component
  tempFileUrl: any;
}

const LoadAudio: React.FC<LoadAudioProps> = (props) => {
  const { tempFileUrl } = props;
  console.log("tempFileUrl", tempFileUrl);
  useEffect(() => {
    if (!tempFileUrl) return;

    const wavesurfer = WaveSurfer.create({
      // 波形图的容器
      container: "#waveform",
      // 已播放波形的颜色
      progressColor: "orange",
      // 未播放波形的颜色
      waveColor: "green",
      // 波形图的高度，单位为px
      height: 76,
      // 波形的振幅（高度），默认为1
      barHeight: 0.8,
      // 波形条的圆角
      barRadius: 2,
      // 波形条的宽度
      barWidth: 1,
      // 波形条间的间距
      barGap: 3,
      // 播放进度光标条的颜色
      cursorColor: "black",
      // 播放进度光标条的宽度，默认为1
      cursorWidth: 1,
      //  波形容器的背景颜色
      // backgroundColor: 'white',
      // 音频的播放速度
      audioRate: 1,
    });

    wavesurfer.load("http://localhost:3000/demo.wav");
  }, [tempFileUrl]);
  return (
    <div>
      <div className="w-full h-[80px] overflow-hidden" id="waveform" />
    </div>
  );
};

export default LoadAudio;

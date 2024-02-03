import React, { useRef, useImperativeHandle, useEffect } from "react";

interface audioType {
  onRef?: any;
  audioSrc: string;
  onAudioEnd: () => void;
}

export const UserIntroAudioPlay: React.FC<audioType> = (props) => {
  const { audioSrc, onRef, onAudioEnd } = props;

  const audioRef = useRef<HTMLAudioElement>(null);

  const beginPlayAudio = () => {
    audioRef.current?.play();
  };

  const pausePlayAudio = () => {
    audioRef.current?.pause();
  };
  const initAudio = () => {
    if (audioRef.current && audioSrc) {
      audioRef.current.addEventListener("ended", function () {
        onAudioEnd();
      });
    }
  };

  useEffect(() => {
    initAudio();
  }, [audioSrc]);

  useImperativeHandle(onRef, () => {
    return {
      beginPlayAudio: beginPlayAudio,
      pausePlayAudio: pausePlayAudio,
    };
  });

  return (
    <>
      <audio controls={false} src={audioSrc} preload="metadata" ref={audioRef}>
        您的浏览器不支持 audio 标签
      </audio>
    </>
  );
};

export default React.memo(UserIntroAudioPlay);

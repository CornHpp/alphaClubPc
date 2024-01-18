"use client";
import React, { useState, useRef, useEffect } from "react";
import { ReactMic } from "react-mic";
import WaveSurfer from "wavesurfer.js";

import { makeStyles } from "@material-ui/core/styles";
import MicIcon from "@material-ui/icons/Mic";
import IconButton from "@material-ui/core/IconButton";
import StopIcon from "@material-ui/icons/Stop";
import ReplayIcon from "@material-ui/icons/Replay";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { green, red, blue } from "@material-ui/core/colors";

import "./microphone.css";
import dynamic from "next/dynamic";

const useStyles = makeStyles((theme) => ({
  icon: {
    height: 38,
    width: 38,
  },
  reactmic: {
    width: "100%",
    height: 200,
  },
  wavesurfer: {
    width: "100%",
  },
  flex: {
    flex: 1,
  },
}));

export default function Microphone({ pushFile }) {
  const [record, setRecord] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [tempFile, setTempFile] = React.useState(null);

  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurfer = useRef<any>(null);

  useEffect(() => {
    if (!open || (open && !tempFile)) return;

    const wavesurfer = WaveSurfer.create({
      // 波形图的容器
      container: "#waveform",
      // 已播放波形的颜色
      progressColor: "orange",
      // 未播放波形的颜色
      waveColor: "green",
      // 波形图的高度，单位为px
      height: 200,
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
  }, [open, tempFile]);

  useEffect(() => {
    console.log("tempFile", tempFile);
    if (tempFile) {
      console.log("tempFile", tempFile);
      // wavesurfer.current.load(tempFile.blobURL);
    }
  }, [tempFile]);

  const togglePlayback = () => {
    if (!isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  };
  const stopPlayback = () => wavesurfer.current.stop();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDone = () => {
    if (tempFile) {
      pushFile(tempFile);
      setTempFile(null);
      setRecord(false);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setRecord(false);
    setTempFile(null);
    setOpen(false);
  };

  const startRecording = () => {
    setTempFile(null);
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    //console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = (recordedBlob: any) => {
    setTempFile(recordedBlob);
  };

  const classes = useStyles();

  return (
    <>
      <Grid container justify="center">
        <Grid item>
          <IconButton onClick={handleClickOpen}>
            <MicIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Grid>
      <Dialog maxWidth="sm" open={open} onClose={handleCancel}>
        <DialogTitle className={classes.flex}>Record</DialogTitle>
        <DialogContent>
          {tempFile ? (
            <div className={classes.wavesurfer} id="waveform" />
          ) : (
            <ReactMic
              record={record}
              visualSetting={"frequencyBars"}
              className={classes.reactmic}
              onStop={onStop}
              onData={onData}
              strokeColor="grey"
              backgroundColor="white"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Grid container>
            {tempFile && (
              <Grid item container justify="center" xs={12}>
                {!isPlaying ? (
                  <IconButton onClick={togglePlayback}>
                    <PlayArrowIcon className={classes.icon} />
                  </IconButton>
                ) : (
                  <IconButton onClick={togglePlayback}>
                    <PauseIcon className={classes.icon} />
                  </IconButton>
                )}
                <IconButton onClick={stopPlayback}>
                  <StopIcon className={classes.icon} />
                </IconButton>
              </Grid>
            )}
            <Grid item container justify="center" xs={12}>
              {!record && !tempFile && (
                <IconButton onClick={startRecording}>
                  <FiberManualRecordIcon
                    style={{ color: red[500] }}
                    className={classes.icon}
                  />
                </IconButton>
              )}

              {!record && tempFile && (
                <IconButton onClick={startRecording}>
                  <ReplayIcon className={classes.icon} />
                </IconButton>
              )}

              {record && (
                <IconButton onClick={stopRecording}>
                  <StopIcon className={classes.icon} />
                </IconButton>
              )}

              <IconButton onClick={handleDone}>
                <DoneIcon
                  style={tempFile && !record ? { color: green[500] } : {}}
                  className={classes.icon}
                />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CancelIcon
                  style={tempFile && !record ? { color: red[500] } : {}}
                  className={classes.icon}
                />
              </IconButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

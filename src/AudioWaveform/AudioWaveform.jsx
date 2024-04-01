import React, { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioWaveform = ({ path }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (path) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "violet",
        progressColor: "purple",
      });

      wavesurfer.current.load(path);
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [path]);

  return <div id="waveform" ref={waveformRef} />;
};

export default AudioWaveform;

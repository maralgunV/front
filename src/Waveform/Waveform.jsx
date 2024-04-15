import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ url, height, onWaveSurfer }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const onWaveSurferCalled = useRef(false);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      height: height || 150,
      width: 700,
      fillParent: true,
    });

    wavesurfer.current.on('ready', () => {
      if (!onWaveSurferCalled.current && onWaveSurfer) {
        onWaveSurfer({
          playPause: () => wavesurfer.current.playPause(),
          stop: () => wavesurfer.current.stop(),
        });
        onWaveSurferCalled.current = true; 
      }
    });

    wavesurfer.current.load(url)
      .then(() => {
        console.log('WaveSurfer has loaded the URL successfully');
      })
      .catch(e => {
        console.error('Error loading the URL:', e);
      });

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [url, height, onWaveSurfer]);
  

  return <div id="waveform" ref={waveformRef} />;
};

export default Waveform;

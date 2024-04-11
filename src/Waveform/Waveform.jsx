import React, { useEffect, useRef, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ url, height, onWaveSurfer }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const handlePlayPause = useCallback(() => {
    wavesurfer.current.playPause();
  }, []);

  const handleStart = useCallback(() => {
    wavesurfer.current.play();
    wavesurfer.current.stop();
  }, []);


  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      height: height || 150,
      width: 700,
      fillParent: true,
    });
    
    // wavesurfer.current.on('ready', () => {
    //     onWaveSurfer({
    //       playPause: () => wavesurfer.current.playPause(),
    //       stop: () => wavesurfer.current.stop(),
    //       // Additional controls can be added here
    //     });
    //   });

    // onWaveSurfer({
    //     playPause: handlePlay,
    //   });  

    wavesurfer.current.load(url).then(() => {
        console.log('WaveSurfer has loaded the URL successfully');
      }).catch(e => {
        console.error('Error loading the URL:', e);
      });

      
    return () => wavesurfer.current.destroy();
  }, [url, height, onWaveSurfer]);

  return <div id="waveform" ref={waveformRef} />;
};

export default Waveform;

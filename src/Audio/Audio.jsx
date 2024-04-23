import React, { useState, useEffect } from 'react';
import './Audio.css';
import axios from 'axios';
import Waveform from '../Waveform/Waveform';
import Dropdown from '../Dropdown/Dropdown';
import FileUploader from '../FileUploader/FileUploader';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Audio() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wavesurfer, setWaveSurfer] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [fileType, setFileType] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
    };
  }, [audioUrl]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchAudio = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/get_file?modelId=${selectedOption || '1'}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      setError('Error fetching audio: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWaveSurfer = (ws) => {
    setWaveSurfer(ws);
  };

  const handlePlayPause = () => {
    // setIsPlaying(!isPlaying);
    try {
      wavesurfer.playPause();
    } catch (error) {
      console.error('Error while pausing or playing:', error);
    }
  };

  const handleStart = () => {
    wavesurfer.stop();
  };

  const download = () => {
    if (fileType === 'wav') {
      window.open(
        `http://127.0.0.1:5001/get_file?modelId=${selectedOption || '1'}`,
        '_blank'
      );
    } else {
      window.open(
        `http://127.0.0.1:5001/get_file_zip?modelId=${selectedOption || '1'}`,
        '_blank'
      );
    }
  };

  const handleOptionChange = (selectedValue) => {
    setSelectedOption(selectedValue);
    setAudioUrl(null);
  };

  const handleFileTypeChange = (type) => {
    setFileType(type);
  };

  return (
    <div className='audio-container'>
      {/* {isLoading && <div className='loading'>Loading...</div>} */}
      {isLoading && (
        <div className='loading-overlay'>
          <div className='loading-spinner'></div>
        </div>
      )}

      {error && <div className='error'>{error}</div>}

      {/* <div className="upload">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Оруулах</button>
      </div> */}

      <FileUploader onFileTypeChange={handleFileTypeChange} />
      {/* {fileType && <p>Selected file type: {fileType}</p>} */}
      <Dropdown handleDropdownChange={handleOptionChange} />

      {response && (
        <div className='server-response'>
          <h2>Файлын хэмжээ:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      <div className='getAudio'>
        {fileType === 'wav' && (
          <button className='button' onClick={fetchAudio}>
            Файл сонсох
          </button>
        )}
        {audioUrl && (
          <Waveform
            url={audioUrl}
            height={200}
            onWaveSurfer={handleWaveSurfer}
          />
        )}
        {/* {audioUrl && ( */}
        <div>
          <button
            className={`audio-control ${isPlaying ? 'pause' : 'play'}`}
            onClick={handlePlayPause}
          ></button>
          <button
            className='audio-control start'
            onClick={handleStart}
          ></button>
        </div>
        {/* )} */}
        {/* {audioUrl && <button onClick={handlePlayPause}>Play/Pause</button>}
        {audioUrl && (
          <button onClick={handleStart}>Start from Beginning</button>
        )} */}
      </div>

      {/* <div className="getAudio">
        <button onClick={fetchAudio}>Файл сонсох</button>
        {audioUrl && <Waveform url={audioUrl} height={200} onWaveSurfer={handleWaveSurfer} />}
      </div> */}

      <div className='download'>
        {fileType && (
          <button className='button' onClick={download}>
            Файл татах
          </button>
        )}
      </div>
      {/* <ToggleSwitch></ToggleSwitch> */}
    </div>
  );
}

export default Audio;

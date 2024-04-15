import React, { useState, useEffect } from 'react';
import './Audio.css';
import axios from 'axios';
import Waveform from '../Waveform/Waveform';

function Audio() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wavesurfer, setWaveSurfer] = useState(null);

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

  const handleUpload = async () => {
    setIsLoading(true);
    if (!file) {
      setError('No file selected');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(response.data);
      setError(null);
    } catch (error) {
      setError('Upload failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAudio = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/get_file');
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
    window.open('http://127.0.0.1:5000/get_file', '_blank');
  };

  return (
    <div className="audio-container">
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <div className="upload">
        <h1>Файл оруулах</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Оруулах</button>
      </div>

      {response && (
        <div className="server-response">
          <h2>Файлын хэмжээ:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      <div className="getAudio">
        <button onClick={fetchAudio}>Файл сонсох</button>
        {audioUrl && <Waveform url={audioUrl} height={200} onWaveSurfer={handleWaveSurfer} />}
        <button onClick={handlePlayPause}>Play/Pause</button>
        <button onClick={handleStart}>Start from Beginning</button>
      </div>

      {/* <div className="getAudio">
        <button onClick={fetchAudio}>Файл сонсох</button>
        {audioUrl && <Waveform url={audioUrl} height={200} onWaveSurfer={handleWaveSurfer} />}
      </div> */}

      <div className="download">
        <button onClick={download}>Файл татах</button>
      </div>
    </div>
  );
}

export default Audio;

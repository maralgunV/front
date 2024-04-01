import React, { useState, useEffect } from "react";
import "./Audio.css";
import axios from "axios";
import ScreenBlocker, { axiosRequest } from "../ScreenBlocker/ScreenBlocker";
import AudioWaveform from "../AudioWaveform/AudioWaveform";

function Audio() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setError("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = {
        url: "http://127.0.0.1:5000/upload",
        method: "post",
        requestData: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // const res = await ScreenBlocker.axiosRequest

      setResponse(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
    }
  };

  const fetchAudio = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_file");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error fetching audio:", error);
    } finally {
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("your-api-endpoint");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  return (
    <div className="audio-container">
      <div>
        <h1>Video Example</h1>
        {/* <video width="640" height="360" controls>
          <source src="video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>
      <div>{error && <p>Error: {error}</p>}</div>
      <div className="upload">
        <h1>Upload File</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>

        {/* Display the uploaded file name */}
        {selectedFile && (
          <div className="file-name">Selected file: {selectedFile.name}</div>
        )}

        {/* Display the response from the server */}
        {response && (
          <div className="server-response">
            <h2>Response from server:</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
      <div className="getAudio">
        <button onClick={fetchAudio} className="load-audio-btn">
          Load Audio
        </button>
        {audioUrl && (
          <audio controls className="audio-player">
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      <div id="waveform" />
      {/* <AudioWaveform path="/maralgun.wav" /> */}
      <h1>tsetsetsets</h1>
      <h1>asdfa</h1>
    </div>
  );
}

export default Audio;

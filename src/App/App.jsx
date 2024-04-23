import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [error, setError] = useState(null);

  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

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

      // Send file data to the backend

      const response = await axios.post(
        "http://127.0.0.1:5001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const [fileInfo, setFileInfo] = useState(null);

  const handleDownload = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5001/get_file_info");
      const { filename, size } = response.data;

      // Set file info state
      setFileInfo({ filename, size });

      // Initiate download
      window.location.href = "http://127.0.0.1:5001/get_file";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Ярианы чанар сайжруулах веб программ</h1>
      </div>
      <div className="description">
        <h4>
          Энэхүү апп нь ярианы бичсэн Wav файлыг ярианы чанар сайжруулах AI
          <br />
          моделийн тусламжтайгаар чанарыг нь сайжруулах болно.
        </h4>
      </div>
      {/* <div>{error && <p>Error: {error}</p>}</div> */}

      <div>
        <h1>AI Ярианы чанар сайжруулах хэрэгсэл хэнд зориулсан вэ?</h1>
      </div>
      <div>
        <div className="container">
          <div className="image-box">
            <img
              src="/podcaster.jpg"
              alt="Description of First Image"
              style={{
                top: "0",
                right: "0",
                width: "340px",
                height: "305px",
                paddingRight: "15px",
              }}
            />
            <h1>Podcaster</h1>
            <div class="line"></div>
            <h4>
              Гадуур явж байхад бичсэн бичлэгнүүд нь
              <br />
              шуугиантай байх нь элбэг байдаг.
            </h4>
          </div>
          <div className="image-box">
            <h1>Virtual Assistant</h1>
            <div class="line"></div>
            <h4>
              Хэрэглэгчийн аудио бичлэгнүүд нь чанар муутай,
              <br />
              шуугиантай байх нь элбэг байдаг.
            </h4>
            <img
              src="/virtual_assistant.jpg"
              alt="Description of Second Image"
              style={{
                top: "0",
                right: "0",
                width: "340px",
                height: "305px",
                paddingRight: "15px",
              }}
            />
          </div>
          <div className="image-box">
            <img
              src="/youtuber.jpg"
              alt="Description of Third Image"
              style={{
                top: "0",
                right: "0",
                width: "340px",
                height: "305px",
                paddingRight: "15px",
              }}
            />
            <h1>Youtuber</h1>
            <div class="line"></div>
            <h4>
              Янз бүрийн орчинд бичсэн аудио бичлэгнүүд нь
              <br />
              чанар муутай, шуугиантай байх нь элбэг байдаг.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

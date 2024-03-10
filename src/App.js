import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [members, setMembers] = useState([]);

  const handleClick = async () => {
    try {
      const currentTime = new Date().toISOString();
      const response = await axios.post('http://127.0.0.1:5000', {
        time: currentTime,
      });
      setMembers(response.data.members);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      // Send file data to the backend
      const response = await axios.post(
        'http://127.0.0.1:5000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResponse(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [fileInfo, setFileInfo] = useState(null);

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_file_info');
      const { filename, size } = response.data;

      // Set file info state
      setFileInfo({ filename, size });

      // Initiate download
      window.location.href = 'http://127.0.0.1:5000/get_file';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Send Request</button>
      <h1>Members List</h1>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
      <h1>Upload File</h1>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {/* Display the response from the server */}
      {response && (
        <div>
          <h2>Response from server:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      <div>
        <h1>Download File</h1>
        <button onClick={handleDownload}>Download File</button>

        {/* Display file info */}
        {fileInfo && (
          <div>
            <h2>File Info:</h2>
            <p>Filename: {fileInfo.filename}</p>
            <p>Size: {fileInfo.size} bytes</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

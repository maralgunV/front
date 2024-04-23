import React, { useState, useEffect } from 'react';
import './FileUploader.css'; // Make sure your CSS file is linked properly
import axios from 'axios';

function FileUploader({ onFileTypeChange }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [fileType, setFileType] = useState(null); // State variable to store file type

  useEffect(() => {
    // Call handleUpload when selectedFile changes
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]); // Dependency array

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);

    // Determine file type
    const fileType = event.target.files[0].type.split('/')[1];
    setFileType(fileType);

    // Pass fileType to parent component
    onFileTypeChange(fileType);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      let response;
      if (fileType === 'wav') {
        response = await axios.post('http://127.0.0.1:5001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else if (fileType === 'zip') {
        response = await axios.post('http://127.0.0.1:5001/uploadZip', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        throw new Error('Unsupported file type');
      }

      setResponse(response.data);
      setError(null);
    } catch (error) {
      setError('Upload failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="file-uploader">
      {isLoading && <div className='loading'>Loading...</div>}
      <div className="drag-text">
        Өөрийн аудио файлыг энд оруулна уу 
      </div>
      <input id="file-input" type="file" onChange={handleFileSelect} accept=".wav,.zip" />
      <label htmlFor="file-input">
        Файл сонгоно уу
      </label>
      {selectedFile && (
        <div className="file-details">
          <span>{selectedFile.name}</span>
        </div>
      )}
      <div className="upload-info">
        Файлын зөвшөөрөгдөх формат: WAV, ZIP<br />
        Файлын дээд их хугацаа: 1 min<br />
        Файлын дээд хэмжээ: 30 MB
      </div>
    </div>
  );
}

export default FileUploader;

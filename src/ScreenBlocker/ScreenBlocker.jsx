import React, { useState } from 'react';
import axios from 'axios';

const Loading = () => {
  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

const ScreenBlocker = ({ apiUrl }) => {
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      const { filename, size } = response.data;

      setFileInfo({ filename, size });
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Render Loading component conditionally based on loading state */}
      {loading && <Loading />}
      <button onClick={handleClick}>Click me to load</button>
    </div>
  );
};

export default ScreenBlocker;

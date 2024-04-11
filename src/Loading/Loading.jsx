import React, { useState } from 'react';
import './Loading.css'; 

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);  
  };

  return (
    <div className="app-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
      <button onClick={loadData} disabled={isLoading}>
        Load Data
      </button>
    </div>
  );
};

export default Loading;

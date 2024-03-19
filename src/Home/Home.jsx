import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';
import ScreenBlocker from '../ScreenBlocker/ScreenBlocker';

function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1>React Loading Example</h1>
      <ScreenBlocker apiUrl="http://127.0.0.1:5000/get_file_info" />
    </div>
  );
}

export default Home;

import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch('/members')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {typeof data.members === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => <div key={i}>{member}</div>)
      )}
      <div> TEST </div>
    </div>
  );
}

export default App;

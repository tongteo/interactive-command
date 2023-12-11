// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [responseData, setResponseData] = useState('');
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots < 3 ? prevDots + 1 : 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sendCommand = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://127.0.0.1:5000/api/process-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: '19194a',
          user_input: userInput,
          interaction_id: '19194k',
        }),
      });

      const data = await response.json();
      const finalData = JSON.stringify(data, null, 2).replace(/: #Do nothing/g, '');

      const cleanedData = finalData.replace(/\[|\]/g, '');

      setResponseData(cleanedData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <h1>Interactive Command</h1>
      </header>

      <main>
        <form>
          <label htmlFor="userInput">User Input:</label>
          <input
            type="text"
            id="userInput"
            name="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="button" onClick={sendCommand}>
            Send Command
          </button>
        </form>

        {loading ? (
          <div id="loadingContainer"></div>
        ) : (
          <div id="responseContainer">
            <pre>{responseData}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

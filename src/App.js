import React from 'react';
import './App.css'; 

import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Weather Blockchain App</h1>
      </header>
      <main>
        <Weather />
      </main>
      <footer className="App-footer">
        <p>Powered by Ethereum</p>
      </footer>
    </div>
  );
}

export default App;

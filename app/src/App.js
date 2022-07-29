import React from "react";
import './App.css';
import Hints from './Hints.js'

import hints from "./encrypted.json"

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Hints hints={hints}/>
      </header>
    </div>
  );
}

export default App;

import React from "react";
import './App.css';
import Hint from './Hints.js'

import hints from "./encrypted.json"

function App() {

  return (
    <div className="App">
      <header className="App-header">
        { hints.map(({hint, encoded, hash}, idx) => {
          return <Hint key={"hint_"+idx} hint={hint} encoded={encoded} hash={hash}/> 
        })}
      </header>
    </div>
  );
}

export default App;

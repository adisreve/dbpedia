import React, { useRef, useState } from 'react';
import SearchResult from "./components/SearchResult";
import './App.css';

const App = () => {
  const [ query, setQuery ] = useState('Joy Division');
  const textInput = useRef();

  const handleClick = () => {
    setQuery(textInput.current.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-query">
            <label>Search Query</label>
            <input type="text" ref={textInput}/> 
            <button onClick={handleClick}>Click Me</button>
        </div>
        <SearchResult query={query}></SearchResult>
      </header>
    </div>
  );
}

export default App;

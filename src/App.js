import React from 'react';
import './App.css';

import Search from "./components/Search";
import Artist from "./components/Artist";
import ArtistList from "./components/ArtistList";

function App() {
  return (
      <div className="container">
        <div className="content-wrapper">
            <Search/>
            <ArtistList/>
        </div>
      </div>
  );
}

export default App;

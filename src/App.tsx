import React, { FC } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from 'layout/main';
import Home from 'pages/home';
import WorldMap from 'pages/worldMap';
import Welcome from 'pages/welcome';

const App: FC = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="main/*" element={<Main/>}>
          <Route path="home" element={<Home/>} />
          <Route path="WorldMap" element={<WorldMap/>} />
          <Route path="Welcome" element={<Welcome/>} />
        </Route>
      </Routes>
    </Router>   
  </div>
);

export default App;
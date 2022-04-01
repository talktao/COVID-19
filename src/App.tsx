import React, { FC } from 'react';
import './App.css';
import { HashRouter  as Router, Route, Routes } from 'react-router-dom'
import Main from 'layout/main';
import Home from 'pages/home';
import Province from 'pages/province';

const App: FC = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="main/*" element={<Main/>}>
          <Route path="home" element={<Home/>} />
          <Route path="province" element={<Province/>} />
        </Route>
      </Routes>
    </Router>   
  </div>
);

export default App;
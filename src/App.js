import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignUp from './Components/SignUp';
import DashBoard from './Components/DashBoard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/dashboard' element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

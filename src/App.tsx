import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {Main} from "./components/Main/Main";
import {NotFound} from "./components/NotFound/NotFound";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/workers" />} />
          <Route path="/workers" element={<Main/>}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;

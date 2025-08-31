import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/LandingDoc/Landing';
import GemnaLogoDisplay from './GemnaConfig/GemnaLogoDisplay.jsx';


// Routes handler : saurabh sharma
const App = () => {
  const loaderchecker = localStorage.getItem("firstTime");

  if (!loaderchecker) {
    localStorage.setItem("firstTime", true);
  }

  useEffect(() => {
    console.log("App render");

    return () => {
      console.log("unmount");
      localStorage.removeItem("firstTime");
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GemnaLogoDisplay />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/check/landing' element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
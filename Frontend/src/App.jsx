import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/LandingDoc/Landing';
import GemnaLogoDisplay from './GemnaConfig/GemnaLogoDisplay.jsx';
import Footer from './Components/Footer.jsx';
import LazyLaodingDemo from './Components/LodingSpinners/LazyLaodingDemo.jsx';
import Header from './Components/Header.jsx';
// import Feature from './Components/Feature.jsx';

const Feature = lazy(() => import('./Components/Feature.jsx'));
const Product = lazy(() => import('./Components/Product/Product.jsx'));


// Routes handler : saurabh sharma
const App = () => {
  const loaderchecker = localStorage.getItem("firstTime");

  if (!loaderchecker) {
    localStorage.setItem("firstTime", true);
  }

  useEffect(() => {
    return () => {
      console.log("unmount");
      localStorage.removeItem("firstTime");
    }
  }, [])

  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path='/' element={<GemnaLogoDisplay />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/Features' element={
          <Suspense fallback={<LazyLaodingDemo />}>
            <Feature />
          </Suspense>
        } />
        <Route path='/Product' element={
          <Suspense fallback={<LazyLaodingDemo />}>
            <Product />
          </Suspense>
        } />
        {/* <Route path='*' element={<LazyLaodingDemo />} /> */}
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
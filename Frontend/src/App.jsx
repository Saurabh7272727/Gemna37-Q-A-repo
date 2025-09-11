import React, { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/LandingDoc/Landing';
import GemnaLogoDisplay from './GemnaConfig/GemnaLogoDisplay.jsx';
import Footer from './Components/Footer.jsx';
import LazyLaodingDemo from './Components/LodingSpinners/LazyLaodingDemo.jsx';
import Header from './Components/Header.jsx';
import ConnectGemnaPage from './Pages/ConnectGemnaPage.jsx';
// import Feature from './Components/Feature.jsx';
import GemIDValidation from './Auth/AuthCom/GemIDValidation.jsx';

const Feature = lazy(() => import('./Components/Feature.jsx'));
const Product = lazy(() => import('./Components/Product/Product.jsx'));

const Test = () => {
  const [data, setData] = useState(0);
  const [test, setTest] = useState(90);
  console.log('component ', data, test);
  const handleClick = () => {
    setData((e) => {
      console.log("setData");
      setTest(23);
      return e + 1;
    });
    setTimeout(() => setTest(45), 4000);
    const fun = async () => {
      console.log("fun");
      setData((e) => {
        console.log("inside");
        return e + 2;
      })
    }
    fun();
  };

  useEffect(() => {
    handleClick();
  }, [])

  return (
    <>
      <h1>hello world {data}</h1>
    </>
  )
}

// Routes handler : saurabh sharma
const App = () => {
  const loaderchecker = localStorage.getItem("firstTime");

  if (!loaderchecker) {
    localStorage.setItem("firstTime", true);
  }

  useEffect(() => {
    localStorage.removeItem("message_local");
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

        <Route path='/connectGemnaPage' element={<ConnectGemnaPage />} />
        <Route path='/test' element={<Test />} />
        <Route path='/validation' element={<GemIDValidation />} />
        <Route path='/error_page' element={<div>Error page</div>} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
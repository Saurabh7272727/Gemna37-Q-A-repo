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
import { LoginUser as Login } from './Auth/LoginUser/LoginUser.jsx'

const Feature = lazy(() => import('./Components/Feature.jsx'));
const Product = lazy(() => import('./Components/Product/Product.jsx'));
const Error404Page = lazy(() => import('./Components/ErrorPages/Error404.jsx'))
const Admin = lazy(() => import('./Admin/Admin.jsx'));

import WorkSpace from './workSpaceStudent/WorkSpace.jsx';
import { Header as StudentHeader } from './workSpaceStudent/componentSpace/Header.jsx';
import { Footer as StudentFooter } from './workSpaceStudent/componentSpace/Footer.jsx';
import { decryptData } from './Auth/Encryption/jsondataEncryption.js';


// Routes handler : saurabh sharma
const App = () => {
  const [test, setTest] = useState({ role: "local" });
  const loaderchecker = localStorage.getItem("firstTime");

  if (!loaderchecker) {
    localStorage.setItem("firstTime", true);
  }

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken) {
      const jwt_token = decryptData(jwtToken);
      setTest({ role: jwt_token.role });
      console.log(jwt_token.role);
    }
    localStorage.removeItem("message_local");
    return () => {
      console.log("unmount");
      localStorage.removeItem("firstTime");
    }
  }, [])

  return (
    <>
      <HashRouter>
        {
          test.role == 'student' ? <StudentHeader /> : <Header />
        }
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
          {/* <Route path='/test' element={<Test />} /> */}
          <Route path='/validation' element={<GemIDValidation />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin/registeration' element={<Admin />} />
          <Route path='/error_page' element={<Error404Page />} />
          <Route path='/student' element={<WorkSpace />} />
        </Routes>
        {
          test.role == 'student' ? <StudentFooter /> : <Footer />
        }
      </HashRouter>
    </>

  )
}

export default App
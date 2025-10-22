import React, { lazy, Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom';
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
import { decryptData } from './Auth/Encryption/jsondataEncryption.js';
const StudentProfilePage = lazy(() => import('./workSpaceStudent/pages/StudentProfilePage.jsx'));
import GTools from './workSpaceStudent/pages/G_ToolsPage.jsx';


// Routes handler : saurabh sharma


// redux Authslice reducers
import { accessController } from './ReduxStore/Slices/AuthSlice.js';
import { loadUserInformation } from './ReduxStore/Slices/UserInfoSlice.js'
import { useSelector, useDispatch } from 'react-redux';


// g-tool import
import WorkSpaceContainerSize from './workSpaceStudent/componentSpace/WorkSpaceContainerSize.jsx';
const G_chatApp = lazy(() => import('./workSpaceStudent/pages/G_collection/G_chatApp.jsx'));

// Fetch current student data;
import ApiEndPoints from './ReduxStore/apiEndPoints/apiEndPoints.js';

const App = () => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.accessSlice.login);
  const loaderchecker = localStorage.getItem("firstTime");

  if (!loaderchecker) {
    localStorage.setItem("firstTime", true);
  }


  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken) {
      const jwt_token = decryptData(jwtToken);

      const { role } = jwt_token;
      if (role === 'student' && jwt_token.jwt_token) {
        const api = new ApiEndPoints();
        try {
          const fetchdata = async () => {
            dispatch(accessController(true));
            console.log("Gemna.ai fetch your local information")
            const result = await api.fetchUserProfile('student/account/access', jwt_token.jwt_token);
            dispatch(loadUserInformation(result.data));
            dispatch(accessController(true));
            if (role !== 'student') {
              dispatch(accessController(false));
            }
          }
          fetchdata();
        } catch (error) {
          if (role !== 'student') {
            dispatch(accessController(false));
          }
          console.error("Error - 37 Something was wrong on App.jsx com");
        }

      }
    }


    localStorage.removeItem("message_local");
    return () => {
      console.log("unmount");
      localStorage.removeItem("firstTime");
    }
  }, []);
  const users = [
    { id: 1, name: "Aarav Mehta", status: "online" },
    { id: 2, name: "Priya Sharma", status: "offline" },
    { id: 3, name: "Rahul Verma", status: "online" },
    { id: 4, name: "Isha Patel", status: "offline" },
    { id: 5, name: "Vikram Singh", status: "online" },
  ];

  return (
    <>
      <HashRouter>
        <Header renderPart={login} />
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
          <Route path='/gtools/page/*' element={<GTools />} />
          <Route path='/profile/*' element={
            <Suspense fallback={<LazyLaodingDemo />}>
              <StudentProfilePage />
            </Suspense>
          } />
          <Route path='/app/chat' element={
            <Suspense fallback={<LazyLaodingDemo />}>
              <WorkSpaceContainerSize>
                <G_chatApp renderPart={login} users={users} />
              </WorkSpaceContainerSize>
            </Suspense>
          } />
          <Route path='*' element={<div>Gemna.ai does not support your unauth router call</div>} />
        </Routes>
        <Footer renderPart={login} />
      </HashRouter>
    </>

  )
}

export default App
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/LandingDoc/Landing';
import GemnaLogoDisplay from './GemnaConfig/GemnaLogoDisplay.jsx';
import Footer from './Components/Footer.jsx';
import LazyLaodingDemo from './Components/LodingSpinners/LazyLaodingDemo.jsx';
import Header from './Components/Header.jsx';
import ConnectGemnaPage from './Pages/ConnectGemnaPage.jsx';
import GemIDValidation from './Auth/AuthCom/GemIDValidation.jsx';
import { LoginUser as Login } from './Auth/LoginUser/LoginUser.jsx'

const Feature = lazy(() => import('./Components/Feature.jsx'));
const Product = lazy(() => import('./Components/Product/Product.jsx'));
const Error404Page = lazy(() => import('./Components/ErrorPages/Error404.jsx'))
const Admin = lazy(() => import('./Admin/Admin.jsx'));

import WorkSpace from './workSpaceStudent/WorkSpace.jsx';
import { decryptData } from './Auth/Encryption/jsondataEncryption.js';
const StudentProfilePage = lazy(() => import('./workSpaceStudent/pages/StudentProfilePage.jsx'));
const GTools = lazy(() => import('./workSpaceStudent/pages/G_ToolsPage.jsx'))

// Routes handler : saurabh sharma


// redux Authslice reducers
import { accessController } from './ReduxStore/Slices/AuthSlice.js';
import { loadUserInformation } from './ReduxStore/Slices/UserInfoSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import { addOnlineUserList, clearTheList } from './ReduxStore/Slices/ListSliceOfStudents.js'

// utils floder
import convertMapToArray from './ReduxStore/utils/ConvertMapToArray.js';

// g-tool import
import WorkSpaceContainerSize from './workSpaceStudent/componentSpace/WorkSpaceContainerSize.jsx';

const G_chatApp = lazy(() => import('./workSpaceStudent/pages/G_collection/G_chatApp.jsx'));
const ChatArea = lazy(() => import('./workSpaceStudent/pages/G_collection/component_apps/ChatArea.jsx'))
// Fetch current student data;
import ApiEndPoints from './ReduxStore/apiEndPoints/apiEndPoints.js';

// socket config
import socket from './socket_client/socket_client.js';


// google auth com
import GoogleStyleAuthPage from './Auth/LoginUser/GoogleAuth.jsx';


// test
import AttendancePage from './workSpaceStudent/AttendenceSystem/Main.jsx';

const App = () => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.accessSlice.login);
  const loaderchecker = localStorage.getItem("firstTime");
  const [tokenexpire, setTokenexpire] = useState(false)
  if (!loaderchecker) {
    localStorage.setItem("firstTime", true);
  }

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.log("socket message --- ", err.message);
      setTokenexpire(true);
      // prints the message related with the error
    });

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
            dispatch(clearTheList());
          }
          console.error("Error - 37 Something was wrong on App.jsx com");
        }
      }
    }

    localStorage.removeItem("message_local");
    return () => {
      localStorage.removeItem("firstTime");
    }
  }, []);


  useEffect(() => {
    if (login) {
      setTokenexpire(false);
      socket.auth.token = localStorage.getItem("jwt_token");
      socket.connect();

      socket.on("connect", () => {
        console.log(`${socket.id} are connect with server`);
      });

      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
      });

      socket.on('connect_error', (error) => {
        console.log('Connection error:', error);
      });


      socket.on("newUserAreConnect", (data) => {
        const arr = convertMapToArray(data?.onlineUsers);
        dispatch(addOnlineUserList(arr));
      })

    } else {
      socket.disconnect();
    }
  }, [login]);

  useEffect(() => {
    if (login) {
      socket.on("userAreDisconnect", (data) => {
        const arr = convertMapToArray(data?.onlineUsers);
        dispatch(addOnlineUserList(arr));
      });
    }
  }, [login]);


  return (
    <>
      <HashRouter>
        <Header renderPart={login} tokenexpire={tokenexpire} />
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
          <Route path='/admin/registeration' element={
            <Suspense fallback={<LazyLaodingDemo />}>
              <Admin />
            </Suspense>
          } />
          <Route path='/error_page' element={<Error404Page />} />
          <Route path='/student' element={<WorkSpace />} />
          <Route path='/gtools/page/*' element={
            <Suspense fallback={<LazyLaodingDemo />}>
              <GTools />
            </Suspense>
          } />
          <Route path='/profile/*' element={
            <Suspense fallback={<LazyLaodingDemo />}>
              <StudentProfilePage />
            </Suspense>
          } />
          <Route path='/app/chat' element={
            <Suspense fallback={<LazyLaodingDemo />}>
              <WorkSpaceContainerSize>
                <G_chatApp renderPart={login} />
              </WorkSpaceContainerSize>
            </Suspense>
          } />

          <Route path='/chat/app/:id' element={
            <Suspense fallback={<LazyLaodingDemo />}>
              <WorkSpaceContainerSize>
                <ChatArea renderPart={login} idByProps={""} />
              </WorkSpaceContainerSize>
            </Suspense>
          } />
          <Route path='/app/attendence' element={
            <Suspense fallback={<LazyLaodingDemo />}>
              <WorkSpaceContainerSize>
                <AttendancePage />
              </WorkSpaceContainerSize>
            </Suspense>
          } />

          <Route path='/auth/google/verification' element={<GoogleStyleAuthPage />} />
          <Route path='/success/google/*' element={<Login />} />
          <Route path='/error/google/auth' element={<div className='pt-[100px]'>Verification failed -- Email not fouund</div>} />
          <Route path='*' element={<Error404Page />} />
        </Routes>
        <Footer renderPart={login} />
      </HashRouter>
    </>

  )
}

export default App
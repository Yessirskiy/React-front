import React, { useContext } from 'react';

import { Route, Routes } from 'react-router-dom';
import AuthContext, { AuthProvider } from './context/AuthContext';

import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage"
import RequireAuth from './utils/RequireAuth';

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RequireAuth> <MainPage/> </RequireAuth>} exact/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
};



export default App;
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AccountRoutes from './utils/accountRoutes';
import MeetingsRoutes from './utils/meetingsRoutes';

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <AccountRoutes/>
        <MeetingsRoutes/>
      </AuthProvider>   
    </div>
  );
};


export default App;
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AccountRoutes from './utils/accountRoutes';

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <AccountRoutes/>
      </AuthProvider>   
    </div>
  );
};


export default App;
import logo from './logo.svg';
import './App.css';
import React from 'react'; 
import { BrowserRouter as Router} from "react-router-dom";
import AppRoutes from './routes/AppRoutes'; 
import Layout from './layouts/Layout';
import withErrorBoundary from './utils/withErrorBoundary';
import { AuthProvider } from './auth/AuthContext';
 
const App = () =>{
  return ( 
    <Router>
      {/* <Layout> */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      {/* </Layout> */}
    </Router>
  );
};

export default withErrorBoundary(App);

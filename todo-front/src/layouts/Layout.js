import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import EditorPanel from '../pages/EditorPanel';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='app-container'>
        <Sidebar />
        <main className='main-content'>  <Outlet /></main>
        <EditorPanel/>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;

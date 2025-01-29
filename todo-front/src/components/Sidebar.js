import React, {useState} from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/sidebar.css"; 

const Sidebar = () => {
  return (
    <div className="sidebar">
       
      <div className="profile">
        <img src="profile-icon.png" alt="Profile" className="profile-icon" />
        <p className="email">masummir773@gmail.com</p>
      </div>
 
      <div className="search">
        <input type="text" placeholder="Search" />
      </div>
 
      <div className="buttons">
        <Link className="btn note">Note</Link>
         <Link to="/contentList" className="btn task">Task</Link>
      {/*  <Link className="btn event">Event</Link>  */}
        <Link to="/todoList" className="btn list" >Todo List</Link>
      </div>
 
    </div>
  );
};

export default Sidebar;

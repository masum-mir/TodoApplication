import React, {useState} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogin = () => {
    console.log("loggin button clicked")
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


  // return (
  //   <header className="header">
  //     <div className="logo">
  //       <Link to="/">TodoApp</Link>
  //     </div>
  //     <nav className="nav-links">
  //       <Link to="/">Home</Link> 
  //     </nav>
  //     {token ? (
  //       <button className="logout-btn" onClick={handleLogout}>
  //         Logout
  //       </button>
  //     ) : (
  //       <button className="login-btn" onClick={handleLogin}>
  //         Login
  //       </button>
  //     )}
  //   </header>
  // ); 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Everynote
        </Link>

        <button className="navbar-toggle" onClick={toggleNavbar}>
          {isOpen ? '✖' : '☰'}
        </button>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/todoList" className="navbar-link" onClick={() => setIsOpen(false)}>
            Todos
          </Link>
          <Link to="/about" className="navbar-link" onClick={() => setIsOpen(false)}>
            About
          </Link>
          {token ? (
          <Link to="/login" className="navbar-link" onClick={handleLogout}>
            Logout
          </Link>)
          :(
          <Link to="/login" className="navbar-link" onClick={handleLogin}>
            Login
          </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
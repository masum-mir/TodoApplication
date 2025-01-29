import React, { useState } from "react";
import axios from "axios";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { ROUTES } from "../routes/routes";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(credentials);
      console.log("response:: ", response);
      let token = response.message;
      console.log("Token:: ", token);
      if (token) {
        navigate(ROUTES.PRIVATE.TODO_LIST);
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  //   return (
  //     <div className="container mt-5">
  //       <div className="row justify-content-center">
  // <div className="col-md-6">
  //   <div className="card">
  //     <div className="card-body">
  //       <h2 className="text-center mb-4">Login</h2>
  //       {error && <div className="alert alert-danger">{error}</div>}
  //       <form onSubmit={handleSubmit}>
  //         <div className="mb-3">
  //           <label className="form-label">Username</label>
  //           <input
  //             type="text"
  //             name="username"
  //             className="form-control"
  //             value={credentials.username}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <label className="form-label">Password</label>
  //           <input
  //             type="password"
  //             name="password"
  //             className="form-control"
  //             value={credentials.password}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <button type="submit" className="btn btn-primary w-100">
  //           Login
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // </div>;
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo"></div>
        <h1>Sign in</h1>
        <p>to continue to your Everynote account.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control login-input"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control login-input"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 login-button">
            Continue
          </button>
        </form>
        <div className="divider">
          <span>or</span>
        </div>
        <div className="auth-buttons">
          <button className="google-auth">Continue with Google</button> 
        </div>
        <p className="signup">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p> 
      </div> 
    </div>
  );
};

export default Login;

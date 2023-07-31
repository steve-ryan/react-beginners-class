import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8001/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/dash/:id");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <form className="registration-form login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="error">{error && error}</div>
          <input
            type="text"
            placeholder="Email address"
            name="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
          <button type="submit" className="loginbtn">
            Login
          </button>
        </form>
        <div className="or-divider">
          <span>or</span>
        </div>
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

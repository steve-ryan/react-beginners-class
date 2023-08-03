import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", values)
      .then((res) => {
        const { token, redirect } = res.data;

        if (token) {
          localStorage.setItem("token", token);
          navigate(redirect);
        } else {
          setError("Invalid credentials!");
        }
      })
      .catch((err) => {
        setError("Something went wrong.Please try again later.");
      });
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 custom-card-width">
          <h2 className="mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary form-control">
              Login
            </button>
          </form>
          <div className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

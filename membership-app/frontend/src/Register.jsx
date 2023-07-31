import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    surname: "",
    idno: "",
    phone: "",
    email: "",
    password: "",
    dob: "",
  });

  const navigate = useNavigate();

  const minDate = new Date().toISOString().split("T")[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8001/register", data)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Personal Details</h2>
          <div className="form-group">
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              id="first-name"
              name="fname"
              onChange={(e) => setData({ ...data, fname: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              id="last-name"
              name="lname"
              onChange={(e) => setData({ ...data, lname: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              onChange={(e) => setData({ ...data, surname: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="id-number">ID Number:</label>
            <input
              type="text"
              id="id-number"
              name="idno"
              onChange={(e) => setData({ ...data, idno: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number:</label>
            <input
              type="tel"
              id="phone-number"
              name="phone"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">DoB:</label>
            <input
              type="date"
              id="DOB"
              name="dob"
              onChange={(e) => setData({ ...data, dob: e.target.value })}
              max={minDate}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              type="text"
              id="pwd"
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="register-link">
          <p>
            You have an account? <Link to="/">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

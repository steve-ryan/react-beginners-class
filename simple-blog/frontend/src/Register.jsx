import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    tagline: "",
    image: null,
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();
  const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password != confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("tagline", data.tagline);
    formdata.append("image", data.image);
    formdata.append("password", data.password);

    axios
      .post("http://localhost:5000/register", formdata)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/"); // Redirect to the homepage on successful registration
        } else {
          setError(res.data.Error); // Show the error message for duplicate email
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 custom-card-width">
          <h2 className="mb-4 text-center">Register</h2>
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tagline" className="form-label">
                Tagline
              </label>
              <textarea
                className="form-control"
                id="tagline"
                rows="3"
                onChange={(e) => setData({ ...data, tagline: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image (File Upload)
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && acceptedImageTypes.includes(file.type)) {
                    setData({ ...data, image: file });
                  } else {
                    setData({ ...data, image: null });
                    setError("Please upload a valid image file");
                  }
                }}
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
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary form-control">
              Register
            </button>
          </form>
          <div className="mt-3 text-center">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

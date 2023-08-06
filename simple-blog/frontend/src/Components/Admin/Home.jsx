import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [postCount, setPostCount] = useState();
  const [writerCount, setWriterCount] = useState();
  const [adminCount, setAdminCount] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/adminCount")
      .then((res) => {
        setAdminCount(res.data[0].admins);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/writerCount")
      .then((res) => {
        setWriterCount(res.data[0].writers);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/postCount")
      .then((res) => {
        setPostCount(res.data[0].posts);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="card card-body m-4 bg-white">
        <blockquote className="blockquote mb-0 text-center">
          <p>A well-known quote, contained in a blockquote element.</p>
        </blockquote>
      </div>
      <div className="row my-4 m-3">
        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
          <div className="card text-center tally">
            <h5 className="card-header">Writers</h5>
            <div className="card-body">
              <h5 className="card-title text-center">
                Total:
                <Link to="writers" className="text-success">
                  {writerCount}
                </Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
          <div className="card text-center tally">
            <h5 className="card-header">Posts</h5>
            <div className="card-body">
              <h5 className="card-title text-center">
                Total:
                <Link to="posts" className="text-success">
                  {postCount}
                </Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
          <div className="card text-center tally">
            <h5 className="card-header">Admin</h5>
            <div className="card-body">
              <h5 className="card-title text-center">
                Total:
                <Link to="" className="text-success link">
                  {adminCount}
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

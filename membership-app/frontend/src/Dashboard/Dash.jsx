import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Dash = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({ fname: "", membershipNo: "" });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/dashboard");
        if (response.data.Status === "Success") {
          const id = response.data.id;
          navigate("/dash/" + id);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }

      try {
        const memberResponse = await axios.get(
          "http://localhost:8001/member/" + id
        );
        setMember(memberResponse.data.Result[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleLogout = () => {
    axios
      .get("http://localhost:8001/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log("Failed to logout!"));
  };

  console.log("Rendered with id:", id);

  return (
    <div>
      {member?.fname && (
        <p>
          Welcome <span className="red">{member.fname}</span>{" "}
          <span className="red">{member.lname}</span> your Membership No is{" "}
          <span className="green">{member.membershipNo}</span>
        </p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dash;

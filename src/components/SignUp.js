import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) navigate("/");
  });
  const collectData = async () => {
    let result = await fetch("https://cors-anywhere.herokuapp.com/https://ecom-dashboardf.herokuapp.com/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.token) {
      localStorage.setItem("users", JSON.stringify(result.data));
      localStorage.setItem("token", JSON.stringify(result.token));
      navigate("/");
    } else console.log(result);
  };
  return (
    <div className="container m-5 mx-auto w-75 p-5">
      <h1 className="m-3 pt-5">Register</h1>
      <input
        className="form-control form-group m-3"
       
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter Name"
      ></input>
      <input
        className="form-control form-group m-3"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      ></input>
      <input
        className="form-control form-group m-3"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      ></input>
      <button className="btn btn-success m-3 " onClick={collectData} type="button">
        SignUp
      </button>
    </div>
  );
};
export default SignUp;

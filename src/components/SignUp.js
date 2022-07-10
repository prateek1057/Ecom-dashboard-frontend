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
    let result = await fetch("https://ecom-dashboardf.herokuapp.com/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    //console.log(result);
    if (result.token) {
      localStorage.setItem("users", JSON.stringify(result.data));
      localStorage.setItem("token", JSON.stringify(result.token));
      navigate("/");
    } else console.log(result);
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter Name"
      ></input>
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      ></input>
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      ></input>
      <button className="appButton text-color-white" onClick={collectData} type="button">
        SignUp
      </button>
    </div>
  );
};
export default SignUp;

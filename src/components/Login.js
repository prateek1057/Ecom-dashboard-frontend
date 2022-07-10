import React from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  React.useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) navigate("/");
  });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const handleClick = async () => {
    let result = await fetch("https://ecom-dashboardf.herokuapp.com/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    if (result.token) {
      localStorage.setItem("users", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.token));
      navigate("/");
    } else alert("Please Enter Correct Login Details");
  };
  return (
    <div className="register">
      <h1 className="h1-heading">Login</h1>
      <input
        type="text"
        className="inputBox"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      />
      <input
        type="password"
        className="inputBox"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      <button type="button" onClick={handleClick} className="appButton text-color-white">
        Login
      </button>
    </div>
  );
};
export default Login;

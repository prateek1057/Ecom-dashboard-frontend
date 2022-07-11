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
    if(result)
    {localStorage.setItem("users", JSON.stringify(result));
    navigate('/');}
  };
  return (
    <div className="container m-5 mx-auto w-75 p-5">
      <h1 className="m-3 pt-5">Login</h1>
      <input
        type="text"
        className="form-control form-group m-3"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      />
      <input
        type="password"
        className="form-control form-group m-3"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      <button type="button" onClick={handleClick} className="btn btn-success m-3">
        Login
      </button>
    </div>
  );
};
export default Login;

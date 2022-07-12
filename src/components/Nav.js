import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("users");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="">
      <nav class="navbar navbar-expand  bg-dark navbar-dark fixed-top ">
        <a class="navbar-brand" href="#">
          <img
            src="https://i.ibb.co/ZKcjm4K/1655959794757.jpg"
            className="rounded-circle"
            alt="Web Developer"
            Style="width:55px;"
          />
        </a>
        {auth ? (
          <ul className="navbar-nav">
            <li className="nav-item mx-1">
              <Link to="/" className="nav-link active">
                Products
              </Link>
            </li>
            <li className="nav-item mx-1 ">
              <Link to="/add" className="nav-link active">
                Add Product
              </Link>
            </li>
            <li className="nav-item mx-1 ">
              <Link to="/update/:id" className="nav-link active">
                Update Product
              </Link>
            </li>
            <li className="nav-item mx-1 ">
              <Link to="/profile" className="nav-link active">
                Profile
              </Link>
            </li>
            <li className="nav-item mx-1 ">
              <Link onClick={logout} to="/login" className="nav-link active">
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item mx-1 ">
              <Link to="/signup" className="nav-link active">
                SignUp
              </Link>
            </li>
            <li className="nav-item mx-1 ">
              <Link to="/login" className="nav-link active">
                Login
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
export default Nav;

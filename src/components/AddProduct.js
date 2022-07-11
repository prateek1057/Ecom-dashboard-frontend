import React from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("users"))._id;
    let result = await fetch("https://ecom-dashboardf.herokuapp.com/add-prod", {
      method: "post",
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    if (result) {
      alert("Data Entered Successfully");
      navigate("/");
    }
  };
  return (
    <div className="container m-5 mx-auto w-75 p-5">
      <h1 className="m-2 mb-4 pt-5">Add Product</h1>
      <input
        type="text"
        className="form-control form-group m-3"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      {error && !name && (
        <span className="text-danger list-bold p-3">Enter valid name.</span>
      )}
      <input
        type="text"
        className="form-control form-group m-3"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      {error && !price && (
        <span className="text-danger list-bold m-3 ">Enter valid price.</span>
      )}
      <input
        type="text"
        className="form-control form-group m-3"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>
      {error && !category && (
        <span className="text-danger list-bold m-3">Enter valid category.</span>
      )}
      <input
        type="text"
        className="form-control form-group m-3"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      ></input>
      {error && !company && (
        <span className="text-danger list-bold m-3">Enter valid company.</span>
      )}
      <button
        type="button"
        className="btn btn-success m-3 px-5"
        onClick={handleClick}
      >
        Add
      </button>
    </div>
  );
};

export default AddProduct;

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
    <div className="add-product">
      <h1 className="h1-heading">Add Product</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      {error && !name && <span className="inputError">Enter valid name.</span>}
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      {error && !price && (
        <span className="inputError">Enter valid price.</span>
      )}
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>
      {error && !category && (
        <span className="inputError">Enter valid category.</span>
      )}
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      ></input>
      {error && !company && (
        <span className="inputError">Enter valid company.</span>
      )}
      <button
        type="button"
        className="appButton text-color-white"
        onClick={handleClick}
      >
        Add
      </button>
    </div>
  );
};

export default AddProduct;

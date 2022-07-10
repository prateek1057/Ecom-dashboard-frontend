import React from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    getProduct();
  }, []);

  //Prefill Data
  const getProduct = async () => {
    let data = await fetch(`https://ecom-dashboardf.herokuapp.com/prod-get/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    data = await data.json();
    setName(data.name);
    setPrice(data.price);
    setCategory(data.category);
    setCompany(data.company);
  };

  const handleClick = async () => {
    let data = await fetch(`https://ecom-dashboardf.herokuapp.com/prod-update/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    data = await data.json();
    if (data) navigate("/");
  };

  return (
    <div className="add-product">
      <h1 className="h1-heading">Update Product</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      ></input>
      <button
        type="button"
        className="appButton text-color-white"
        onClick={handleClick}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateProduct;

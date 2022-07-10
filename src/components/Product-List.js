import React from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = React.useState([]);
  const flag = products.length > 0;
  const userId = JSON.parse(localStorage.getItem("users"));
  React.useEffect(() => {
    handleEffect();
  });

  const handleEffect = async () => {
    let data = await fetch("https://ecom-dashboardf.herokuapp.com/prod-list", {
      method: "post",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    data = await data.json();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    let data = await fetch(`https://ecom-dashboardf.herokuapp.com/prod-delete/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    data = await data.json();
    if (data) handleEffect();
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`https://ecom-dashboardf.herokuapp.com/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      handleEffect();
    }
  };

  return (
    <div className="product-list">
      <h1 className="h1-heading">Product List</h1>

      {flag ? (
        <>
          <input
            type=""
            className="search-product"
            placeholder="Search Product"
            onChange={searchHandle}
          />
          <ul className="bold-head">
            <li>S No.</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
          </ul>

          {products.map((item, index) => (
            <ul key={index}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              <li>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
                <Link to={"/update/" + item._id}>/Update</Link>
              </li>
            </ul>
          ))}
        </>
      ) : (
        <span className="prod-list-span">No Products in the list</span>
      )}
    </div>
  );
};
export default ProductList;

import React from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = React.useState([]);
  const flag = products.length > 0;
  const userId = JSON.parse(localStorage.getItem("users"))._id;
  
  React.useEffect(() => {
    handleEffect();
  });

  const handleEffect = async () => {
    let data = await fetch(`https://ecom-dashboardf.herokuapp.com/prod-list/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    data = await data.json();
    console.log(data);
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
        }
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
    <div className="container mx-auto p-5">
      <h1 className="m-3 pt-5 text-center">Your Products</h1>

      {flag ? (
        <>
          <input
            type=""
            className="form-control form-group m-3"
            placeholder="Search Product"
            onChange={searchHandle}
          />
          <table className="table table-hover ">
            <thead>
              <tr className="text-center">
                <th className="bold-head">S No.</th>
                <th className="bold-head">Name</th>
                <th className="bold-head">Price</th>
                <th className="bold-head">Category</th>
                <th className="bold-head">Company</th>
                <th className="bold-head">Operation</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr className="text-center" key={index}>
                  <td className="table-font-bold">{index + 1}</td>
                  <td className="table-font-bold">{item.name}</td>
                  <td className="table-font-bold">{item.price}</td>
                  <td className="table-font-bold">{item.category}</td>
                  <td className="table-font-bold">{item.company}</td>
                  <td className="d-flex">
                    <button
                      className="btn btn-success btn-sm m-1"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                    <span className="nav nav-pills text-center m-1 ">
                      <Link
                        className="nav-link active p-1"
                        to={"/update/" + item._id}
                      >
                        Update
                      </Link>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h1 className="text-center prod-list-span m-5 p-5">
          No Product in the list
        </h1>
      )}
    </div>
  );
};
export default ProductList;

import axios from "axios";
import React, { useState } from "react";

const PurchaseProduct = () => {
  const [products, setProducts] = useState([]);
  axios
    .get("http://localhost:5000/purchaseProduct")
    .then((res) => {
      setProducts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <>
      <h1>PurchaseProduct</h1>
      <div className="flex flex-wrap">
        <div className="w-4/12 px-3">
          {products.map((product) => (
            <div className="bg-gray-200 rounded-md w-full flex flex-col justify-center items-center">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button ></button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PurchaseProduct;

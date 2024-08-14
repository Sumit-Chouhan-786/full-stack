import React, { useState, useEffect } from "react";
import PurchaseProduct from "./PurchaseProduct";
const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/allProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // buttons
  const buttons = [
    { label: "all Products", status: "all" },
    { label: "purchase products", status: "purchase" },
    { label: "complete products", status: "complete" },
  ];
  return (
    <div className="container mt-3 mx-auto">
      <div className="flex justify-center items-center gap-3 mb-3">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => setActiveButton(index)}
            className={`bg-gray-200 rounded-md px-3  py-2 ${
              activeButton === index ? "bg-gray-400" : "bg-gray-200"
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>
      <div className={`flex-wrap ${activeButton === 0 ? "flex" : "hidden"}`}>
        {products.map((product) => (
          <div className="md:w-4/12 sm:w-1/2 w-full px-3 pb-4" key={product._id}>
            <div className="bg-gray-200 rounded-md w-full flex flex-col justify-center items-center">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <button className="bg-gray-400 rounded-md px-3 py-1 my-3">
                purchase
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={`flex-wrap ${activeButton === 1 ? "flex" : "hidden"}`}>
       <PurchaseProduct />
      </div>
      <div
        className={`flex-wrap ${activeButton === 2 ? "flex" : "hidden"}`}
      >
        {products.map((product) => (
          <div className="w-4/12 px-3" key={product._id}>
            <div className="bg-gray-200 rounded-md w-full flex flex-col justify-center items-center">
              <h3>{product.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    productId: "",
    price: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (
      product.name === "" ||
      product.productId === "" ||
      product.price === "" ||
      product.description === ""
    ) {
      alert("All fields are required");
      return; // Stop further execution
    }

    console.log("Product added successfully");

    axios
      .post("http://localhost:4000/products", product)
      .then((response) => {
        console.log(response.data);
        navigate("/admin/product");
      })
      .catch((error) => {
        console.error(
          "There was an error adding the product!",
          error.response || error.message
        );
        alert("Error adding the product!");
      });

    // Clear form fields after successful submission
    setProduct({
      name: "",
      productId: "",
      price: "",
      description: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form className="bg-white p-4 rounded-md shadow-md flex flex-col gap-4">
        <input
          className="p-2 rounded-md border-2 border-gray-300"
          type="text"
          placeholder="Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          className="p-2 rounded-md border-2 border-gray-300"
          type="number"
          placeholder="Product Id"
          value={product.productId}
          onChange={(e) =>
            setProduct({ ...product, productId: e.target.value.toString() })
          }
        />
        <input
          className="p-2 rounded-md border-2 border-gray-300"
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          className="p-2 rounded-md border-2 border-gray-300"
          type="text"
          placeholder="Description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded-md"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Product;

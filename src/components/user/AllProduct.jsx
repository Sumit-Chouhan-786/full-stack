import React, { useState, useEffect } from "react";
import axios from "axios";
import PurchaseProduct from "./PurchaseProduct";
import ButtonGroup from "./ButtonGroup";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [purchaseProducts, setPurchaseProducts] = useState([]);
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/user/userLogin/allProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (email) {
      axios
        .get(`http://localhost:4000/user/purchasedProducts?email=${email}`)
        .then((res) => setPurchaseProducts(res.data))
        .catch((error) =>
          console.error("Error fetching purchased products:", error)
        );
    }
  }, []);

  const handlePurchase = (product) => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      console.error("No user email found in local storage");
      return;
    }

    // Check if the product is already purchased
    if (purchaseProducts.some((p) => p._id === product._id)) {
     alert("product is already purchaed")
    }
    else{
      alert("product added")
    }

    axios
      .post("http://localhost:4000/purchaseProduct", {
        email,
        productId: product._id,
      })
      .then((res) => {
        setPurchaseProducts((prev) => [...prev, product]);
        console.log("Product added successfully");
      })
      .catch((err) => {
        console.error("Error purchasing product:", err);
      });
  };


  const buttons = [
    { label: "All Products", status: "all" },
    { label: "Purchased Products", status: "purchase" },
    { label: "Complete Products", status: "complete" },
  ];

  return (
    <div className="container mt-3 mx-auto">
      <ButtonGroup
        buttons={buttons}
        activeButton={activeButton}
        onClick={setActiveButton}
      />

      {/* All Products */}
      <div className={`flex-wrap ${activeButton === 0 ? "flex" : "hidden"}`}>
        {products.map((product) => (
          <PurchaseProduct
            product={product}
            onPurchase={handlePurchase}
            key={product._id}
          />
        ))}
      </div>

      {/* Purchased Products */}
      <div className={`flex-wrap ${activeButton === 1 ? "flex" : "hidden"}`}>
        {purchaseProducts.map((product) => (
          <PurchaseProduct product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
